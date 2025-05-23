// importing libraries that built by me in the folder
// to have the code be consistent
import Time, {displayTime} from './time.js';
import { displayCalendar, months} from './calendar.js';
import { loadForecastFromGeolocation } from './forecast.js';

// methods for updating the time block
function updateTime() {
    const container = document.querySelector('#time');
    container.innerHTML = '';

    let time = new Time();
    time.getDay();
    time.getWeekDay(time.day);
    displayTime(time);
}

updateTime();

// this code makes the time constantly update as 
// long as the page loads
setInterval(updateTime, 1000);
loadForecastFromGeolocation();

// declaring the calendar and display it to the html
const calendarContainer = document.querySelector('#calendar');
displayCalendar(calendarContainer);

// declaring the popup todo list and display it to html
const popup = document.getElementById('event-popup');
const closeBtn = document.getElementById('popup-close')
const saveBtn = document.getElementById('save-event');
const input = document.getElementById('event-input');

// the close button for the popup
closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
    input.value = ''
})

// save button fo the popup
saveBtn.addEventListener('click', () => {
    const key = saveBtn.dataset.key;
    const text = input.value.trim();
    if (!text) return;

    // using the localStorage to store the item on the
    // to do list
    let items = JSON.parse(localStorage.getItem(key) || '[]'); // this code is inspired by ChatGPT
    items.push({ text, done: false });
    localStorage.setItem(key, JSON.stringify(items));
    input.value = '';
    popup.classList.add('hidden');
    displayCalendar(document.querySelector('#calendar'));
})

