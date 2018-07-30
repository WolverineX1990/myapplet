const { baiduOauth, plantClassify } = require('./services');
const { ajax } = require('./../utils/ajax');
// const base64 = require('./../utils/base64');

class BaiduApp {
	constructor(client_id, client_secret) {
		this.client_secret = client_secret;
		this.client_id = client_id;
	}

	static single() {
		if(!BaiduApp._app) {
			BaiduApp._app = new BaiduApp('G4c1CbUTcKRfWawEMs7AWdC0', 'VQwe1gCIMCuSlaovusL6m94ea1RUbR0F'); 
		}

		return BaiduApp._app;
	}

	authorization() {
		return baiduOauth(this.client_id, this.client_secret)
				.then(res => {
					this.token = res.data.access_token;
					return this;
				});
	}

	plantClassify(url) {
		return ajax({
			url,
			responseType: 'arraybuffer'
		}).then(res => {
			return plantClassify(this.token, encodeURI(wx.arrayBufferToBase64(res.data)));
		});
	}
}

module.exports = BaiduApp;