//  API_KEY = 804caa4c0ae7555a24a69b36e4a0e6fe
$(document).ready(function () {
// ON CLICK SEARCHING FUNCTION
  $(document).on('click','#button_search',
  function () {
    var typed = $('#search').val();
    searchMovie(typed);
  });
// SEARCHING FILM FUNCTION
  function searchMovie(titleFilm){
    $.ajax({
      url : "https://api.themoviedb.org/3/search/movie",
      data : {
        "api_key" : "804caa4c0ae7555a24a69b36e4a0e6fe",
        "query" : titleFilm,
      },
      method : "GET",
      success : function (data) {
        printMovie(data.results);
      },
      error : function() {
        alert('Whoops, qualcosa è andato storto');
      }
    });
  }
// PRINT ON LIST ITEM SEARCHED FILM
  function printMovie(movieInfo) {
    $('ul.film').remove();
    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < movieInfo.length; i++) {
      var movieElement = {
        "title" : movieInfo[i].title,
        "original_title" : movieInfo[i].original_title,
        "original_language" : movieInfo[i].original_language,
        "vote_average" : movieInfo[i].vote_average
      }
      var html = template(movieElement);
      $('.container').append(html);
    }
  }
});
