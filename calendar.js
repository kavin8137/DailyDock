// declaring the necessary variables
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const dayContainer = document.querySelector('#calendar');
const currentdate = document.querySelector('#calendar-current-date');
const prenexIcons = document.querySelectorAll('.calendar-prenex-icon');

// declaring months for display
export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

// methods that display the Calendar for the user
export function displayCalendar(container) {
    let dayone = new Date(year, month, 1).getDay();
    let lastdate = new Date(year, month + 1, 0).getDate();
    let dayend = new Date(year, month, lastdate).getDay();
    let monthlastdate = new Date(year, month, 0).getDate();
    let lit = "";

    for (let i = dayone; i > 0; i--) {
        lit += `<div class="calendar-day calendar-day-empty">${monthlastdate - i + 1}</div>`;
    }

    for (let i = 1; i <= lastdate; i++) {
        const key = `${year}-${month}-${i}`
        const items = JSON.parse(localStorage.getItem(key) || '[]');
        const hasEvents = items.length > 0;
        let isToday = i === date.getDate() && month === date.getMonth() && year === date.getFullYear()
            ? "calendar-day active" : "calendar-day";
        lit += `<div class="${isToday}" data-date="${key}">${i}
            ${hasEvents ? `<div class="calendar-dot"></div>` : ''}
            </div>`;
    }

    for (let i = dayend; i < 6; i++) {
        lit += `<div class="calendar-day calendar-day-empty">${i - dayend + 1}</div>`;
    }

    currentdate.innerText = `${months[month]} ${year}`;
    container.innerHTML = lit;

    // this block of code is the difficult one since I have too many typos
    const allDays = container.querySelectorAll('.calendar-day:not(.calendar-day-empty)')
    allDays.forEach(dayElem => {
        dayElem.addEventListener('click', () => {
            const key = dayElem.getAttribute('data-date')
            const [y, m, d] = key.split('-').map(Number);
            const selectedDate = `${months[m]} ${d}, ${y}`;
            document.getElementById('selected-date').innerText = selectedDate;
            document.getElementById('save-event').dataset.key = key;
            const listContainer = document.getElementById('todo-list');
            listContainer.innerHTML = '';

            const items = JSON.parse(localStorage.getItem(key) || '[]'); // inspired by ChatGPT
            items.forEach((item, index) => {
                const listItem = document.createElement('div');
                listItem.innerHTML = `
                    <input type="checkbox" ${item.done ? 'checked' : ''} data-index="${index}">
                    <span style="text-decoration: ${item.done ? 'line-through' : 'none'}">${item.text}</span>`;
                listContainer.appendChild(listItem);
            })
            listContainer.addEventListener('change', (e) => {
                if (e.target.tagName === 'INPUT') {
                    const idx = parseInt(e.target.dataset.index);
                    items[idx].done = e.target.checked;
                    localStorage.setItem(key, JSON.stringify(items));
                    displayCalendar(container);
                }
            });
            document.getElementById('event-popup').classList.remove('hidden');
        })
    })
}

// the bottun on the header page
prenexIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        month = icon.id === "calendar-previous" ? month - 1 : month + 1;
        if (month < 0) {
            month = 11;
            year--;
        } else if (month > 11) {
            month = 0;
            year++;
        }
        displayCalendar(dayContainer);
    });
});