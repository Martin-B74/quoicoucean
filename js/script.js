
const updateIndex = () => {
  slideIndex++;
}

const getDameTextContainer = (slideIndex) => {
  let slide = document.querySelector('.active .dame_question');
  let slideText = slide.textContent;
  return slideText;
}

const displayText = (text) => {
  document.querySelector('.active .dame_question').textContent = text;
}

//Set up the text for the given slide index
const displayQuestion = (slideIndex) => {
  let slideText = getDameTextContainer(slideIndex);
  slideText.textContent = getSlideData(slideIndex).phrase_dame;

  document.querySelector('.active .question').textContent = getSlideData(slideIndex).question;

  getSlideData(slideIndex).answers.forEach((answer, index) => {
    document.querySelector('#pop_question label#label_q'+(index+1)).textContent = answer;
    document.querySelector('#pop_question input[type="radio"]#q'+(index+1)).value = index;
  });
}

const getSlideData = (slideIndex) => {
  return text[slideIndex-1];
}

const checkAnswer = (slideIndex) => {
  const answer = document.querySelector('#pop_question input[type="radio"]:checked').value;
  const correctAnswer = getSlideData(slideIndex).correct;
  if (answer == correctAnswer) {
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


displayQuestion(slideIndex);

console.log(getSlideData(slideIndex).phrase_dame);  
displayText(getSlideData(slideIndex).phrase_dame);

