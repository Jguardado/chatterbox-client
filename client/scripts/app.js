
// YOUR CODE HERE:

//Objective: post and update messages to the chatter box server.

//find a way to retrieve the meassage from the server and post them to the DOM.
  //seperate: username, message, roomname (but within teh same message)

//find a way to post created messages by user to the DOM.
var app = {};



app.init = function(){

  app.fetch();
  //app.handleSubmit();
};

//'<img src="images/bird-03.jpg height="42" width="42">'
// var message = {
//   username: 'TGA Hacks',
//   text: 'Be Hacked or be Hacked',
//   roomname: 'You be Gone Yaaarrrr !!!!  '
// };

app.send = function(data){
console.log('this the message being passed into app.send ' + data.text);
//console.log(JSON.stringify(message));

  $.ajax({

    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (data) {
      console.log('message sent', data);

      $('#chat').append(data);
      //app.addMessage(data);
      //console.log(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(data){
  
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    //url: 'https://api.parse.com/1/classes/chatterbox'
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (data) {
      
      var arrayOfData = [];
      arrayOfData.push(data);
      console.log(arrayOfData);
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

  if(data.results){

    //console.log(data);
    for (var i = 0; i < data.results.length; i++) {
      var $chat = $('<div class="chat">') 
      var $username = $('<div class="username">' + data.results[i].username +': </div><br>');
      var $text = $('<div class="text">'+ data.results[i].text + '</div>');
      // var $message = $('<div class="text">' + message + '</div>'); 
      
      $chat.append($username);
      $chat.append($text).val(data.text);

      $('#main').append($chat);
    };
  }

  var $chat = $('<div class="chat">') 
  var $username = $('<div class="username">' + data.username +': </div><br>');
  var $text = $('<div class="text">'+ data.text + '</div>');
  // var $message = $('<div class="text">' + message + '</div>'); 
  
  $chat.append($username);
  $chat.append($text).val(data.text);
  $('#main').append($chat);


    //$('#chats').append($message);
    //console.log($chat);

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

  //console.log("add Friend is being called");
  return true;

};


app.handleSubmit = function(input){
  var message = {
    username: 'James Bond',
    text: input,
    roomname: "4chan"
  };

  app.send(message);
  console.log('inside handle submit: ' + message.text);

};

$(document).ready(function(){

  $('#main').append('<div id="chats">');
  $('#main').append('<div id="roomSelect>')
  //$('#chats').append('<div class="message"></div>');


  $('.refresh').on('click', function() {

  });

  $('#send').on('submit', function(event){
    //event.preventDefault();
    var writeText = $('#send :input').val();
    app.handleSubmit(writeText);
  });

 });

setInterval(app.fetch, 500);



