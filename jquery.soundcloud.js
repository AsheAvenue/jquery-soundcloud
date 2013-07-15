(function() {
  var $;
  $ = jQuery;
  (function($){var g,d,j=1,a,b=this,f=!1,h="postMessage",e="addEventListener",c,i=b[h];$[h]=function(k,l,m){if(!l){return}k=typeof k==="string"?k:$.param(k);m=m||parent;if(i){m[h](k,l.replace(/([^:]+:\/\/[^\/]+).*/,"$1"))}else{if(l){m.location=l.replace(/#.*$/,"")+"#"+(+new Date)+(j++)+"&"+k}}};$.receiveMessage=c=function(l,m,k){if(i){if(l){a&&c();a=function(n){if((typeof m==="string"&&n.origin!==m)||($.isFunction(m)&&m(n.origin)===f)){return f}l(n)}}if(b[e]){b[l?e:"removeEventListener"]("message",a,f)}else{b[l?"attachEvent":"detachEvent"]("onmessage",a)}}else{g&&clearInterval(g);g=null;if(l){k=typeof m==="number"?m:typeof k==="number"?k:100;g=setInterval(function(){var o=document.location.hash,n=/^#?\d+&/;if(o!==d&&n.test(o)){d=o;l({data:o.replace(n,"")})}},k)}}}})(jQuery);;
  $.fn.stratus = function(settings) {
    return $.stratus(settings);
  };
  $.stratus = function(settings) {
    var root_url, src;
    root_url = settings.env === 'development' ? 'http://example.com:3000' : 'http://stratus.sc';
    $('head').append("<link rel='stylesheet' href='" + root_url + "/stratus.css' type='text/css'/>");
    if (settings.align === 'top') {
      $('head').append("<style>#stratus{ top: 0; }</style>");
    }
    if (settings.position === 'absolute') {
      $('head').append("<style>#stratus{ position: absolute; }</style>");
    }
    if (settings.offset) {
      $('head').append("<style>#stratus{ " + settings.align + ": " + settings.offset + "px !important; }</style>");
    }
    $('body').append("<div id='stratus'><iframe allowtransparency='true' frameborder='0' scrolling='0'></div>");
    src = root_url + '/player?' + $.param(settings, true) + '&link=' + encodeURIComponent(document.location.href);
    $('#stratus iframe').attr({
      src: src
    });
    $('#stratus iframe').load(function() {
      return $(this).css({
        visibility: 'visible'
      });
    });
    $('#stratus').show();
    $('body').on("click", "a.stratus", function() {
      $.postMessage($(this).attr('href'), src, $('#stratus iframe')[0].contentWindow);
      return false;
    });
    return $.receiveMessage(function(e) {
      return $('#stratus').toggleClass('open');
    }, root_url);
  };
}).call(this);
