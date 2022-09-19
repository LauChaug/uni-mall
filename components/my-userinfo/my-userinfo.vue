<template>
	<view class="my-userinfo-container">
		<view class="top-box">
			<image :src="userinfo.avatarUrl" class="avatr"></image>
			<view class="nickname">{{userinfo.nickName}}</view>
		</view>
		<!-- 面板的列表区域 -->
		<view class="panel-list">
			<!-- 第一个面板 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>8</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>8</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>8</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- 第二个面板 -->
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="/static/my-icons/icon1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon2.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="/static/my-icons/icon4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三个面板 -->
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="mini"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="mini"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="mini"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex'
	export default {
		name:"my-userinfo",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['userinfo'])
		},
		methods:{
			...mapMutations('m_user',['updateAddress','updateUserInfo','updateToken']),
			logout(){
				uni.showModal({
					title: '退出登录',
						content: '确定要退出登录吗？',
						success: (res) => {
							console.log(this);
							if(!res.confirm) return uni.$showMsg('您取消了退出登录！')
							this.updateAddress({})
							this.updateUserInfo({})
							this.updateToken('')
							uni.$showMsg('退出登录成功！')
						}
				})
			}
		}
	}
</script>

<style lang="scss">
.my-userinfo-container{
	height: 100%;
	background-color: #f4f4f4;
	.top-box{
		height: 400rpx;
		background-color: #1296db;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.avatr{
			width: 90px;
			height: 90px;
			border-radius: 100%;
			border: 2px solid #fff;
			box-shadow: 0 1px 5px black;
		}
		.nickname{
			font-size: 16px;
			color: #fff;
			font-weight: bold;
			margin-top: 10px;
		}
	}
}

.panel-list{
	margin: 0 10px;
	position: relative;
	top: -10px;
	.panel{
		background-color: #fff;
		border-radius: 3px;
		margin-bottom: 8px;
		box-shadow: 0 0px 2px rgba(0, 0, 0, .4);
		.panel-title{
			line-height: 45px;
			padding-left: 10px;
			font-size: 15px;
			border-bottom: 1px solid #dfdfdf;
		}
		.panel-body{
			display: flex;
			justify-content: space-around;
			.panel-item{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				margin: 10px 0;
				font-size: 13px;
				.icon{
					width: 35px;
					height: 35px;
				}
			}
		}
		.panel-list-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 15px;
			padding: 0 10px;
			line-height: 45px;
		}
	}
}
</style>