var app = getApp();

/**
 * [ajax 不带token的ajax请求]
 * @param  {[string]} options.url    [请求地址]
 * @param  {[object]} options.data   [请求参数]
 * @param  {[string]} options.method [请求类型]
 * @return {[promise]}                [description]
 */
function ajax({url, data, method, header}) {
	return new Promise(function (resolve, reject) {
		function success(res) {
			resolve(res);
		}
		function fail(err) {
			reject(err);
		}
		wx.request({
			url,
			header,
			data,
			method,
			success,
			fail
		});
	});
}

/**
 * [$ajax 带token的ajax请求]
 * @param  {[string]} options.url    [请求地址]
 * @param  {[object]} options.data   [请求参数]
 * @param  {[string]} options.method [请求类型]
 * @return {[promise]}                [description]
 */
function $ajax({url, data, method}) {
	return new Promise(function (resolve, reject) {
		url += (/\?/.test(url) ? '&' : '?') + 'access-token=' + app.globalData.user.token.access_token;
		wx.request({
			url: url,
			data: data,
			method: method,
			success: res=>resolve(res),
			fail: err=>reject(err)
		});
	});
}

module.exports = {
	ajax,
	$ajax
};