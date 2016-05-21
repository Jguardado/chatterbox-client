/*
var app = {};

app.init = function () {

  app.username = window.location.search.substr(10);

  app.onscreenMessages = {};

  app.$text = $('#message');

  app.loadMsgs();
  setInterval(app.loadMsga.bind(app), 1000);

  $('#send').on('submit', app.handleSubmit);
};

app.handleSubmit = function (event) {
  event.preventDefault;
  var message = {
    username: app.username,
    text: app.$text.val(),
  };

  app.$text.val('');

  app.send(message);
  console.log('inside handle submit: ' + message.text);

};

app.renderMessage = function (message) {
  var $user = $('<div>', { class: 'user' }).text(message.username);
  var $text = $('<div>', { class: 'text' }).text(message.text);
  var $message = $('<div>', { class: 'chat', 'data-id': message.objectId }).append($user, $text);
  return $message;
};

app.displayMessage = function (message) {
  if (!app.onscreenMessages[message.objectId]) {
    var $html = app.renderMessage(message);
    $('#chats').prepend($html);
    app.onscreenMessages[message.objectId] = true;
  }
};

app.displayMessages = function (messages) {
  for (var i = 0; i < messages.length; i++) {
    app.displayMessage(messages[i]);
  }
};

app.loadMsgs = function () {
  $.ajax({
    url: app.server,
    data: { order: '-createdAt' },
    contentType: 'application/json',
    success: function (json) {
      app.displayMessages(json.results);
    },

    complete: function () {
      app.stopSpinner();
    },
  });
},

app.send = function (message) {
  app.startSpinner();
  $.ajax({
    type: 'POST',
    url: app.server,
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (json) {
      message.objectId = json.objectId;
      app.displayMessage(message);
    },

    complete: function () {
      app.stopSpinner();
    },
  });
},

app.startSpinner = function () {
  $('spinner img').show();
  $('form input[type=submit]').attr('disabled', 'true');
},

app.stopSpinner = function () {
  $('.spinner img').fadeOut('fast');
  $('form input[type=submit]').attr('disabled', null);
};

*/

/*






NEW IMPLEMENATION







*/
var app = {
  server: 'https://api.parse.com/1/classes/chaterbox/',
  username: 'anonymous',
  roomname: 'lobby',
  lastMessageId: 0,
  frineds: {},
};

app.init = function () {
  app.username = window.location.search.substr(10);
  app.$main = $('#main');
  app.$message = $('#message');
  app.$chats = $('#chats');
  app.$roomSelect = $('roomSelect');
  app.$send = $('#send');

  //adding listeners
  app.$main.on('click', '.username', app.addFriend);
  app.$send.on('submit', app.handleSubmit);
  app.$roomSelect.on('change', app.saveRoom);

  //Fetch previous messages
  app.startSpinner();
  app.fetch(false);

  //check for new messages
  setInterval(app.fetch, 3000);
};

app.send = function (data) {
  console.log('message being sent', data);
  app.startSpinner();

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (data) {
      console.log('message sent', data);

      app.fetch();
    },

    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    },
  });
};

app.fetch = function (animate) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    //url: 'https://api.parse.com/1/classes/chatterbox'
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    data: { order: '-createdAt' },
    success: function (data) {
      console.log('Messages Fetched', data);

      if (!data.results || !data.results.length) {
        return;
      }

      var mostRecent = data.results[data.results.length - 1];
      var displayedRoom = $('.chat span').first().data('roomname');
      app.startSpinner();

      if (mostRecent.objectId !== app.lastMessageId || app.roomname !== displayedRoom) {
        // Update the UI with the fetched rooms
        app.populateRooms(data.results);

        //Update the UI with the fetched messages
        app.populateMessages(data.results, animate);

        //Store the ID of the most recent message
        app.lastMessageId = mostRecentMessage.objectId;
      }

    },

    error: function (data) {
      console.error('chatterbox: Failed to send message');
    },
  });

};

app.addMessage = function (data) {
  if (!data.roomname) {
    data.roomname = 'lobby';
  }

  if (data.roomname === app.roomname) {
    var $chat = $('<div class="chat"/>');
    var $username = $('<span class="username"/>');
    $username.text(data.username + ': ').attr('data-username', data.username).attr('data-roomname', data.roomname).appendTo($chat);

    if (app.friends[data.username] === true) {
      $username.addClass('friend');
    }

    var $message = $('<br><span/>');
    $message.text(data.text).appendTo($chat);

    app.$chats.append($chat);
  };

};

app.clearMessages = function () {
  app.$chats.html('');
};

app.populateMessages = function () {
  app.clearMessages();
  app.stopSpinner();

  if (Array.isArray(results)) {
    results.forEach(app.addMessage);
  }

  var scrollTop = app.$chats.prop('scrollHeight');

  if (animate) {
    app.$chats.animate({
      scrollTop: scrollTop,
    });
  } else {
    app.$chats.scrollTop(scrollTop);
  }
};

app.populateRooms = function (results) {
  app.$roomSelect.html('<option value="__newRoom">New room... </option><option value="" selected>Lobby</option></select>');

  if (results) {
    var rooms = {};
    results.forEach(function (data) {
      var roomname = data.roomname;
      if (roomname && !rooms[roomname]) {
        app.addRoom(roomname);

        rooms[roomname] = true;
      }
    });
  }

  app.$roomSelect.val(app.roomname);
};

app.addRoom = function (roomname) {
  var $option = $('<option/>').val(roomname).text(roomname);

  //add the ability to select room
  app.$roomSelect.val(app.roomname);
};

app.saveRoom = function (event) {
  var selectIndex = app.$roomSelect.prop('selectedIndex');

  if (selectIndex === 0) {
    if (roomname) {
      app.roomname = roomname;

      app.addRoom(roomname);

      app.$roomSelect.val(roomname);

      app.fetch();
    }
  } else {
    app.startSpinner();

    app.roomname = app.$roomSelect.val();

    app.fetch();
  }
};

app.addFriend = function (event) {
  console.log('adding %s as a friend');
  app.friends[username] = true;

  var selctor = '[data-username="' + username.replace(/"/g, '\\\"') + '"]';
  var $usernames = $(selector).addClass('friend');
};

app.handleSubmit = function (event) {
  var message = {
    username: app.username,
    text: app.$message.val(),
    roomname: app.roomname || 'lobby',
  };

  app.send(message);

  event.preventDefault();
};

app.startSpinner = function () {
  $('.spinner img').show();
  $('form input[tye=submit]').attr('disabled', 'true');
};

app.stopSpinner = function () {
  $('.spinner img').fadeOut('fast');
  $('form input[type=submit]').attr('disabled', null);
};
