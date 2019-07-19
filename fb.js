const request = require('request')
const {fbACCESS} = require('./config');

function callSendAPI(messageData) {
    request({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: fbACCESS },
      method: 'POST',
      json: messageData
  
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var recipientId = body.recipient_id;
        var messageId = body.message_id;
  
        if (messageId) {
          console.log("Successfully sent message with id %s to recipient %s",
            messageId, recipientId);
        } else {
        console.log("Successfully called Send API for recipient %s",
          recipientId);
        }
      } else {
        console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
      }
    });
}

function sendHiMessage(recipientId, textToUser) {
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        text: textToUser
        }
    }
    callSendAPI(messageData);
}

function sendImageMessage(recipientId, image) {
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: "image",
          payload: {
            url: image
          }
        }
      }
    };
  
    callSendAPI(messageData);
  }




  module.exports.sendMessage = sendHiMessage
  module.exports.callSendAPI = callSendAPI
  module.exports.sendImage = sendImageMessage
