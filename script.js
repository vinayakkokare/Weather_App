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

const form = document.getElementById("Addcityform");

function displayCities(){
    const list = document.getElementById("cities_list");
    list.innerHTML="";

    cities.forEach(function(city){
        const li = document.createElement("li");
        li.textContent=city;
        list.appendChild(li);
    })
};

displayCities();

form.addEventListener("submit", function(event){
    event.preventDefault();

    const cityName = document.getElementById("city_name").value;
    
    cities.push(cityName);
    console.log(cities);

    localStorage.setItem("cities", JSON.stringify(cities));

    
});
