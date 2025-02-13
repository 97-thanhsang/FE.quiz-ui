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
  const quizPrev = document.querySelector('#quiz_prev');
  const quizNext = document.querySelector('#quiz_next');
  const quizCount = document.querySelector('.quiz_question h5');
  const quizAnswers = document.querySelectorAll('.quiz_question ul li');
  let quizQuestions = document.querySelectorAll('.quiz_numbers ul li');
  const quizQuestionsList = document.querySelector('.quiz_numbers ul');
  const quizAnswersItem = document.querySelectorAll('.quiz_answers_item');
  const quizTitle = document.querySelector('#quiz_title');
  let currentIndex = null;
  let listSubmit = [];
  let listResults = [];
  let isSubmit = false;
  const quiz = {

    //#region Function
    randomArray : function (array) {
      return (array = array.sort(() => Math.random() - Math.random()));
    },
    //#endregion

    //#region Event

        //#region Random
        randomQuestion : function () {
          questions = this.randomArray(questions);
          questions.forEach((question,index) => {
            question.answers = this.randomArray(question.answers);
          });
        },
        //#endregion
        
        //#region Submit
        handleSubmit : function(){
            quizSubmit.addEventListener("click",()=>{
              const progressLen = listSubmit.filter(item => item >= 0);
              let correct = 0;
                if (progressLen.length === questions.length) {
                  questions.forEach((question,index) => {
                    const result = results.find((r) => r.quiz_id === question.quiz_id);

                    // Lấy đáp án từng câu
                    if (question.answers[listSubmit[index]] === result.answer) {
                      listResults[index] = listSubmit[index];
                      correct++;
                    }
                    else
                    {
                      quizQuestions[index].classList.add("incorrect");
                      listResults[index] = question.answers.indexOf(result.answer);
                    }
                  });
                  isSubmit = true;
                  this.handleProgress(correct);
                }
                else
                {
                  alert("Chưa chọn hết !");
                }
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

                    if (isSubmit) {
                      this.renderResults();
                    }

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
                if (!isSubmit) {
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
                }
                else
                {
                  return;
                }
            });
            });
        },
        //#endregion
        
        //#region Progress
        // Event Progress
        handleProgress : function(correct){
          const r = quizProgress.getAttribute("r");
          let styleProgress = "";
          let textProgress = "";
          if (!isSubmit) {
            const progressLen = listSubmit.filter(item => item >= 0);
            styleProgress =`stroke-dasharray: ${(2 * Math.PI * r * progressLen.length) / questions.length} 9999;`;
            textProgress = `${progressLen.length}/${questions.length}`;
          }
          else
          {
            styleProgress =`stroke-dasharray: ${(2 * Math.PI * r * correct) / questions.length} 9999;`;
            textProgress = `${correct}/${questions.length}`;
          }
          quizProgress.style = styleProgress;
          quizProgressText.innerText = textProgress;
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
        handlePrev : function(){
          quizPrev.addEventListener("click",()=>{
                --currentIndex;
                if (currentIndex < 0) {
                    currentIndex = questions.length - 1;
                }
                quizQuestions[currentIndex].click();
            });
        },
        //#endregion
    
        //#region Key
        handleKeyDown: function () {
          document.addEventListener('keydown',(e)=>{
            switch (e.key) {
              case "ArrowRight":
                return quizNext.click();
              case "ArrowLeft":
                 return quizPrev.click();
              default:
                return false;
            }
          });
        },
        handleKeyUp: function () {
          
        },
        //#endregion

    //#endregion

    //#region Render
        //#region Result
        renderResults : function () {
          if (listResults[currentIndex] === listSubmit[currentIndex]) {
            quizAnswers.forEach((answer) => {
              answer.classList.remove('incorrect');
            });
          }
          else{
            quizAnswers.forEach((answer) => {
              answer.classList.remove('active');
              answer.classList.remove('incorrect');
            });
            quizAnswers[listResults[currentIndex]].classList.add('active');
            quizAnswers[listSubmit[currentIndex]].classList.add('incorrect');
          }
        },
        //#endregion
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
        //#region Timer
        renderTimer: function () {
          var timer = 15;
          let _this = this;
          // Lấy thẻ p có id là "timer"
          var countdownElement = document.getElementById("timer");
      
          // Hàm cập nhật thời gian
          function updateTimer() {
            var minutes = Math.floor(timer / 60);
            var seconds = timer % 60;
      
            // Định dạng thời gian thành chuỗi HH:MM:SS
            var timerString =
              (minutes < 10 ? "0" : "") +
              minutes +
              ":" +
              (seconds < 10 ? "0" : "") +
              seconds;
      
            // Gán thời gian đã định dạng vào thẻ p
            countdownElement.innerHTML = timerString;
      
            // Giảm thời gian mỗi giây
            timer--;
            // Kiểm tra nếu hết thời gian
            if (timer < 0) {
              countdownElement.innerHTML = "Hết thời gian!";
              _this.handleCheckResults();
            }
            if (isSubmit) {
              clearInterval(intervalId);
            }
          }
      
          // Gọi hàm updateTimer mỗi giây
          var intervalId = setInterval(updateTimer, 1000);
        },
        //#endregion
    //#endregion

    render: function(){
      this.renderQuestionList();
      this.renderProgress();
      this.renderTimer();
    },
    handle : function(){
      this.handleQuestionList();
      this.handleAnswer();
      this.handleNext();
      this.handlePrev();
      this.handleSubmit();
      this.handleKeyDown();
      this.handleKeyUp();
    },
    start: function (){
      this.randomQuestion();
      this.render();
      this.handle();
    }
  };
  quiz.start();
