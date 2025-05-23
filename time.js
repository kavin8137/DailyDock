// definding the time class
export default class Time {
    constructor() {
        this.date;
        this.day;
        this.time;
        this.message;
        this.weekday;
    }

    // getting the day
    getDay() {
        this.date = new Date();
        this.time = this.date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        this.formattedDate = this.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        this.day = this.date.getDay();
    }

    // determine the day is which day in the week
    getWeekDay(day) {
        switch (day) {
            case 0:
                this.weekday = "Sunday";
                break;
            case 1:
                this.weekday = "Monday";
                break;
            case 2:
                this.weekday = "Tuesday";
                break;
            case 3:
                this.weekday = "Wednesday";
                break;
            case 4:
                this.weekday = "Thursday";
                break;
            case 5:
                this.weekday = "Friday";
                break;
            case 6:
                this.weekday = "Saturday";
                break;
        }
    }
}

// the function for displaying time to html
export function displayTime(time) {
    let article = document.createElement('article');
    let displayDate = document.createElement('h2');
    let displayDay = document.createElement('h1');
    let displayTime = document.createElement('h3');
    let displayMessage = document.createElement('h3');
    displayDate.textContent = `${time.formattedDate}`;
    displayDay.textContent = `It is ${time.weekday} today.`;
    displayTime.textContent = `It is now ${time.time}.`;
    displayMessage.textContent = time.message;
    article.appendChild(displayDate);
    article.appendChild(displayDay);
    article.appendChild(displayTime);
    article.appendChild(displayMessage);
    document.querySelector('#time').appendChild(article);
}