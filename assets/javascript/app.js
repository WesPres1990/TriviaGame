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
              ${letter} : ${currentQuestion.answers[letter]} 
            </label>`
          );
        }
  
        // Add this question and its answers to the output
        output.push(
          `<div class="question"><h3> ${currentQuestion.question} </h3></div>
          <div class="answers"><h4> ${answers.join("")} </h4></div>`
        );
      });
  
      // Combine output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join("<h1></h1>");
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
        question: "What was the name of the Titanic's older sister ship?",
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
        question: "Who explored present-day New York in 1609?",
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
        question: "Which of the following persons is not typically ranked among the top three presidents?",
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
        question: "Harry Potter uses which of the following to hide from his enemies?",
        answers: {
          A: "Invisibility Charm",
          B: "Shriking Potion",
          C: "Camouflage",
          D: "Invisibility Cloak",
        },
        correctAnswer: "D",
        wrongAnswer: "A", 
        incorrectAnswer: "B", 
        falseAnswer: "C",
      },
      {
        question: "How many teams are there in the NFL?",
        answers: {
          A: "24",
          B: "16",
          C: "32",
          D: "48",
        },
        correctAnswer: "C",
        wrongAnswer: "A", 
        incorrectAnswer: "B", 
        falseAnswer: "D",
      },
      {
        question: "2017 marks the centennial of the United States's entry into which war?",
        answers: {
          A: "World War I",
          B: "Franco-Prussian War",
          C: "World War II",
          D: "Korean War",
        },
        correctAnswer: "A",
        wrongAnswer: "C", 
        incorrectAnswer: "B", 
        falseAnswer: "D",
      },
      {
        question: "Which of these TV shows had an original run on both Nickelodeon and the Disney Channel?",
        answers: {
          A: "Legends of the Hidden Temple",
          B: "Doug",
          C: "Rugrats",
          D: "Recess",
        },
        correctAnswer: "B",
        wrongAnswer: "A", 
        incorrectAnswer: "C", 
        falseAnswer: "D",
      },
      {
        question: "The rail tunnel linking the United Kingdom and France is known as the _________.",
        answers: {
          A: "English Channel Tunnel",
          B: "Chunnel",
          C: "Channel Tunnel",
          D: "B and C",
        },
        correctAnswer: "D",
        wrongAnswer: "A", 
        incorrectAnswer: "C", 
        falseAnswer: "B",
      },
      {
        question: "The State of Georgia is named for _________.",
        answers: {
          A: "Saint George",
          B: "George Washingon",
          C: "King George II of Great Britain and Ireland",
          D: "King George III of Great Britain and Ireland",
        },
        correctAnswer: "C",
        wrongAnswer: "A", 
        incorrectAnswer: "D", 
        falseAnswer: "B",
      },
      {
        question: "What was the birthplace of Jesus Christ?",
        answers: {
          A: "Bethlehem",
          B: "Nazareth",
          C: "Jerusalem",
          D: "Jericho",
        },
        correctAnswer: "A",
        wrongAnswer: "C", 
        incorrectAnswer: "D", 
        falseAnswer: "B",
      }
    ];

//Starting the game and jumbontron controls

    // This initializes the button that starts the game 
    $(".jumbotron-1").on("click", function (){
        // When the "Start" button is clicked, the div with the questions that was hidden is shown and the timer begins to run
                $('.jumbotron-2').show();
                startTimer(45);
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