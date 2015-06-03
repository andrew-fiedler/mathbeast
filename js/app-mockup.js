(function($) {

  // Use JQuery UI to replace operator dropdown with selectmenu widget
  $('#operation').buttonset();

  // Start game
  $('.settings-save').click(function() {

    var upperLimit = $('#upper-limit').val();
    var operation = $('#operation .ui-state-active span').text();
    var totalQuestions = 10;

    // Initialize game
    MathBeast.start(parseInt(upperLimit), operation, parseInt(10));

    // Get first question
    var question = MathBeast.getCurrentQuestion();

    // Question Number
    $('#question--number').text(1);

    // Fill in question and answer values on markup
    $('#question--operand-1').text(question.operand1);
    $('#question--operation').text(question.operation);
    $('#question--operand-2').text(question.operand2);
    $('#answers--option-1').text(question.answerOptions[0]);
    $('#answers--option-2').text(question.answerOptions[1]);
    $('#answers--option-3').text(question.answerOptions[2]);

    // Enable multiple choice buttons
    $('#answers--option-1').removeAttr('disabled');
    $('#answers--option-2').removeAttr('disabled');
    $('#answers--option-3').removeAttr('disabled');

    $('main .status').fadeOut();
    $('main .question').fadeIn();
    $('main .answers').fadeIn();
    $('main .timer').fadeIn();

    countDown.run();

  });

  // Next Question
  $('.answers .answer-option').click(function() {

    // Get current question
    var result = MathBeast.attempt($(this).text());
    if (result.rightAnswer) {

      //reinitialize the timer
      countDown.clear().run()
      console.log("Right Answer");
      if (result.nextQuestion) {

        var question = result.nextQuestion;

        // Update question number
        $('#question--number').text(MathBeast.currentQuestion + 1);

        // Fill in question and answer values on markup
        $('#question--operand-1').text(question.operand1);
        $('#question--operation').text(question.operation);
        $('#question--operand-2').text(question.operand2);
        $('#answers--option-1').text(question.answerOptions[0]);
        $('#answers--option-2').text(question.answerOptions[1]);
        $('#answers--option-3').text(question.answerOptions[2]);
      } else {
        countDown.clear()
        var attempts = MathBeast.attempts;
        var totalQuestions = MathBeast.settings.totalQuestions;

        console.log("Game Over!");
        console.log("Questions: " + totalQuestions);
        console.log("Attempts: " + attempts);

        // Disable multiple choices
        $('#answers--option-1').attr('disabled', 'disabled');
        $('#answers--option-2').attr('disabled', 'disabled');
        $('#answers--option-3').attr('disabled', 'disabled');


        $('main .results').text('Game Over! You answered ' + totalQuestions +
          ' question(s) in ' + attempts + ' attempts.');
        $('main .message').text('Click Start to play again.');
        $('main .status').fadeIn();
      }
    } else {
      console.log("Wrong Answer. Try Again");
    }
  });

  var countDown = {
    run: function() {
      var newTimer = $("<div class='bar'></div>");
      $("#timerContainer").append(newTimer);
      var time = MathBeast.settings.timer;
      $(".bar").animate({
        "width": "0",
        "padding": "0"
      }, time, function() {
        this.remove();
      })
    },

    clear: function() {
      $(".bar").remove();
      return this;
    }

  };

}(jQuery));
