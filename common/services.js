const { BAIDU_AI_HOST, BAIDU_AU_HOST } = require('../config/const');
const { ajax } = require('../utils/ajax');

function plantClassify(token, image) {
	return ajax({
		url: `${BAIDU_AI_HOST}image-classify/v1/plant?access_token=${token}`,
		method: 'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		data: {
			image
		}
	});
}

function baiduOauth(client_id, client_secret) {
	return ajax({
		url: `${BAIDU_AU_HOST}token?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
	});
}

module.exports = {
	plantClassify,
	baiduOauth
}
