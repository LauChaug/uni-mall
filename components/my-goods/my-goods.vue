<template>
		<view class="goods-item">
			<!-- 左侧图片区域 -->
			<view class="goods-item-left">
				<radio 
				:checked="item.goods_state" 
				color="#1296db" v-if="showRadio"
				@click="radioClickHandler"
				></radio>
				<image :src="item.goods_small_logo" class="goods-pic"></image>
			</view>
			<!-- 右侧文字区域 -->
			<view class="goods-item-right">
				<view class="goods-name">{{item.goods_name}}</view>
				<view class="goods-info-box">
					<view class="goods-price">￥{{item.goods_price | toFixed}}</view>
					<uni-number-box :min="1" :value="item.goods_count" v-if="goodsNumber" @change="numChangeHandler"></uni-number-box>
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
		methods:{
			radioClickHandler(){
				this.$emit('radio-change',{
					goods_id: this.item.goods_id,
					goods_state: !this.item.goods_state
				})
			},
			numChangeHandler(val){
				// console.log(val);
				this.$emit('num-change',{
					goods_id: this.item.goods_id,
					goods_count: +val
				})
			}
		},
		props:{
			item:{
				type: Object,
				default: {}
			},
			showRadio:{
				type: Boolean,
				default: false
			},
			goodsNumber:{
				type: Boolean,
				default: false
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
		display: flex;
		align-items: center;
		justify-content: space-between;
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
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-price{
				color: #c00000;
				font-size: 16px;
			}
		}
	}
}
</style>