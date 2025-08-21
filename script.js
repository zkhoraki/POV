var mybutton = document.getElementById("myBtn");
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
      if (document.body.scrollTop > 330 || document.documentElement.scrollTop > 330) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
    function topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }



(function(){
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = '#599b80';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = '#e56b6f';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
question: "About how long do periods last?",
      answers: {
        a: "40-41 days",
        b: "2-7 days",
        c: "28-30 days"
      },
      correctAnswer: "b"
    },
    {
      question: "How long is the average menstrual cycle?",
      answers: {
        a: "41 days",
        b: "50 days",
        c: "28 days"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the average age that girls start their period?",
      answers: {
        a: "12 years old",
        b: "17 years old",
        c: "20 years old"
      },
      correctAnswer: "a"
    },

    {
      question: "Period products are taxed as a luxury product in most states.",
      answers: {
        a: "True",
        b: "False",
      },
      correctAnswer: "a"
    },

    {
      question: "In which country does more than 90,000 students stay home from school, because they can't afford period products? ",
      answers: {
        a: "United Kingdom",
        b: "New Zealand",
        c: "Kenya"
      },
      correctAnswer: "b"
    },

    {
      question: "United States became the first country to make menstrual products free to everyone.",
      answers: {
        a: "True",
        b: "False",
      },
      correctAnswer: "a"
    },
    
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);

})();