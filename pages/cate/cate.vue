<template>
	<view>
		<!-- 默认样式 -->
		<my-search @click.native = "gotoSearch"></my-search>
		<!-- 自定义props属性 -->
		<!-- <my-search :bgcolor="'red'" :radius="5"></my-search> -->
		
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height:wh + 'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class = "['left-scroll-view-item', i === active ? 'active':'']" @click="activeChange(i)">{{item.cat_name}}</view>
				</block>
				
			</scroll-view>
			<!-- 右侧滑动区域 -->
			<scroll-view class="right-scroll-view" scroll-y :scroll-top="scrollTop" :style="{height:wh + 'px'}">
				<view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
					<!-- 二级分类标题 -->
					<view class="cate-lv2-title">
						| {{item2.cat_name}} |
					</view>
					<!-- 三级分类列表数据 -->
					<view class="cate-lv3-list">
						<!-- 三级分类Item项 -->
						<view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="goToGoodsList(item3)">
							<!-- 三级分类图片 -->
							<image :src="item3.cat_icon.replace('dev','web')"></image>
							<!-- 三级分类文本 -->
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/minxins/tabbar-badge.js'
	export default {
		mixins:[badgeMix],
		data() {
			return {
				// 当前设备可用的高度
				wh:0,
				cateList:[],
				active:0,
				cateLevel2:[],
				scrollTop:0
			};
		},
		onLoad() {
			const sysInfo =  uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.getCateList()
		},
		methods:{
			async getCateList(){
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				// 为二级分类赋值
				this.cateLevel2 = res.message[0].children
			},
			activeChange(i){
				//重新为二级分类赋值
				this.cateLevel2 = this.cateList[i].children
				this.active = i
				// 重置右侧滑动区域的滚动条高度为0
				this.scrollTop = this.scrollTop === 0 ? 0.01:0
			},
			// 跳转到商品列表页面
			goToGoodsList(item3){
				uni.navigateTo({
					url:"/subpkg/goods_list/goods_list?cid=" + item3.cat_id
				})
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.left-scroll-view{
		width:120px;
		.left-scroll-view-item{
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			&.active{
				background-color: #ffffff;
				color: #1296db;
				font-weight: bold;
				position: relative;
				&::before{
					content: '  ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #1296db;
					position: absolute;
					top: 50%;
					left: 0%;
					transform: translateY(-50%);
				}
			}
		}
	}
	
	// .right-scroll-view{
	// 	border-left: 1px solid #333333;
	// }
}

.cate-lv2-title{
	font-size: 12px;
	font-weight: bold;
	text-align: center;
	padding: 15px 0;
}

.cate-lv3-list{
	display: flex;
	flex-wrap: wrap;
	.cate-lv3-item{
		width: 33.33%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
		image{
			width: 60px;
			height: 60px;
		}
		text{
			font-size: 12px;
		}
	}
}
</style>
