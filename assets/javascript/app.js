// Timer
var timeInSecs;
var ticker;

function startTimer(secs){
timeInSecs = parseInt(secs)-1;
// Every second
ticker = setInterval("tick()",1000);
}

function tick() {
var secs = timeInSecs;
if (secs>0) {
timeInSecs--;
} else {
    // Stop counting at zero and show results
clearInterval(ticker);
$('.jumbotron-3').show();
$('.jumbotron-2').hide();
showResults();
// Removing forward slashes in front of startTimer supposed repeat if required, but does not work
// startTimer(30);
}

// Displaying timer

//*document.getElementById("countdown").innerHTML = "Time Remaining: " + secs;*//
$('#countdown').html('<h2>' + "Time Remaining: " + secs +'</h2>');
}

// Building the quiz
function buildQuiz() {
      // Store the HTML output
      var output = [];
  
      // For each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // we'll want to store the list of answer choices
        var answers = [];
  
        // And for each available answer...
        for (letter in currentQuestion.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // Add this question and its answers to the output
        output.push(
          `<div class="question"><h3> ${currentQuestion.question} </h3></div>
          <div class="answers"> ${answers.join("")} </div>`
        );
      });
  
      // Combine output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("<h2></h2>");
    }
  
    function showResults() {
      // Gather answer containers from quiz
      var answerContainers = quizContainer.querySelectorAll(".answers");
  
      // Keep track of user answers
      var numCorrect = 0;
      var numIncorrect = 0;
      var numUnanswered = 0;
  
      // For each question...
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        var answerContainer = answerContainers[questionNumber];
        var selector = `input[name=question${questionNumber}]:checked`;
        var guessedAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if (guessedAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++;
  
          // if answer is wrong
        } else if (guessedAnswer === currentQuestion.wrongAnswer) {
            numIncorrect++;
        } else if (guessedAnswer === currentQuestion.incorrectAnswer) {
            numIncorrect++;
        } else if (guessedAnswer === currentQuestion.falseAnswer) {
            //add to the number of incorrect answers
            numIncorrect++;

          // if unaswered
        } else {
            numUnanswered++;
        }
      });
  
      // Show results
      $('#results').html('Correct Answers: '+numCorrect+ "<br>" +'Incorrect Answers: '+numIncorrect+ "<br>" +'Unanswered: '+numUnanswered);
    }

// Variables giving reference to HTML elements; includes questions and answers array
  
    var quizContainer = document.getElementById("quiz");
    var resultsContainer = document.getElementById("results");
    var submitButton = document.getElementById("submit");
    var myQuestions = [
      {
        question: "What was the name of Titanic's older sister ship?",
        answers: {
          A: "Olympic",
          B: "Britannic",
          C: "Majestic",
          D: "Lusitania",
        },
        correctAnswer: "A",
        wrongAnswer: "B", 
        incorrectAnswer: "C", 
        falseAnswer: "D",
      },
      {
        question: "Who founded New York in 1609?",
        answers: {
          A: "Giovanni da Verrazzano",
          B: "Peter Stuyvesant",
          C: "Henry Hudson",
          D: "Walter Raleigh",
        },
        correctAnswer: "C",
        wrongAnswer: "A",
        incorrectAnswer: "B",
        falseAnswer: "D",
      },
      {
        question: "Which one of these presidents is not typically ranked in the top three?",
        answers: {
          A: "Franklin D. Roosevelt",
          B: "Lyndon B. Johnson",
          C: "George Washington",
          D: "Abraham Lincoln",
        },
        correctAnswer: "B",
        wrongAnswer: "A", 
        incorrectAnswer: "C", 
        falseAnswer: "D",
      },
      {
        question: "How does Harry Potter hide from his enemies?",
        answers: {
          A: "Invisibility Charm",
          B: "Shriking Potion",
          C: "Camoflauge",
          D: "Invisibility Cloak",
        },
        correctAnswer: "D",
        wrongAnswer: "A", 
        incorrectAnswer: "B", 
        falseAnswer: "C",
      }
    ];

//Starting the game and jumbontron controls

    // This initializes the button that starts the game 
    $(".jumbotron-1").on("click", function (){
        // When the "Start" button is clicked, the div with the questions that was hidden is shown and the timer begins to run
                $('.jumbotron-2').show();
                startTimer(30);
                $(this).hide();
    });

    // This allows the user to click the "Done" button and end the game 
    $("#submit").on("click", function (){
        // when the "Done" button is clicked, the div with the results that was hidden is shown
                $('.jumbotron-3').show();
                $('.jumbotron-2').hide();
    });
    
    // This was for allowing the user to restart the game, but I could not get it to work properly
    //$(".jumbotron-3").on("click", function (){
    // when the "Restart" button is clicked, the div with the opening jumbotron that was hidden is shown
            //$('.jumbotron-1').show(); 
            //$(this).hide();
    //});
  
    // Display quiz right away
    buildQuiz();
  
    // On submit, show results
    submitButton.addEventListener("click", showResults);
;