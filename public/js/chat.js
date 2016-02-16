"use strict";
console.log('You should see this log message in your console');
// $ = require('jQuery');


// Put all your code in this anonymous function, which is executed
// immediately; That way, we do not "pollute" the global namespace in
// our web browser.
//
(function(){
    
    var chats = [];

    // TODO #4: Write a function that adds `li` elements to the `ul`
    // element on the page that has `id="chats"`. This function takes
    // an integer `startIndex` that indicates where the new messages
    // in the `chats` variable start (ie. those that should be written
    // to the page).
    // 
    function updateDOM(startIndex){
        var chatList = $( '#chats' );
        console.log(chatList);
        for (var i = startIndex; i < chats.length; i++) {
            $('<li>', {
                html: chats[i]
            }).appendTo(chatList);
        }

    }

    // TODO #3: Write a function that requests an array of new chats
    // from the server at `/chats/LENGTH` where LENGTH is the 
    // latest chat number that you have locally plus one. When you
    // get new chats, push them onto the `chats` array variable (above)
    // and call `updateDOM` with the index of in that array where the
    // new chats start. When the request completes, call `fetchChatsFromServer`
    // should call itself again after a one or two second delay.
    // 
    function fetchChatsFromServer(){
        var numOfCurrentChats = chats.length;
        $.get('/chats/' + numOfCurrentChats)
            .done(function(data) {
                // console.log('Data = ', data);
                chats = chats.concat(data);
                console.log('Chats : ', chats);
                updateDOM(numOfCurrentChats);
                
            });
        setTimeout(fetchChatsFromServer, 1000);

    }
    

    // TODO #2: Write a function that takes a string and POSTs it
    // to the server at `/chats/`. You can send your data as either
    // 'application/x-www-form-urlencoded' or 'application/json;charset=UTF-8'.
    // See `index.js` to see how that request will be handled.
    // 
    function sendChatMessage(message){

        $.post('/chats', {message: message})
            .done(function(data) {
                console.log('Post request completed.');
            });
    }
    
    // TODO #1: Add an event listener that listens for when a user
    // clicks on the submit button and then calls the `sendChatMessage`
    // function with the value of the text entered in the textbox.
    // 
    function startAcceptingUserChats(){
        $('#submit').click(function() {
            console.log('Clicked button!');
            var message = $('#message');
            console.log(message.val());
            sendChatMessage(message.val());
            var textInput = $('#message');
            textInput.val('');
        });
    }
    
    // This event is fired when all the content on the page
    // is loaded. It's like jQuery's `onReady` event, but it
    // is vanilla ECMAScript.
    //
    document.addEventListener("DOMContentLoaded", function() {
        console.log('The DOM is loaded!');
        startAcceptingUserChats();
        fetchChatsFromServer();
    });
    
})();

