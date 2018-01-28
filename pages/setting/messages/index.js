var messageService = require('../../../services/messageService');
Page({
    data: {

    },
    onLoad: function ({id}) {
        messageService.getmMessages('9e8d5d2f-adee-4074-8096-3cec5bfe954e', false)
        	.then(res=>console.log(res));
    }
});