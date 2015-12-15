
// YOUR CODE HERE:

//Objective: post and update messages to the chatter box server.

//find a way to retrieve the meassage from the server and post them to the DOM.
  //seperate: username, message, roomname (but within teh same message)

//find a way to post created messages by user to the DOM.
var app = {};



app.init = function(){

  app.fetch();
  app.handleSubmit();
};

//'<img src="images/bird-03.jpg height="42" width="42">'
var message = {
  username: 'TGA Hacks',
  text: 'Be Hacked or be Hacked',
  roomname: 'You be Gone Yaaarrrr !!!!'
};

app.send = function(message){
console.log(message);
  $.ajax({

    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('message sent', data);

      $('#main').append(data);
      //console.log(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){
  
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    //url: 'https://api.parse.com/1/classes/chatterbox'
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      
      //console.log(data);
      app.addMessage(data);
      
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  // $('.message').append('hello');
  });

};

var $chat = $('#chats');
//console.log($chat);

app.addMessage = function(data){

    console.log(data);
    for (var i = data.results.length - 1; i >= 0; i--) {
      data.results[i]

    var $chat = $('<div class="chat">') 
    var $username = $('<div class="username">' + data.results[i].username +': </div><br>');
    var $text = $('<div class="text">'+ data.results[i].text + '</div>');
    // var $message = $('<div class="text">' + message + '</div>'); 
    
    $chat.append($username);
    $chat.append($text).val(message);

    $('#main').append($chat);
    };
    //$('#chats').append($message);
    console.log($chat);

/*    $('.username').on('click', function() {
      var userName = $('.username').val();
      console.log(userName);
      app.addFriend();
    });*/

};

app.clearMessages = function(){
  //alert('in the clearing function')

    var $chat = $('#chats');
    //debugger
    $('#chats').remove();

};

app.addRoom = function(roomname){
  $('#roomSelect').append('<div class="chatRoom"></div>');
};

app.addFriend = function(username) {

  console.log("add Friend is being called");
  return true;

};


app.handleSubmit = function(message){
  app.send('<' + message + '>');
  console.log('inside handle submit');

};

$(document).ready(function(){

  $('#main').append('<div id="chats">');
  $('#main').append('<div id="roomSelect>')
  //$('#chats').append('<div class="message"></div>');


  $('.refresh').on('click', function() {

  });

  $('#send').on('click', function(event){
    event.preventDefault();
    var writeText = $('#send :input').val();
    app.handleSubmit(writeText);
  });

 });

setInterval(app.init, 10000);



