searchBtn = document.getElementById("search-button");
searchInput = document.getElementById("search-input");

// Current day information
currentDayDate = document.getElementById("current-day-date");
currentDayTemp = document.getElementById("current-temperature");
currentDayHumid = document.getElementById("current-humidity");
currentDayWind = document.getElementById("current-wind-speed");
currentDayUV = document.getElementById("current-uv");

futureForecastAdd = document.getElementById("future-forecasts-add");

storedSearches = document.getElementById("stored-searches");

storedButtons = document.getElementsByClassName("stored-buttons");

// Instantiating moment.js
currentDate = "("+moment().format('l')+")"; 

// Fetching the information on the city typed in the input box
function getDayResults(theCity){

    if(!theCity){

        return;

    }

    currentCityURL = ("http://api.openweathermap.org/data/2.5/weather?q="+theCity+"&appid=235fab1f9291137bef67ef70be92615e")

    fetch(currentCityURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        var kelvinToFair = data.main.temp * 9/5 - 459.67;
        kelvinToFair = kelvinToFair.toFixed(2);

        currentDayDate.innerHTML = (data.name + " " + currentDate);
        currentDayTemp.innerHTML = "Temperature: "+kelvinToFair;
        currentDayHumid.innerHTML = "Humidity: "+data.main.humidity+"%";
        currentDayWind.innerHTML = "Wind Speed: "+data.wind.speed+" MPH";

        uvIndexURL = ("http://api.openweathermap.org/data/2.5/uvi?lat="+data.coord.lat+"&lon="+data.coord.lon+"&appid=235fab1f9291137bef67ef70be92615e")

        console.log(uvIndexURL);

        fetch(uvIndexURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data);

            currentDayUV.innerHTML = data.value;

            setUVStyling(data.value);
        });

        console.log(data);

    });
};

// Styling the UV according to the UV value
function setUVStyling(uvIndex){

    console.log("its working")

    if(uvIndex > 0 && (uvIndex < 3)) {

        currentDayUV.className = "low";
        console.log("wtf")

    }

    if(uvIndex > 3 && (uvIndex < 6)){

        currentDayUV.className = "medium";
        console.log("wtf")

    }

    if(uvIndex > 6 && (uvIndex < 8)){

        currentDayUV.className = "high";
        console.log("wtf")

    }

    if(uvIndex > 8 && (uvIndex < 11)){

        currentDayUV.className = "very-high";
        console.log("wtf")

    }
    if(uvIndex > 11 && (uvIndex < 3)){

        currentDayUV.className = "extreme";
        console.log("wtf")

    }
}

