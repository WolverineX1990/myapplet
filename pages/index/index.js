var User = require('../../security/user');
const app = getApp();
const methods = [{

}];
Page({
    data: {
    	types : ['易企秀H5', '兔展H5', '兔展单页', 'MAKAH5', 'MAKA单页', 'MAKA视频'],
		selectType: 0
    },
    bindTypeChange: function(event) {
		var selectType = event.detail.value;
		this.setData({selectType: selectType});
	},
	submit() {
		var user = app.globalData.user;
		wx.request({
	      url: 'https://api.it120.cc/gooking/pay/wxapp/get-pay-data',
	      data: {
	        token: user.token,
	        money:0.1,
	        remark:"支付测试",
	        payName:"小程序支付测试"
	      },
	      success: function(res){
	        console.log('api result:');
	        console.log(res.data);
	        if(res.data.code == 0){
	          // 发起支付
	          wx.requestPayment({
	            timeStamp:res.data.data.timeStamp,
	            nonceStr:res.data.data.nonceStr,
	            package:'prepay_id=' + res.data.data.prepayId,
	            signType:'MD5',
	            paySign:res.data.data.sign,
	            fail:function (aaa) {
	              wx.showToast({title: '支付失败'})
	            },
	            success:function () {
	              wx.showToast({title: '支付成功'})
	            }
	          })
	        } else {
	          wx.showToast({title: '服务器忙' + res.data.code})
	        }
	      }
	    })
	},
    onLoad: function () {
    	var user = app.globalData.user = new User.user();
    	user.login()
	        .then(()=>user.getAccessToken())
	        .then(res=>user.token = res.data.data.token);
    }
});