angular.module('HejHejLiteApp').controller('FlashcardsController', FlashcardsController)

FlashcardsController.$inject = ['$http'];

function FlashcardsController($http){
    var flashcards = this;

    flashcards.all = [];
    // console.log(flashcards.all);

    flashcards.show = function(){
      console.log('clicked', flashcards.all);
      var flashcard = flashcards[Math.floor(Math.random()*flashcards.length)];
      $http
        .get('/flashcards', flashcard)
        .then(function(response){
          // console.log(response.data);
        });
    };

    flashcards.edit = function(){
      console.log('clicked', flashcards.name);
      var flashcard = {name: flashcards.name}
    }

    flashcards.add = function(){
      console.log('clicked', flashcards.new);
      var flashcard = {name: flashcards.new};
      $http
        .post('/flashcards', flashcard)
        .then(function(response){
          console.log(response.data);
          flashcards.all.push(flashcard);
        })
      flashcards.new = "";
    }

    flashcards.fetch = function(){
      $http
        .get('/flashcards')
        .then(function(response){
          flashcards.all = response.data;
      })
    }

    flashcards.fetch();
}