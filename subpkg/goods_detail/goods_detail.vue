<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,i) in goods_info.pics" :key="i">
				<image :src="item.pics_big" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="goods-price">￥{{goods_info.goods_price}}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<view class="goods-name">{{goods_info.goods_name}}</view>
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费</view>
		</view>
			<!-- 商品详情 -->
			<rich-text :nodes="goods_info.goods_introduce"></rich-text>
			<!-- 底部导航区域 -->
			<view class="goods-nav">
				<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick"/>
			</view>
	</view>
</template>

<script>
	import {mapState , mapMutations, mapGetters} from 'vuex'
	export default {
		data() {
			return {
				goods_info:{},
				options:[
					{
						icon:'shop',
						text:'店铺',
						infoBackgroundColor: '#007aff',
						infoColor: '#red'
					},
					{
						icon:'cart',
						text:'购物车',
						info:0
					}
				],
				buttonGroup:[
					{
						text:'加入购物车',
						backgroundColor:'#ff0000',
						color:'#fff'
					},
					{
						text:'立即购买',
						backgroundColor:'#ffa200',
						color:'#fff'
					}
				],
			};
		},
		computed:{
			...mapState('m_cart',[]),
			...mapGetters('m_cart',['total'])
		},
		watch:{
			total:{
				immediate:true,
				handler(newVal){
					const findResult = this.options.find(x => x.text === '购物车')
					if(findResult){
						console.log(findResult);
						findResult.info = newVal
					}
				}
			}
		},
		onLoad(options){
			// console.log(options);
			let goods_id = options.goods_id
			this.getGoodsDetail(goods_id)
		},
		methods:{
			...mapMutations('m_cart',['addToCart']),
			async getGoodsDetail(goods_id){
				const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
				// console.log(res);
				if(res.meta.status !== 200) return uni.$showMsg('获取详情失败！')
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,'<img style="display:block;" ').replace(/webp/g,'jpg')
				this.goods_info = res.message
			},
			preview(i){
				uni.previewImage({
					current: i,
					urls: this.goods_info.pics.map(x => x.pics_big)
				})
			},
			onClick(e){
				// console.log(e);
				if(e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e){
				if(e.content.text === '加入购物车'){
					const goods = {
						goods_id: this.goods_info.goods_id,
						goods_name: this.goods_info.goods_name,
						goods_price: this.goods_info.goods_price,
						goods_count: 1,
						goods_small_logo: this.goods_info.goods_small_logo,
						goods_state: true
					}
					this.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 750rpx;
	image{
		height: 100%;
		width: 100%;
	}
}

.goods-info-box{
	padding: 10px;
	padding-right: 0;
	.goods-price{
		color: #c00000;
		font-size: 18px;
		margin: 10px 0;
	}
	.goods-info-body{
		display: flex;
		justify-content: space-between;
		.goods-name{
			margin-right: 10px;
			font-size: 13px;
		}
		.favi{
			font-size: 12px;
			width: 120px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			color: gray;
			border-left: 1px solid #c8c8c8;
		}
	}
	.yf{
		font-size: 12px;
		color: gray;
		margin: 10px 0;
	}
}

.goods-nav{
	position: fixed;
	bottom: 0%;
	left: 0;
	right: 0;
}

.goods-detail-container{
	padding-bottom: 50px;
}
</style>
