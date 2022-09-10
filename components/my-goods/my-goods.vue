<template>
		<view class="goods-item">
			<!-- 左侧图片区域 -->
			<view class="goods-item-left">
				<image :src="item.goods_small_logo" class="goods-pic"></image>
			</view>
			<!-- 右侧文字区域 -->
			<view class="goods-item-right">
				<view class="goods-name">{{item.goods_name}}</view>
				<view class="goods-info-box">
					<view class="goods-price">￥{{item.goods_price | toFixed}}</view>
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		name:"my-goods",
		data() {
			return {
				
			};
		},
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		filters:{
			toFixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #b4b4b4;
	.goods-item-left{
		margin-right: 5px;
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-item-right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 5px;
		.goods-name{
			font-size: 13px;
		}
		.goods-info-box{
			.goods-price{
				color: #c00000;
				font-size: 16px;
			}
		}
	}
}
</style>