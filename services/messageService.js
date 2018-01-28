var $ = require('./../utils/ajax');
var CNODE_HOST = require('./../config/const').CNODE_HOST;

function getmMessages(accesstoken, mdrender) {
	return $.ajax({
		url: CNODE_HOST + 'messages',
		data: {
			accesstoken,
			mdrender
		}
	});
}

function getmMessagesCount(accesstoken) {
	return $.ajax({
		url: CNODE_HOST + 'message/count',
		data: {
			accesstoken
		}
	});
}

module.exports = {
	getmMessages,
	getmMessagesCount
};