<template>
	<view>
		<view class="search-box">
			<uni-search-bar placeholder="请输入搜索内容" v-model="searchValue" @input="input" :radius="50" :focus="true" clearButton="none" cancelButton="none">
			</uni-search-bar>
		</view>
		<!-- 搜索及建议列表 -->
		<view class="sugg-list" v-if="searchResult.length !== 0">
			<view class="sugg-item" v-for="(item,i) in searchResult" :key="i" @click="gotoDetail(item)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区域 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean" color="red"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag
				:text="item" 
				v-for="(item,i) in histories" 
				:key="i"
				custom-style="background-color:#fff; color:#000;"
				@click="gotoGoodsList(item)"
				>
				</uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue:'',
				timer:null,
				searchResult:[],
				// 搜索历史数据
				historyList:['1']
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('searchValue' || '[]'))
		},
		methods:{
			input(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.searchValue = e
					this.getSearchList()
				}, 500);
			},
			async getSearchList(){
				if(this.searchValue === ''){
					this.searchResult = []
				}
				const {data : res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query : this.searchValue})
				if(res.meta.status !== 200) return uni.$showMsg()
				this.searchResult = res.message
				this.saveHistoryList()
			},
			gotoDetail(item){
				console.log(item.goods_id);
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?godds_id=' + item.goods_id
				})
			},
			saveHistoryList(){
				// this.historyList.push(this.searchValue)
				const set = new Set(this.historyList)
				set.delete(this.searchValue)
				set.add(this.searchValue.trim())
				this.historyList = Array.from(set)
				uni.setStorageSync('searchValue',JSON.stringify(this.historyList))
			},
			clean(){
				this.historyList = []
				uni.setStorageSync('searchValue','[]')
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + item
				})
			}
		},
		computed:{
			histories(){
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
}

.sugg-list{
	padding: 0 5px;
	
	.sugg-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 13px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		
		.goods-name{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}

.history-box{
	padding: 0 5px;
	.history-title{
		display: flex;
		justify-content: space-between;
		font-size: 13px;
		align-items: center;
		height: 40px;
		border-bottom: 1px solid #a8a8a8;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		uni-tag{
			margin-top:5px;
			margin-right:5px;
		}
	}
}
</style>
