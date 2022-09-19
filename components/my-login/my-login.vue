<template>
	<view class="login-container">
		<uni-icons type="contact-filled" color="#7f7f7f" size="100"></uni-icons>
		<button class="btn-login" type="primary" open-type="getUserInfo" @click="getUserInfo">一键登录</button>
		<view class="tip-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['redirectInfo'])
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
			getUserInfo(){
				uni.getUserProfile({
					desc:'授权登录',
					success:(info) => {
						console.log(info,this);
						this.updateUserInfo(info.userInfo)
						this.getToken(info)
					},
					fail:()=>{
						uni.$showMsg('您取消了授权！')
					}
				})
			},
			getToken(info){
				// uni.login({
				// 	success: async (data) => {
				// 		// console.log('ssss',info,data);
				// 		const query = {
				// 			code: data.code,
				// 			encryptedData: info.encryptedData,
				// 			iv: info.iv,
				// 			rawData: info.rawData,
				// 			signature: info.signature
				// 		}
				// 		console.log(query);
				// 		const {data : loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				// 		console.log(loginResult);
				// 		if(loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
				// 		uni.$showMsg('登录成功！')
				// 	},
				// 	fail: () => {
				// 		uni.$showMsg('登录失败！')
				// 	}
				// })
				console.log(info);
				this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o')
				this.navigateBack()
				uni.$showMsg('登录成功！')
			},
			navigateBack(){
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
					uni.switchTab({
						url: this.redirectInfo.from,
						complete: () => {
							this.updateUserInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.login-container{
	height: 750rpx;
	display: flex;
	flex-direction: column;
	background-color: #e7e7e7;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;	
	&::after{
		content: ' ';
		display: block;
		height: 40px;
		width: 100%;
		background-color: #f8f8f8;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.btn-login{
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #1296db;
	}
	.tip-text{
		font-size: 12px;
		color: #7f7f7f;
	}
}
</style>