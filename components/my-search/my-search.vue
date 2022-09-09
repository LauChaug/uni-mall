<template>
	<view class="my-search-container" :style="{'background-color': bgcolor}">
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			// searchBoxHandler(){
			// 	uni.navigateTo({
			// 		url:"/subpkg/search/search"
			// 	})
			// }
		},
		props:{
			// 背景颜色
			bgcolor:{
				type:String,
				default:'#1296db'
			},
			// 圆角尺寸
			radius:{
				type:Number,
				default:18
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	height: 50px;
	// background-color: #1296db;
	display: flex;
	align-items: center;
	padding: 0 10px;
	.my-search-box{
		height: 36px;
		background-color: #ffffff;
		// border-radius: 18px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.placeholder{
			margin-left: 5px;
		}
	}
}
</style>