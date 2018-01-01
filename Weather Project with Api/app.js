// Init storage
const storage = new Storage();
// Get stored location data
const weatherLocation = storage.getLocationData();

// Init Weather object class
const weather = new Weather(weatherLocation.city, weatherLocation.state);
// weather.changeLocation('Boston', 'MA'); 

// Init UI object class
const ui = new UI();

// Get weather on DOM load
document.addEventListener('DOMContentLoaded',getWeather)

function getWeather(){
    weather.getWeather()  // return promise
    .then(results => {
        // console.log(results);
        ui.paint(results);  // ui - class
    })
    .catch(err => console.log(err));
}
//Change location event
document.getElementById('w-change-btn').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    //Change Location
    weather.changeLocation(city, state);
    
    // Set location in localstorage
    storage.setLocationData(city, state);
    
    // Get and display weather
    getWeather();
    // Close modal
    $('#locationModal').modal('hide');
});