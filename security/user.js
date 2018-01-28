var constObj = require('./../config/const');
var ajax = require('./../utils/ajax');
class user {
	constructor() {

	}

	login() {
		var that = this;
		return new Promise(function (resolve, reject) {
			wx.login({
				success: function(res) {
					that.code = res.code;
					resolve();
				}
			});
		});
	}

	getDetail(encryptedData, iv) {
		var that = this;
		return new Promise(function (resolve, reject) {
			wx.request({
				url: constObj.PREFIX_HOST + 'user/wxapp/decode/encryptedData',
				data: {
					code: that.code,
					encryptedData: encryptedData,
					iv: iv,
					token: '25c96569e151d5fa66f6b9af93b8290c'
				},
				method: 'POST',
				success: res=>{
					resolve(res);
				},
				fail:()=>{
					reject();
				}
			});
		});
	}

	register() {
		return ajax.ajax({
			url: constObj.PREFIX_HOST + 'user/wxapp/register/complex',
			header: {
		        'content-type': 'application/x-www-form-urlencoded'
		    },
		    method: 'POST',
		    data: {
				code: this.code,
				encryptedData: this.userInfo.encryptedData,
				iv: this.userInfo.iv,
				postJsonString: this.userInfo.userInfo
			}
		});
	}

	getWxUserInfo() {
		var that = this;
		return new Promise(function (resolve, reject) {
			wx.getSetting({success(res){
				if(res.authSetting['scope.userInfo']) {
					wx.getUserInfo({
						success: function(res){
							that.userInfo = res;
							resolve(res);
						}
					});
				} else {
					reject();
				}
			}});
		});
	}

	getUserInfo(token) {
		return ajax.ajax({
			url: constObj.PREFIX_HOST + 'user/detail',
			header: {
		        'content-type': 'application/x-www-form-urlencoded'
		    },
		    method: 'POST',
		    data: {
				token: token 
			}
		});
	}

	getAccessToken() {
		return ajax.ajax({
			url: constObj.PREFIX_HOST + 'user/wxapp/login',
			header: {
		        'content-type': 'application/x-www-form-urlencoded'
		    },
		    method: 'POST',
		    data: {
				type: 2,
				code: this.code
			}
		});
	}
}

module.exports = {
	user: user
};