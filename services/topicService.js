var $ = require('./../utils/ajax');
var CNODE_HOST = require('./../config/const').CNODE_HOST;

/**
 * [getTopics description]
 * @return {[type]} [description]
 */
function getTopics() {
	return $.ajax({
		url: CNODE_HOST + 'topics'
	});
}

function getTopic(id) {
	return $.ajax({
		url: CNODE_HOST + 'topic/' + id
	});
}

module.exports = {
	getTopics,
	getTopic
};