// ________FAKE_DATA_______________
let questions = [
    {
      quiz_id: 1,
      question:
        "You can learn a lot about the local _______ by talking to local people.",
      answers: ["territory", "area", "land", "nation"],
    },
    {
      quiz_id: 2,
      question:
        "It's good to have someone to ________ you when you are visiting a new place.",
      answers: ["lead", "take", "guide", "bring"],
    },
    {
      quiz_id: 3,
      question:
        "When you ______ your destination, your tour guide will meet you at the airport.",
      answers: ["arrive", "reach", "get", "achieve"],
    },
    {
      quiz_id: 4,
      question: "It can be quite busy here during the tourist ______",
      answers: ["season", "phase", "period", "stage"],
    },
    {
      quiz_id: 5,
      question:
        "Make sure you _______ a hotel before you come to our island, especially in the summer.",
      answers: ["book", "keep", "put", "buy"],
    },
    {
      quiz_id: 6,
      question: "Captain Cook discovered Australia on a _______ to the Pacific.",
      answers: ["vacation", "travel", "cruise", "voyage"],
    },
    {
      quiz_id: 7,
      question:
        " Most tourist attractions in London charge an admission ________.",
      answers: ["fare", "ticket", "fee", "pay"],
    },
    {
      quiz_id: 8,
      question: "The hotel where we are _______ is quite luxurious.",
      answers: ["living", "existing", "remaining", "staying"],
    },
    {
      quiz_id: 9,
      question: "Is English an ________ language in your country?",
      answers: ["mother", "official", "living", "old"],
    },
    {
      quiz_id: 10,
      question: "He spoke a ______ of French that we found hard to understand.",
      answers: ["slang", "jargon", "dialect", "language"],
    },
    {
        quiz_id: 11,
        question:
          "Make sure you _______ a hotel before you come to our island, especially in the summer.",
        answers: ["book", "keep", "put", "buy"],
      },
      {
        quiz_id: 12,
        question: "Captain Cook discovered Australia on a _______ to the Pacific.",
        answers: ["vacation", "travel", "cruise", "voyage"],
      },
      {
        quiz_id: 13,
        question:
          " Most tourist attractions in London charge an admission ________.",
        answers: ["fare", "ticket", "fee", "pay"],
      },
      {
        quiz_id: 14,
        question: "The hotel where we are _______ is quite luxurious.",
        answers: ["living", "existing", "remaining", "staying"],
      },
      {
        quiz_id: 15,
        question: "Is English an ________ language in your country?",
        answers: ["mother", "official", "living", "old"],
      },
      {
        quiz_id: 16,
        question: "He spoke a ______ of French that we found hard to understand.",
        answers: ["slang", "jargon", "dialect", "language"],
      },
  ];
  const results = [
    {
      quiz_id: 1,
      answer: "area",
    },
    {
      quiz_id: 3,
      answer: "reach",
    },
    {
      quiz_id: 2,
      answer: "guide",
    },
    {
      quiz_id: 4,
      answer: "season",
    },
    {
      quiz_id: 5,
      answer: "book",
    },
    {
      quiz_id: 6,
      answer: "voyage",
    },
    {
      quiz_id: 7,
      answer: "fee",
    },
    {
      quiz_id: 8,
      answer: "staying",
    },
    {
      quiz_id: 9,
      answer: "official",
    },
    {
      quiz_id: 10,
      answer: "dialect",
    },
    {
        quiz_id: 11,
        answer: "book",
      },
      {
        quiz_id: 12,
        answer: "voyage",
      },
      {
        quiz_id: 13,
        answer: "fee",
      },
      {
        quiz_id: 14,
        answer: "staying",
      },
      {
        quiz_id: 15,
        answer: "official",
      },
      {
        quiz_id: 16,
        answer: "dialect",
      },
  ];
  // QUIZ_APP
  const quizTimer = document.querySelector('#timer');
  const quizProgress = document.querySelector('#progress');
  const quizProgressText = document.querySelector('#progress_text');
  const quizSubmit = document.querySelector('#quiz_submit');
  const quizPrew = document.querySelector('#quiz_prew');
  const quizNext = document.querySelector('#quiz_next');
  const quizCount = document.querySelector('.quiz_question h5');
  const quizAnswers = document.querySelectorAll('.quiz_question ul li');
  let quizQuestions = document.querySelectorAll('.quiz_numbers ul li');
  const quizQuestionsList = document.querySelector('.quiz_numbers ul');
  const quizAnswersItem = document.querySelectorAll('.quiz_answers_item');
  const quizTitle = document.querySelector('#quiz_title');
  let currentIndex = null;
  let listSubmit = [];
  const quiz = {


    //#region Event
        //#region Submit
        handleSubmit : function(){
            quizSubmit.addEventListener("click",()=>{
                
            });
        },
        //#endregion
        //#region Question
        handleQuestionList: function(){
            quizQuestions.forEach((question,index) => {
                // Set event click cho từng câu hỏi 
                question.addEventListener("click",()=>{
                    question.scrollIntoView({ behavior: "smooth", inline: "center" });
                    // Default Style cho câu hỏi
                    quizQuestions.forEach((item) => item.classList.remove("active"));
                    // Set style cho câu hỏi
                    question.classList.add("active");
                    // Set current câu hỏi
                    currentIndex = index;
                    this.renderCurrentQuestion();
                    // Default Style cho câu trả lời
                    quizAnswers.forEach((item) => item.classList.remove("active"));
                    // Kiểm tra tồn tại câu trả lời và gọi trigger
                    const selected = listSubmit[currentIndex];
                    // Call event Answer click
                    selected >= 0 && quizAnswers[selected].click();
                });
            });
            quizQuestions[0].click();
        },
        //#endregion
        //#region Answer
        // Event Answer click
        handleAnswer : function (){
            quizAnswers.forEach((answer,index) => {
                //Set event click cho từng câu trả lời
            answer.addEventListener("click",() => {
                // Default Style cho câu trả lời
                quizAnswers.forEach((item) => item.classList.remove("active"));
                // Set Style cho câu trả lời
                answer.classList.add("active");
                // Set Style cho câu hỏi của câu trả lời
                quizQuestions[currentIndex].classList.add("selected");
                // Set Value câu trả lời cho câu hỏi
                listSubmit[currentIndex] = index;
                // Set value Progress
                this.handleProgress();
            }); 
            });
        },
        //#endregion
        //#region Progress
        // Event Progress
        handleProgress : function(){
            const progressLen = listSubmit.filter(item => item >= 0);
            const r = quizProgress.getAttribute("r");
            quizProgress.style =`stroke-dasharray: ${(2 * Math.PI * r * progressLen.length) / questions.length} 9999;`;
            quizProgressText.innerText = `${progressLen.length}/${questions.length}`;
        },
        //#endregion    
        //#region Next
        handleNext : function(){
            quizNext.addEventListener("click",()=>{
                ++currentIndex;
                if (currentIndex > questions.length - 1) {
                    currentIndex = 0;
                }
                quizQuestions[currentIndex].click();
            });
        },
        handlePrew : function(){
            quizPrew.addEventListener("click",()=>{
                --currentIndex;
                if (currentIndex < 0) {
                    currentIndex = questions.length - 1;
                }
                quizQuestions[currentIndex].click();
            });
        },
        //#endregion
    //#endregion
    //#region Render
        //#region Question
        // Render danh sách câu hỏi
        renderQuestionList : function (){
            let render="";
        questions.forEach((question,index) => {
            render += `<li>${index + 1}</li>`
        });
        quizQuestionsList.innerHTML = render;  
        quizQuestions = document.querySelectorAll('.quiz_numbers ul li');
        },
        // Render Template câu hỏi
        renderCurrentQuestion : function(){
            quizCount.innerText = `Question ${currentIndex + 1} of ${questions.length}`;
            quizTitle.innerText = questions[currentIndex].question;
            quizAnswersItem.forEach((answer,index) =>{
                answer.innerText = questions[currentIndex].answers[index];
            });
        },
        //#endregion
        //#region Progress
        renderProgress: function(){
            quizProgress.style = `stroke-dasharray: 0 9999;`;
            quizProgressText.innerText = `0/${questions.length}`;
        },    
        //#endregion
    //#endregion
    start: function (){
        this.renderQuestionList();
        this.renderProgress();
        this.handleQuestionList();
        this.handleAnswer();
        this.handleNext();
        this.handlePrew();
    }
  };
  quiz.start();
