/*-----------------------------------------------------------------------------
This Bot demonstrates basic bot setup, beginning and ending dialogs,
the use of attachments and a confirmation prompt.

It's part of the bot-education labs.

Try this out with a test dialog ("hi" is a good start).

Fill in the missing pieces below.

There's a link to the docs you may need at the bottom.
-----------------------------------------------------------------------------*/

var builder = require('botbuilder');
var restify = require('restify');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Dialog with small waterfall with some "routes"
// These dialogs simply flow one after the other
bot.dialog('/', [
    function (session) {
        session.beginDialog('/picture');
    },
    function (session, results) {
        session.beginDialog('/cards');
    }
]);

// Send a picture attachment from bot to user showing the use of a built-in Prompt
bot.dialog('/picture', [
    function (session) {
        session.send("I can easily send pictures to a user...");
        builder.Prompts.confirm(session, "Are you sure you want a famous robot picture sent?");
    },
    function (session, results) {
        if (results.response) {
        var msg = new builder.Message(session)
        .text("You said yes")
            
            //...fill in with an image attachment that you like...

        session.endDialog(msg);
        } else {
            var msg = new builder.Message(session)
        .text("You said no");
            session.endDialog(msg);
        }
    }
]);

// Send card attachment from bot to user, no waterfall here
bot.dialog('/cards', [
    function (session) {
        session.send("I can easily send cards to a user...");
        var msg = new builder.Message(session)
            .text("Here's a card:")
            .textFormat(builder.TextFormat.xml)

            //...fill in with a hero card...

        session.endDialog(msg);
    }
]);

// Hint:  the reference for these are at
// https://docs.botframework.com/en-us/node/builder/chat/session/#navtitle