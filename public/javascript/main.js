console.log('main.js is linked!');

$(document).ready(function{
  var liTemplate = Handlebars.compile($('#li-template').html());
  var $flashcardUl = $('#random-flashcard');

  var showFlashcard = function(){
    $.ajax({
      url: '/flashcards',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        $flashcardUl.empty();
        data.forEach(function(student) {
          $flashcardUl.append(liTemplate(student));
        });
      }
    })
  };


  $('#show-flashcard').on('click', showFlashcard);
});

$(function() {
  var liTemplate = Handlebars.compile($('#li-template').html());
  var $flashcardUl = $('#random-flashcards');

  var populateflashcardUl = function() {
    $.ajax({
      url: '/api/flashcards/random?limit=1',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        $flashcardUl.empty();
        data.forEach(function(student) {
          $flashcardUl.append(liTemplate(student));
        });
      }
    })
  };
  populateflashcardUl();
  $('#get-flashcards').on('click', populateflashcardUl);
});