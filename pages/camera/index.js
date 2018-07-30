var User = require('../../security/user');
const app = getApp();
Page({
    data: {
      canvasImg: ''
    },
    error(e) {
      console.log(e.detail)
    },
    onLoad: function () {
      let ctx = wx.createCameraContext();
      let context = wx.createCanvasContext('firstCanvas');
      context.setStrokeStyle("#00ff00")
      context.setLineWidth(5);
      context.rect(0, 0, 200, 200);
      context.stroke();
      let that = this;
      context.draw(false, function() {
        wx.canvasToTempFilePath({
          canvasId: 'firstCanvas',
          success: function(res) {
            console.log(res);
            that.setData({
              canvasImg: res.tempFilePath
            });
          },
          fail: function(err) {
            console.log(err);
          }
        });
      });
      
      // ctx.takePhoto({
      //   success: (res) => {
      //     this.setData({
      //       src: res.tempImagePath
      //     })
      //   }
      // })
    }
});