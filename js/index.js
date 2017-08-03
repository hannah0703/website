(function() {
  var questions = [{
    question: "When did the Spanish bring cocoa beans to Spain?",
    choices: [1520, 1528, 1536, 1538, 1543],
    correctAnswer: 1
  }, {
    question: "When did the first chocolate factory in America open?",
    choices: [1632, 1650, 1765, 1833, 1878],
    correctAnswer: 2
  }, {
    question: "When was the first chocolate bar made?",
    choices: [1666, 1798, 1847, 1872, 1893],
    correctAnswer: 2
  }, {
    question: "What year was Dairy Milk introduced?",
    choices: [1899, 1905, 1908, 1912, 1918],
    correctAnswer: 1
  }, {
    question: "What year did Twix go on sale?",
    choices: [1951, 1960, 1967, 1971, 1983],
    correctAnswer: 2
  }];


  var questionCounter = 0;
  var selections = [];
  var quiz = $('#quiz');


  displayNext();


  $('#next').on('click', function (e) {
    e.preventDefault();


    if(quiz.is(':animated')) {
      return false;
    }
    choose();


    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });


  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });


  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });


  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });



  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }


  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }


  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }


  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }


        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();
