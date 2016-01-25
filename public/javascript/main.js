console.log('main.js is linked!');

$(document).ready(function() {
  // var liTemplate = Handlebars.compile($('#li-template').html());
  // var $flashcardUl = $('#random-flashcard');

  // var showFlashcard = function(){
  //   $.ajax({
  //     url: '/flashcards',
  //     type: 'GET',
  //     dataType: 'json',
  //     success: function(data) {
  //       $flashcardUl.empty();
  //       data.forEach(function(student) {
  //         $flashcardUl.append(liTemplate(student));
  //       });
  //     }
  //   })
  // };

  var flashcard = $('#random-flashcard'); 
  var startBtn = $('#show-flashcard');
  var btmNav = $('#btm-nav');
  var score = $('#score');

  var showFlashcard = function(){
    flashcard.removeClass('hidden');
    btmNav.addClass('hidden');
    score.removeClass('hidden');
    console.log('show flashcard!');
  };

  startBtn.on('click', showFlashcard);

  var hintBtn = $('#show-hint');
  
  var showImg = function(){
    $('img').removeClass('hidden');
    console.log('show img');
  };

  hintBtn.on('click', showImg);

  var submitBtn = $('#submit');
  var guess = $('#guess');
  var answerBtn = $('#show-answer');
  var answer = $('#answer');

  var checkAnswer = function(){
    console.log(guess.val());
    console.log(answer.text());
    if (guess.val() === answer.text()) {
      console.log('correct');
    }
  }

  submitBtn.on('click', checkAnswer);

});



// $(function() {
//   var liTemplate = Handlebars.compile($('#li-template').html());
//   var $flashcardUl = $('#random-flashcards');

//   var populateflashcardUl = function() {
//     $.ajax({
//       url: '/api/flashcards/random?limit=1',
//       method: 'GET',
//       dataType: 'json',
//       success: function(data) {
//         $flashcardUl.empty();
//         data.forEach(function(student) {
//           $flashcardUl.append(liTemplate(student));
//         });
//       }
//     })
//   };
//   populateflashcardUl();
//   $('#get-flashcards').on('click', populateflashcardUl);
// });