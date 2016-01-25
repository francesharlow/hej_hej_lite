console.log('main.js is linked!');

var $answer;
var $answerBtn;
var $btmNav;
var $flashcard;
var $flashcardContainer;
var $guess;
var $hintBtn;
var $nextBtn;
var $point;
var $response;
var $scoreUl;
var $startBtn;
var $submitBtn;

var checkAnswer;
var nextFlashcard;
var showFlashcard; 
var showImg;;
var template;

var points;

$(document).ready(function() {
  template = Handlebars.compile($('#template').html());
  points = 0;
  $flashcardContainer = $('#flashcard-container');
  $flashcard = $('#random-flashcard'); 
  $startBtn = $('#show-flashcard');
  $btmNav = $('#btm-nav');
  $scoreUl = $('#score');
  $point = $('#points');
  $nextBtn = $('#next');
  $hintBtn = $('#show-hint');
  $submitBtn = $('#submit');
  $guess = $('#guess');
  $answerBtn = $('#show-answer');
  $answer = $('#answer');
  $response = $('#response')

  nextFlashcard = function(event){
    console.log('get next flash card and append to dom');
    event.preventDefault();
    $.ajax({
      url: '/api/flashcards/random?limit=1',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        console.log(data)
        $flashcardContainer.empty();
        data.forEach(function(flashcard) {
          console.log(flashcard);
          $flashcardContainer.append(template({flashcard: flashcard}));
        });
      }
    })
  };

  showFlashcard = function(event){
    event.preventDefault();
    $flashcardContainer.removeClass('hidden');
    $startBtn.addClass('hidden');
    $btmNav.addClass('hidden');
    $scoreUl.removeClass('hidden');
    $point.text('Score: '+ points);
    console.log('show flashcard!');
  };
  
  showImg = function(event){
    $('img').removeClass('hidden');
    console.log('show img');
  };

  checkAnswer = function(event){
    console.log($guess.val());
    console.log($answer.text());
    if ($guess.val() === $answer.text()) {
      $response.text('Correct!').removeClass('hidden');
      points += 1;
      $point.text('Score: '+ points);
      showImg();
      // console.log('correct');
    } else {
      $response.text('Incorrect!').removeClass('hidden');
    }
  }

  $hintBtn.on('click', showImg);
  $startBtn.on('click', showFlashcard);
  $submitBtn.on('click', checkAnswer);
  $nextBtn.on('click', nextFlashcard);
});
