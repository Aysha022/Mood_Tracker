let emojis = document.querySelectorAll('.emoji');
let button = document.querySelector('.button');
let input = document.querySelector('.input');
let loggedMood = document.querySelector('.logged-mood');
let container = document.querySelector('.container');
let container2 = document.querySelector('.container2');
let editButton = document.querySelector('.edit-button');
let resetButton = document.querySelector('.reset-button');

let selectedMood = null;

emojis.forEach(emoji => {
  emoji.addEventListener('click',() => {
    emojis.forEach(e => e.classList.remove('selected'));
    emoji.classList.add('selected');
    selectedMood = emoji.dataset.mood;
  });
});

button.addEventListener('click',() => {
    if(!selectedMood) {
        alert("Pick a mood first! ☁️");
        return;
    }

    let note = input.value;
    let moodData = {
        mood : selectedMood,
        note : note
    };

    localStorage.setItem("moodEntry",JSON.stringify(moodData));

    container.classList.add('move-left');
    container2.classList.add('show');
    container2.classList.remove('hidden');


    displaySavedMood();
    input.value = "";
});

function displaySavedMood() {
    let data = JSON.parse(localStorage.getItem('moodEntry'));

    if(data) {
        loggedMood.innerHTML = `
           <p>💌 You were feeling <strong>${data.mood}</strong></p>
           <p>📝 Note: "${data.note}"</p>
        `;

        selectedMood = data.mood;

        emojis.forEach(e => {
            e.classList.remove('selected');
            if(e.dataset.mood === data.mood) {
                e.classList.add('selected');
            }
        });

        input.value = data.note;
    }
}

//edit mood
editButton.addEventListener('click',() => {
    container.classList.remove('move-left');
    container2.classList.remove('show');
    container2.classList.add('hidden');
});

//reset mood 
resetButton.addEventListener('click',() => {
    localStorage.removeItem('moodEntry');
    loggedMood.innerHTML = "";
    input.value = "";
    emojis.forEach(e => e.classList.remove('selected'));
    selectedMood = null;

    container.classList.remove('move-left');
    container2.classList.remove('show');
    container2.classList.add('hidden');
});

displaySavedMood();

