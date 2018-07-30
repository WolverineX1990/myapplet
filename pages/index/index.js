import WeCropper from '../../common/cropper/index.js'
let User = require('../../security/user');

const app = getApp();
const device = wx.getSystemInfoSync();

Page({
  data: {
      
  },
  selectPhoto() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      success (res) {
        const src = res.tempFilePaths[0];
        self.wecropper.pushOrign(src);
      }
    });
  },
  save() {
    this.wecropper.getCropperImage(function(file) {
      wx.saveImageToPhotosAlbum({
        filePath: file,
        success: function() {

        },
        fail: function() {
          
        }
      });
    });
  },
	touchStart(e) {
    this.wecropper.touchStart(e);
	},
  touchMove(e) {
    this.wecropper.touchMove(e);
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e);
  },
  onLoad: function () {
    let cropperOpt = {
      id: 'cropper',
      width: device.windowWidth,
      height: device.windowWidth,
      scale: 2.5,
      zoom: 8
    }
    let self = this;
    new WeCropper(cropperOpt)
      .on('ready', function (ctx) {
        console.log(`wecropper is ready for work!`)
        self.wecropper.pushOrign('http://tmp/wx77c4db747afa66bf.o6zAJs1bgSRT5M6YCwgd636i2Twc.m2kKkCRQ0tIC07ec9b6c40c2f484a765ab9fb79f538c.png');
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`);
        console.log(`current canvas context:`, ctx);
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('beforeDraw', ctx => {
        ctx.fillStyle="#FF0000";
        ctx.fillRect(0, 0, 100, 100);
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`);
        console.log(`current canvas context:`, ctx);
        wx.hideToast();
      })
  }
});