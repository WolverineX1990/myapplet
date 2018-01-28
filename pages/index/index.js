var User = require('../../security/user');
var topicService = require('../../services/topicService');
const app = getApp();
Page({
    data: {

    },
    navToTopic: function(e) {
    	wx.navigateTo({url: '../topic/index?id='+e.currentTarget.dataset.id});
    },
    onLoad: function () {
    	var user = app.globalData.user = new User.user();
    	user.login()
	        .then(()=>user.getAccessToken());
	    topicService.getTopics()
	    		.then(res=>{
	    			var topics = res.data.data;
	    			var now = Date.now();
	    			topics.forEach(res=> {
	    				var time = new Date(res.last_reply_at);
	    				res.time = getTime(now - time.getTime())
	    			});
	    			this.setData({
	    				topics
	    			});
	    		});

	    wx.requestPayment({
			timeStamp: '',
			nonceStr: '',
			package: '',
			signType: 'MD5',
			paySign: '',
			success:function(res){},
			fail:function(res){},
			complete:function(res){}
		});
    }
})

function getTime(time) {
	var minut = Math.ceil(time/1000/60);
	if(minut<60) {
		return minut + '分钟前';
	}

	var hour = Math.ceil(minut/60);
	if(hour<24) {
		return hour + '小时前';
	}

	return Math.ceil(hour/24) + '天前';
}