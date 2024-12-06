let slideIndex = 0;

const updateIndex = () => {
  slideIndex++;
}

const getDameTextContainer = (slideIndex) => {
  let slide = document.querySelector('.active .dame_question');
  let slideText = slide.textContent;
  return slideText;
}

const displayText = (text) => {
  document.querySelector('.active .phrase_dame').textContent = text;
}

//Set up the text for the given slide index
const displayQuestion = (slideIndex) => {
  let slideText = getDameTextContainer(slideIndex);
  slideText.textContent = text[slideIndex].phrase_dame_1;
  text[slideIndex].answers.forEach((answer, index) => {
    document.querySelector('#popup_question label#label_q'+index).textContent = answer;
    document.querySelector('#popup_question input[type="radio"]#q'+index).value = index;
  });
}


const checkAnswer = (slideIndex) => {
  const answer = document.querySelector('popup_question input[type="radio"]:checked').value;
  const correctAnswer = text[slideIndex].correct;
  if (answer === correctAnswer) {
    console.log('Correct!');
  } else {
    console.log('Incorrect!');
  }
}


const fontToggle = () => {
  var currentFont = document.querySelector("body");
  if (currentFont.style.fontFamily != "Braille") {
    currentFont.style.fontFamily = "Braille";
  } else {
    currentFont.style.fontFamily = "Arial";
  }
}

