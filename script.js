const quizData = [
    {
      question: 'Which of the following is NOT a core dimension of health and wellness?',
      options: ['Physical Health', 'Mental Health', 'Social Health', 'Financial Health'],
      answer: 'Financial Health',
    },
    {
      question: 'How many servings of fruits & vegetables are recommended per day for a balanced diet?',
      options: ['2-3 Servings', '4-5 Servings', '6-7 Servings', '8 or more Servings'],
      answer: '4-5 Servings',
    },
    {
      question: 'Which of these is the BEST way to manage stress?',
      options: ['Bottling up your emotions', 'Regular exercise and relaxation techniques', 'Relying on sugary snacks for comfort', 'Isolating yourself from social interaction'],
      answer: 'Regular exercise and relaxation techniques',
    },
    {
      question: 'Getting enough sleep is important for',
      options: ['Physical health and brain function only', 'Emotional well-being only', 'Both physical and mental health', 'Neither physical nor mental health'],
      answer: 'Physical health and brain function only',
    },
    {
      question: 'Sunscreen should be used',
      options: [
        'Only on sunny days at the beach',
        'Every day, regardless of the weather',
        'When your skin feels hot',
        'After spending time in a tanning bed',
      ],
      answer: 'Every day, regardless of the weather',
    },
    {
      question: 'The recommended amount of daily water intake for adults varies depending on factors like weight and activity level, but a good general guideline is',
      options: ['1 liter', '2 liters', '3 liters', '4 liters'],
      answer: '3 liters',
    },
    {
      question: 'Which healthy habit can help improve your focus and concentration?',
      options: [
        'Skipping breakfast',
        'Staying up late to bing-watch shows',
        'Getting enough sleep and taking breaks throghout the day',
        'Multitasking on several devices',
      ],
      answer: 'Getting enough sleep and taking breaks throghout the day',
    },
    {
      question: 'Maintaining strong social connections is important for',
      options: ['Physical health only', 'Mental and emotional well-being', 'Both physical and mental health', 'Neither physical nor mental health'],
      answer: 'Mental and emotional well-being',
    },
    {
      question: 'Which of these activities is NOT generally considered a healthy way to manage stress?',
      options: [
        'Practising yoga or meditation',
        'Spending time in nature',
        'Connecting with loved ones',
        'Smoking cigarettes',
      ],
      answer: 'Smoking cigarettes',
    },
    {
      question: 'A balanced and healthy lifestyle can help reduce the risk of',
      options: ['Colds only', 'Chronic diseases like heart disease and diabetes', 'Minor injuries', 'Feeling tired'],
      answer: 'Chronic diseases like heart disease and diabetes',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();