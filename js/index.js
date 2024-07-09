// Today Variables
let todayName = document.getElementById("today-name");
let todayDateNum = document.getElementById("today-date-num");
let monthName = document.getElementById("month-name");
let locationCity = document.getElementById("location");
let tempNum = document.getElementById("num");
let tempIcon = document.getElementById("temp-icon-img");
let tempCondition = document.getElementById("condition");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let WindDirection = document.getElementById("wind-direction");

// Next Days
let nextDay = document.getElementsByClassName("forcast-header-next");
let nextDayimg = document.getElementsByClassName("next-day-img");
let maxTemp = document.getElementsByClassName("greatest");
let minTemp = document.getElementsByClassName("smallest")
let nextDayCond = document.getElementsByClassName("condition");

//Search Input
let searchInput = document.getElementById("search");

// Fetch APi
async function getWeatherDate(city= "cairo") {
    let myRequest = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f3cfbbfdf015455482140821240707&q=${city}&days=3`);
    let weatherData = await myRequest.json()
    return weatherData;
}

getWeatherDate()

// Display Today Data
function displayTodayData(data) {
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    monthName.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"});
    todayDateNum.innerHTML = todayDate.getDate();
    locationCity.innerHTML = data.location.name;
    tempNum.innerHTML = data.current.temp_c
    tempIcon.setAttribute("src",data.current.condition.icon);
    tempCondition.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity + "%";
    wind.innerHTML = data.current.wind_kph + " km/h";
    WindDirection.innerHTML = data.current.wind_dir;
}

// Display Next Days
function displayNextDaysData(data) {
    let forcastData = data.forecast.forecastday;
    for (let i = 0; i < 2; i++) {
        let nextDate = new Date(forcastData[i + 1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday: "long"})
        maxTemp[i].innerHTML = forcastData[i + 1].day.maxtemp_c;
        minTemp[i].innerHTML = forcastData[i + 1].day.mintemp_c;
        nextDayimg[i].setAttribute("src", forcastData[i+1].day.condition.icon)
        nextDayCond[i].innerHTML = forcastData[i + 1].day.condition.text;
    }
}

// Display All Functions
async function startApp(city= "cairo") {
    
    let weatherData = await getWeatherDate(city);
    if(!weatherData.error) {

        displayTodayData(weatherData);
        displayNextDaysData(weatherData)
    }

}

startApp()

searchInput.addEventListener("input", function() {
    startApp(searchInput.value)
})