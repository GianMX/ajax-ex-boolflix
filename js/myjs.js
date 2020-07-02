//  API_KEY = 804caa4c0ae7555a24a69b36e4a0e6fe
$(document).ready(function () {
// ON CLICK SEARCHING FUNCTION
  $(document).on('click','#button_search',
  function () {
    var typed = $('#search').val();
    searchMovie(typed);
  });
// SEARCHING FILM FUNCTION
  function searchMovie(title){
    $.ajax({
      url : "https://api.themoviedb.org/3/search/multi",
      data : {
        "api_key" : "804caa4c0ae7555a24a69b36e4a0e6fe",
        "query" : title,
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
        "title_name" : movieInfo[i].name,
        "original_title" : movieInfo[i].original_title,
        "original_name" : movieInfo[i].original_name,
        "copertina" : stampaCopertina(movieInfo[i].poster_path),
        "original_language" : showFlag(movieInfo[i].original_language),
        "vote_average" : stars(movieInfo[i].vote_average)
      }
      var html = template(movieElement);
      $('.container').append(html);
    }
  }
// CHANGE RATING SISTEM 0/10 TO STAR SISTEM 0/5 STARS
  function stars(rating) {
    var vote = Math.floor(rating / 2);
    var stars = '';
    for (var i = 1; i <= 5; i++) {
        if (i <= vote) {
          stars += '<i class="fas fa-star"></i>';
        }else {
          stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
  }
// CHANGE LANGUAGE IN LANGUAGE FLAG (IF LANGUAGE NOT AMONG AVAILABLES WILL BE SHOW UNKNOW FLAG)
  function showFlag(flagPNG) {
    var availableLanguages = ["it", "de", "es", "uk", "fr", "en"];
      if (availableLanguages.includes(flagPNG)) {
      flagPNG ='<img class="flag" src="img/' + flagPNG  +'.png" alt="flag">'
    } else {
      flagPNG ='<img class="flag" src="img/missing.png" alt="flag">'
    }
  return flagPNG;
  }
// PRINT ON SCREEN COVER
  function stampaCopertina(url){
  var finalUrl = "https://image.tmdb.org/t/p/" + "w185" + url;
  return finalUrl;
  }
});
