function showHome() {
    document.getElementById('home_section').style.display = "block";
    document.getElementById('add_city').style.display = "none";
    document.getElementById('view_cities').style.display = "none";
}

function showAddCity() {
    document.getElementById('home_section').style.display = "none";
    document.getElementById('add_city').style.display = "flex";
    document.getElementById('view_cities').style.display = "none";
}

function showViewCities() {
    document.getElementById('home_section').style.display = "none";
    document.getElementById('add_city').style.display = "none";
    document.getElementById('view_cities').style.display = "flex";
}

let cities =
    JSON.parse(localStorage.getItem("cities")) || [];

cities = [...new Set(cities)];

const form = document.getElementById("Addcityform");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const cityName = document.getElementById("city_name").value;

    if (
        cities.some(city => city.toLowerCase() === cityName.toLowerCase())
    ) {
        alert("City already added!");
        return;
    }

    cities.push(cityName);
    console.log(cities);

    localStorage.setItem("cities", JSON.stringify(cities));
    displayCities();
    loadWeather(cityName);
    showHome();
    form.reset();
});

function displayCities() {
    const list = document.getElementById("cities_list");
    list.innerHTML = "";

    cities.forEach(function (city) {
        const li = document.createElement("li");
        li.textContent = city;
        list.appendChild(li);

        li.addEventListener("click", function () {
            loadWeather(city);
            showHome();
        });
    })
};

const apiKey = "a044798a2b884e0281b45223263005";

function loadWeather(city) {
    console.log(city);

    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById("location").textContent = `Location: ${data.location.name}`;
            document.getElementById("temperature").textContent = `Temperature: ${data.current.temp_c}°C`;
            document.getElementById("humidity").textContent = `Humidity: ${data.current.humidity}%`;
            document.getElementById("wind").textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
            document.getElementById("condition").textContent = `Condition: ${data.current.condition.text}`;
        });

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const forec = document.getElementById("forecast");
            forec.innerHTML = "";
            data.forecast.forecastday.forEach(forecastDay => {
                const p = document.createElement("p");

                const date = new Date(forecastDay.date);

                const formattedDate =
                    date.toLocaleDateString("en-US", {
                        weekday: "long"
                    });

                p.textContent =
                    `${formattedDate}: ${forecastDay.day.avgtemp_c}°C, ${forecastDay.day.condition.text}`;

                forec.appendChild(p);
            });
        });
}

displayCities();