console.log('main.js is linked!');

$(document).ready(function() {
  var template = Handlebars.compile($('#li-template').html());
  var $flashcardUl = $('#random-flashcard');
  var flashcard = $('#random-flashcard'); 
  var startBtn = $('#show-flashcard');
  var btmNav = $('#btm-nav');
  var scoreUl = $('#score');
  var point = $('#points');
  var points = 0;
  var nextBtn = $('#next');

  nextFlashcard = function(){
    $.ajax({
      url: '/api/flashcards/random?limit=1',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log(data)
        $flashcardUl.empty();
        data.forEach(function(flashcard) {
          console.log(flashcard);
          $flashcardUl.append(template(flashcard));
        });
      }
    })
  };


  var showFlashcard = function(){
    flashcard.removeClass('hidden');
    startBtn.addClass('hidden');
    btmNav.addClass('hidden');
    scoreUl.removeClass('hidden');
    point.text('Score: '+ points);
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
      $('#response').text('Correct!').removeClass('hidden');
      points+=1;
      point.text('Score: '+ points);
      showImg();
      // console.log('correct');
    } else {
      $('#response').text('Incorrect!').removeClass('hidden');
    }
  }

  submitBtn.on('click', checkAnswer);

});
