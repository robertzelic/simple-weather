const weatherDataContainer = document.querySelector('.weather__data-container');
const weatherSearchIcon = document.querySelector('.weather__search-icon');
const cityInput = document.querySelector('.weather__search-input');

const fetchWeatherData = city => {
  weatherDataContainer.innerHTML = `<h3 class="weather__data-title">Loading...</h3>`;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fcaa4a278503916e673293ecb1e47e54&units=metric`
  )
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        weatherDataContainer.innerHTML = `<h3 class="weather__data-title">${data.message}</h3>`;
        return;
      }
      weatherDataContainer.innerHTML = `
      <h3 class="weather__data-title">${data.name}, ${data.sys.country}</h3>
      <div class="weather__data">
        <div class="weather__data-1">
          <span class="weather__data-icon">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${
        data.weather[0].description
      }" class="weather__icon-image" />
          </span>
          <span class="weather__data-temp">${Math.round(data.main.temp)}°</span>
        </div>
        <div class="weather__data-2 auto-left-margin">
          <div class="weather__data-wind">
            <i class="ri-windy-line"></i>
            <span>${data.wind.speed} m/s</span>
            <span class="wind-rotate" style="transform: rotate(${data.wind.deg}deg);"><i
                class="ri-arrow-up-line"></i></span>
          </div>
          <div class="weather__data-humid">
            <i class="ri-drop-line"></i>
            <span>${data.main.humidity}%</span>
          </div>
          <div class="weather__data-pressure">
            <i class="ri-meteor-line"></i>
            <span>${data.main.pressure}hPa</span>
          </div>
        </div>
      </div>
      `;
    })
    .catch(error => console.log(error));
};

const fetchWeather = () => {
  if (cityInput.value !== '') {
    fetchWeatherData(encodeURI(cityInput.value));
    cityInput.value = '';
    cityInput.blur();
  }
};

cityInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') fetchWeather();
});

weatherSearchIcon.addEventListener('click', () => fetchWeather());
