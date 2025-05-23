// function for the forecast, it is important to declaring it as exportable
export async function loadForecast(lat = 40.7128, lon = -74.0060) {
    const apiKey = 'b0a8e56f9265a9443635e5f0450f1ecb'; // API key for the forecast
    const forecast = document.getElementById('forecast');
    forecast.innerHTML = '<p>Loading forecast...</p>';

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
        ); // getting forecast info from API

        if (!response.ok) { // if we failed to load the forecast due to any issue, the code will going to dispaly the error message
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }
        const data = await response.json(); // this code is important so that we don't have error message right away

        // Group by date
        const daily = {};
        data.list.forEach(entry => {
            const date = new Date(entry.dt * 1000).toDateString();
            if (!daily[date]) {
                daily[date] = entry;
            }
        });

        const days = Object.keys(daily).slice(0, 3);

        // code for displaying the forecast
        forecast.innerHTML = `<h2>3-Day Forecast for the Local City</h2><ul>` +
            days.map(date => {
                const entry = daily[date];
                const temp = Math.round(entry.main.temp);
                const desc = entry.weather[0].description;
                const icon = entry.weather[0].icon;
                return `<li><strong>${date.split(' ')[0]}:</strong> <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}"> ${desc}, ${temp}°F</li>`;
            }).join('') +
            `</ul>`;

    } catch (err) {
        forecast.innerHTML = `<p>Error loading forecast: ${err.message}</p>`;
    }
}

// loading the current location
export function loadForecastFromGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                loadForecast(latitude, longitude);
            },
            () => {
                loadForecast(); // fallback to default
            }
        );
    } else {
        loadForecast(); // fallback if no geolocation
    }
} 