<template>
	<!-- 购物车页面 -->
	<view class="cart-container" v-if="cart.length !== 0">
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<uni-swipe-action>
			<block v-for="(item, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(item)">
					<my-goods :item="item" showRadio goodsNumber @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<my-settle></my-settle>
	</view>
	<!-- 空白购物车页面 -->
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="emptyImg"></image>
		<text class="tip-text">购物车是空的</text>
	</view>
</template>

<script>
	import badgeMix from '@/minxins/tabbar-badge.js'
	import {mapState, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				options:[
					{
						text: '删除',
						style: {
							backgroundColor: '#1296db'
						}
					}
				]
			};
		},
		mixins:[badgeMix],
		computed:{
			...mapState('m_cart',['cart'])
		},
		methods:{
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
			radioChangeHandler(e){
				console.log(e);
				this.updateGoodsState(e)
			},
			numberChangeHandler(e){
				// console.log(e);
				this.updateGoodsCount(e)
			},
			swipeItemClickHandler(item){
				// console.log(item.goods_id,this);
				// const that = this
				uni.showModal({
					title: '删除商品',
					content: '确定将该商品从购物车删除吗？',
					showCancel: true,
					success:(res) => {
						// console.log(res,this);
							if (res.confirm) {
								this.removeGoodsById(item.goods_id)
							}
						}
				})
			}
		}
	}
</script>

<style lang="scss">
.cart-container{
	padding-bottom: 50px;
}
.cart-title{
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #818181;
	.cart-title-text{
		font-size: 14px;
		margin-left: 5px;
	}
}
.empty-cart{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
	.emptyImg{
		height: 90px;
		width: 90px;
	}
	.tip-text{
		font-size: 12px;
		color: #b4b4b4;
		margin-top: 10px;
	}
}
</style>