// Handling all of the future forecast generation
function futureForcasts(theCity){

    currentCityURL = ("http://api.openweathermap.org/data/2.5/forecast?q="+theCity+"&appid=235fab1f9291137bef67ef70be92615e")

    fetch(currentCityURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data.list);

        futureForecastAdd.innerHTML = "";

        // Iterating on the forecasts to create the elements
        for(i=0; i<5; i++){

            // Setting the variables to go inside 
            var kelvinToFair = data.list[i].main.temp * 9/5 - 459.67;
            kelvinToFair = kelvinToFair.toFixed(2);

            var dayArticle = document.createElement('article');
            dayArticle.setAttribute("class", "days-forecasts")

            var dayDate = document.createElement('h3');

            var weatherIcon = document.createElement('i');
            weatherIcon.setAttribute("id", "currentImage"+i);

            var dayTemp = document.createElement('h1');
            var dayHumid = document.createElement('h1');

            // Adding the variables
            dayDate.innerHTML = moment().add((1+i), 'days').format('L');
            dayTemp.innerHTML = "Temperature: "+kelvinToFair;
            dayHumid.innerHTML = "Humidity: "+data.list[i].main.humidity + "%";

            // Putting everything together
            dayArticle.appendChild(dayDate);
            dayArticle.appendChild(weatherIcon);
            dayArticle.appendChild(dayTemp);
            dayArticle.appendChild(dayHumid);
            futureForecastAdd.appendChild(dayArticle);
            
            // Changing the icon to match the forecast description
            if(data.list[i].weather.description = "clear sky"){

                var theIcon = document.getElementById("currentImage"+i)
                theIcon.setAttribute("class", "fas fa-sun");
                console.log("clear sky")

            }
        
            if(data.list[i].weather.description = "few clouds"){
        
                var theIcon = document.getElementById("currentImage"+i)
                theIcon.setAttribute("class", "fas fa-cloud-sun");
                console.log("few clouds")
                
            }else if(data.list[i].weather.description = "scattered clouds"){
        
                var theIcon = document.getElementById("currentImage"+i)
                theIcon.setAttribute("class", "fas fa-cloud-sun");
                console.log("scattered clouds")

            }else if(data.list[i].weather.description = "broken clouds"){
        
                var theIcon = document.getElementById("currentImage"+i)
                theIcon.setAttribute("class", "fas fa-cloud-sun");
                console.log("broken clouds")

            }else if(data.list[i].weather.description = "shower rain"){
        
                var theIcon = document.getElementById("currentImage"+i)
                theIcon.setAttribute("class", "fas fa-cloud-rain");
                console.log("shower rain")

            }else if(data.list[i].weather.description = "rain"){
        
                var theIcon = document.getElementById("currentImage"+i)
                theIcon.setAttribute("class", "fas fa-cloud-showers-heavy");
                console.log("rain")

            }else if(data.list[i].weather.description = "thunderstorm"){
        
                var theIcon = document.getElementById("currentImage"+i)
                theIcon.setAttribute("class", "fas fa-poo-storm");
                console.log("thunderstorm")

            }else if(data.list[i].weather.description = "snow"){
        
                var theIcon = document.getElementById("currentImage"+i)
                theIcon.setAttribute("class", "fas fa-snowflake");
                console.log("snow")

            }else if(data.list[i].weather.description = "mist"){
        
                var theIcon = document.getElementById("currentImage"+i)
                theIcon.setAttribute("class", "	fas fa-cloud-sun-rain");
                console.log("mist")

            }
        }
    });
}

function theStoredButtons(cityToStore){

    var storedCities = localStorage.getItem("list of cities");

    if(storedCities){

        storedCities = JSON.parse(storedCities);
        storedCities.push(cityToStore);
        localStorage.setItem("list of cities", JSON.stringify(storedCities));

    }else{

        storedCities = []
        storedCities.push(cityToStore);
        localStorage.setItem("list of cities", JSON.stringify(storedCities));

    }
}

function printSaved(){

    var storedCities = localStorage.getItem("list of cities");

    if(storedCities){

        storedCities = JSON.parse(storedCities);

        for(i=0; i<storedCities.length; i++){

            var newButton = document.createElement('button');
            newButton.innerHTML = storedCities[i];
            newButton.setAttribute("class", "stored-buttons");

            newButton.addEventListener("click", function(e){

                console.log(this);
                searchedCity = this.innerHTML;
                console.log(currentDate);
                getDayResults(searchedCity);
                futureForcasts(searchedCity);
                theStoredButtons(searchedCity);

            })

            storedSearches.appendChild(newButton);

        }

    }
}

function updateSavedList(){

    var storedCities = localStorage.getItem("list of cities");

    if(storedCities){

        storedCities = JSON.parse(storedCities);

        var newButton = document.createElement('button');
        newButton.innerHTML = searchInput.value;
        newButton.setAttribute("class", "stored-buttons");

        newButton.addEventListener("click", function(e){

            console.log(this);
            searchedCity = this.innerHTML;
            console.log(currentDate);
            getDayResults(searchedCity);
            futureForcasts(searchedCity);
            theStoredButtons(searchedCity);

        })

        storedSearches.appendChild(newButton);

    }
}

searchBtn.addEventListener("click", function(){

    searchedCity = searchInput.value;
    console.log(currentDate);
    getDayResults(searchedCity);
    futureForcasts(searchedCity);
    theStoredButtons(searchedCity);
    updateSavedList();

});

printSaved();