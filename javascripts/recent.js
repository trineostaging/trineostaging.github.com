function selectRandom(arr){
  return arr[Math.floor(Math.random() * arr.length)]
}

function postToHtml(post, index) {
  return '<style type="text/css">a.widget#widget-'+index+':hover .content {color:'+post.widget_color+'}</style>' +
  '<style type="text/css">#featured.color a.widget#widget-'+index+' .title {color:'+post.widget_color+'}</style>' +
  '<span class="logo" style="background-image: url(/images/widgets/'+post.name_short+'.png);"></span>' +
  '<span class="title">'+post.widget_title+'</span>' +
  '<span class="content">'+post.widget_excerpt+'</span>';
}

$(document).ready(function() {
  // load success widgets
  $.getJSON("http://success.heroku.com/home.js?format=json&callback=?", function(posts){
    var html = "";
    for(i=0; i<2; i++) {
      post = selectRandom(posts);
      widget_index = i + 1;
      widget = $('#widget-' + widget_index);
      widget.html(postToHtml(post, widget_index))
      widget.attr('href', post.story_url)
      posts = jQuery.grep(posts, function(v) { return v != post });
    }
    $('#widgets').append(html);
  });
});