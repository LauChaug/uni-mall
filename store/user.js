export default {
	namespaced: true,
	state:()=>({
		address: JSON.parse(uni.getStorageSync('address') || '{}'), 
		// address: {}
		token: uni.getStorageSync('token') || '',
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		redirectInfo: null
	}),
	mutations:{
		updateAddress(state,address){
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		updateUserInfo(state,userinfo){
			state.userinfo = userinfo
			// console.log(state.userinfo);
			this.commit('m_user/saveUserInfoToStorage')
		},
		updateToken(state,token){
			state.token = token
			this.commit('m_user/saveTokenToStorage')
			console.log(state.token);
		},
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		},
		updateRedirectInfo(state,info){
			state.redirectInfo = info
			console.log(state.redirectInfo);
		}
	},
	getters:{
		addstr(state){
			if(!state.address.provinceName) return ""
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}