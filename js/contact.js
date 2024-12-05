let nameDiv = document.querySelector('.nameDiv');
let firstNameDiv = document.querySelector('.firstNameDiv');

////////////// Get buttons vars //////////////

// Month buttons
let minusMonth = document.querySelector('.minusMonth');
let addMonth = document.querySelector('.addMonth');

// Year buttons
let minusYear = document.querySelector('.minusYear');
let addYear = document.querySelector('.addYear');

// Hour buttons
let minusHour = document.querySelector('.minusHour');
let addHour = document.querySelector('.addHour');

// Day buttons
let minusDay = document.querySelector('.minusDay');
let addDay = document.querySelector('.addDay');

// Send Button
let sendButton = document.querySelector('.sendBtn');

// Modal result
let modalResult = document.querySelector('#modalResult');

// Modal close
let modalClose = document.querySelector('#modalClose');
let modalCloseBtn = document.querySelector('#modalCloseBtn');

// We add 30 selects to the nameDiv
for (let i = 0; i < 30; i++) {
    let select = document.createElement('select');
    select.setAttribute('name', `lastName${i}`);
    // We add a class to the select
    select.classList.add('lastName');
    select.classList.add('form-select');
    // Add the aria-label attribute
    select.setAttribute('aria-label', `Last Name letter ${i}`);
    // We add the options to the select
    select.appendChild(new Option(' ', ' '));
    select.appendChild(new Option('-', '-'));

    // We add the whole alphabet to the select
    for (let j = 65; j < 91; j++) {
        select.appendChild(new Option(String.fromCharCode(j), String.fromCharCode(j)));
    }
    // We the select to the nameDiv
    nameDiv.appendChild(select);
}

function addLineFirstName(index){
    // We create the div that will contain the checkboxes
    let lineDiv = document.createElement('div');
    // We add a class to the div
    lineDiv.classList.add('firstNameLine');
    // We add the checkboxes to the div
    for (let i = 65; i < 91; i++) {
        // We create the input
        let input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', `firstName${index}`);
        input.setAttribute('value', String.fromCharCode(i));
        // We add a class to the input
        input.classList.add('firstName');
        input.classList.add('form-check-input');
        // Add the aria-label attribute
        input.setAttribute('aria-label', `First Name letter ${index}`);
        // We create the label
        let label = document.createElement('label');
        label.classList.add('form-check-label');
        label.appendChild(input);
        label.appendChild(document.createTextNode(String.fromCharCode(i)));
        // We add the label to the firstNameDiv
        lineDiv.appendChild(label);
    }
    // We add the div to the firstNameDiv
    firstNameDiv.appendChild(lineDiv);
}

// We add all 30 lines of checkboxes to the firstNameDiv
for (let i = 0; i < 30; i++) {
    addLineFirstName(i);
}

minusMonth.addEventListener('click', (e) => {
    e.preventDefault();
    minValButton('monthValue');
});

addMonth.addEventListener('click', (e) => {
    e.preventDefault();
    addValButton('monthValue');
})

minusYear.addEventListener('click', (e) => {
    e.preventDefault();
    minValButton('yearValue');
});

addYear.addEventListener('click', (e) => {
    e.preventDefault();
    addValButton('yearValue');
});

minusHour.addEventListener('click', (e) => {
    e.preventDefault();
    minValButton('hourValue');
});

addHour.addEventListener('click', (e) => {
    e.preventDefault();
    addValButton('hourValue');
});

minusDay.addEventListener('click', (e) => {
    e.preventDefault();
    minValButton('dayValue');
});

addDay.addEventListener('click', (e) => {
    e.preventDefault();
    addValButton('dayValue');
});

sendButton.addEventListener('click', (e) => {
    e.preventDefault();
    sendForm();
});

function minValButton(varName){
    let p = document.querySelector(`.${varName}`);
    // We verify that the value is not 0
    if (parseInt(p.innerText) > 0){
        p.innerText = parseInt(p.innerText) - 1;
    }
}

function addValButton(varName){
    let p = document.querySelector(`.${varName}`);
    // If contain month limit to 12
    if (varName == 'monthValue' && parseInt(p.innerText) == 12){
        return;
    }
    // If contain day limit to 31
    if (varName == 'dayValue' && parseInt(p.innerText) == 31){
        return;
    }
    p.innerText = parseInt(p.innerText) + 1;
}

function sendForm(){
    // We all the names in nameDiv
    let names = document.querySelectorAll('.nameDiv select');
    let lastName = '';
    // We get the last name
    for(let i = 0; i < names.length; i++){
        // We verify that don't have two spaces next to each other
        if (names[i].value == ' ' && lastName[i + 1] == ' '){
            break;
        }
        lastName += names[i].value;
    }
    console.log(lastName);

    // We get the first name
    let firstName = '';
    let firstNames = document.querySelectorAll('.firstNameDiv input');
    firstNames.forEach((input) => {
        if (input.checked){
            firstName += input.value;
        }
    });
    console.log(firstName);

    // We get the birthdate
    let month = document.querySelector('.monthValue').innerText;
    let year = document.querySelector('.yearValue').innerText;
    let day = document.querySelector('.dayValue').innerText;
    let hour_in_sec = document.querySelector('.hourValue').innerText;

    // We convert the hour in seconds to hours, minutes and seconds
    let hour = Math.floor(hour_in_sec / 3600);
    let min = Math.floor((hour_in_sec % 3600) / 60);
    let sec = hour_in_sec % 60;

    console.log(`${month}/${day}/${year} ${hour}:${min}:${sec}`);

    // We get the email
    let email = document.querySelector('#email').value;
    console.log(email);

    // We get the message
    let message = document.querySelector('#message').value;
    
    // We convert the message from binary to text
    let messageText = '';
    for (let i = 0; i < message.length; i += 8){
        messageText += String.fromCharCode(parseInt(message.substr(i, 8), 2));
    }
    console.log(messageText);

    // We add the values to the modal
    document.querySelector('#modalLastName').innerText = lastName;
    document.querySelector('#modalFirstName').innerText = firstName;
    document.querySelector('#modalBirthdate').innerText = `${month}/${day}/${year} ${hour}:${min}:${sec}`;
    document.querySelector('#modalEmail').innerText = email;
    document.querySelector('#modalMessage').innerText = messageText;
    
    // We open the modal
    modalResult.classList.add('show');
    modalResult.classList.add('modal-open');
    modalResult.style.display = 'block';
}

// Add the event listener to the close button
modalClose.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
});

modalCloseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
});

function closeModal(){
    modalResult.classList.remove('show');
    modalResult.classList.remove('modal-open');
    modalResult.style.display = 'none';
}