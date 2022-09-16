<template>
	<view>
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'" >
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">收货人：{{address.userName}}</view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：{{address.telNumber}}</view>
					<uni-icons type="right"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">收货地址：</view>
				<view class="row2-right">{{addstr}}</view>
			</view>
		</view>
		<image src="../../static/cart_border@2x.png" class="address-border"></image>
	</view>
</template>

<script>
	import {mapMutations,mapState,mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('m_user',['addstr']),
			...mapState('m_user',['address'])
		},
		methods:{
			...mapMutations('m_user',['updateAddress']),
			async chooseAddress(){
				const [err,succ] =  await uni.chooseAddress().catch(err => err)
				console.log(succ);
				if( err === null && succ.errMsg === 'chooseAddress:ok'){
					this.updateAddress(succ)
				}
				console.log(err);
			}
		}
	}
</script>

<style lang="scss">
.address-border{
	display: block;
	width: 100%;
	height: 5px;
}

.address-info-box{
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;
	.row1{
		display: flex;
		justify-content: space-between;
		.row1-right{
			display: flex;
			justify-content: space-between;
		}
	}
	.row2{
		display: flex;
		// justify-content: space-between;
		align-items: center;
		margin-top: 10px;
		.row2-left{
			white-space: nowrap;
		}
	}
}

.address-choose-box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>