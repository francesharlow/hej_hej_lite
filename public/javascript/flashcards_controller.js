angular.module('HejHejLiteApp').controller('FlashcardsController', FlashcardsController)

FlashcardsController.$inject = ['$http'];

function FlashcardsController($http){
    var flashcards = this;

    flashcards.all = [];

    flashcards.add = function(){
      console.log('clicked', flashcards.new);
      var flashcard = {name: flashcards.new};
      $http
        .post('/flashcards', flashcard)
        .then(function(response){
          console.log(response.data);
          dogs.all.push(flashcard);
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