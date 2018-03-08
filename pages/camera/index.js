var User = require('../../security/user');
const app = getApp();
Page({
    data: {

    },
    error(e) {
      console.log(e.detail)
    },
    onLoad: function () {
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        success: (res) => {
          this.setData({
            src: res.tempImagePath
          })
        }
      })
    }
});