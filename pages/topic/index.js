var User = require('../../security/user');
var topicService = require('../../services/topicService');
const app = getApp();
Page({
    data: {

    },
    onLoad: function ({id}) {
    	// topicService.getTopic(id)
    	// 	.then(res=>{
     //            var content = res.data.data.content;
     //            content = content.replace('<div class="markdown-text">', '');
     //            var nodes = content.split(/<\/[\w|\d]+>/);
    	// 		this.setData({
    	// 			topic: res.data.data
    	// 		});
    	// 	});
        this.user = new User.user();
        this.user.login()
            .then(()=>this.user.getAccessToken())
            .then(res=>this.user.getUserInfo(res.data.data.token))
            .then(res=>console.log(res));
    },
    test: function() {
        // wx.scanCode({
        //     success: function(res) {
        //         var accessToken = res.result;
        //     }
        // });
        this.user.getWxUserInfo()
            .then(()=> this.user.register())
            .then(res=> {
                console.log(res.data)
            });
    }
});