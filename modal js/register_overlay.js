$(document).ready(function(){

  // Return overlay functionality if the settings are not defined
  if(typeof _OVERLAY === 'undefined'){
    return;
  }

  // Vars
  var checkPop,
      _OVERLAY_SETUP = {
        _OVERLAY_SHOW_TIME: 60000,
         _OVERLAY_COOKIE_TIME: 1
      }

  function createCookie(name,value,hours) {
    var expires;
    if (hours) {
      var date = new Date();
      date.setTime(date.getTime()+(hours*60*60*1000));
      expires = "; expires="+date.toGMTString();
    }else {
      expires = "";
    }
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  function registerPopup() {
    $(window).scrollTop(0);
    var template = $('#templateOverlay').html();
    Mustache.parse(template);
    var rendered = Mustache.render(template);
    $('body').prepend(rendered);
    registerListeners();
    if( $('.register-overlay').length > 0 ){
      var overlay = $('.register-overlay');
      overlay.hide().fadeIn();
    }
  }

  function registerListeners() {
    $('.register-overlay a').click(function(){
      createCookie('regPopup','',-1);
      createCookie('regPopup','looked', _OVERLAY_SETUP._OVERLAY_COOKIE_TIME);
    })
    $('#close-overlay, .register-overlaybg, .btn-no').click(function(event){
      event.preventDefault();
      $('.register-overlay, .register-overlaybg').hide();
      createCookie('regPopup','',-1);
      createCookie('regPopup','looked', _OVERLAY_SETUP._OVERLAY_COOKIE_TIME);
    })
  }

  (function init() {
    _OVERLAY_SETUP = $.extend({}, _OVERLAY_SETUP, _OVERLAY);

    checkPop = readCookie('regPopup');

    if (checkPop!="looked") {
      if(_USER.memberId === '0'){
        setTimeout(registerPopup, _OVERLAY_SETUP._OVERLAY_SHOW_TIME);
      }
    }

  })();

});
