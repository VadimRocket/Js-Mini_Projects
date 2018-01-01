class Weather{
    constructor(city, state){
        this.apiKey = '8a897797265a64b4';
        this.city  = city;
        this.state = state;
    }

// Fetch weather from API
async getWeather(){
    const response = await fetch(`http://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.state}/${this.city}.json`); 
    //response data
    const responseData = await response.json();
    return responseData.current_observation;
   }
  // change w location
  changeLocation(city,state ){
    this.city = city;
    this.state = state;
  }


}