import React, {Component} from 'react';
import TopPanel from './TopPanel';
import Form from './Form';
import DayPanel from './DayPanel';
import MainPanel from './MainPanel';
import '../Styles/main.css';

class App extends Component {
  state = {
    formValue: '',
    date: '',
    country: '',
    city: '',
    sunrise: '',
    sunset: '',
    pressure: [],
    windSpeed: [],
    temp: [],
    perceptibleTemp: [],
    main: [],
    description: []
  }

  KeyAPI = "b11eb17e42c175cd0d7337214415f646";
  data = null;
  day = 'today';

  handleChange = (e) => {
    let value = e.target.value;
    this.setState({
      formValue: value
    })
  }

  manageData = () => {
    this.reset();
    const currentDay = this.day;
    const hour = new Date(this.data.list[0].dt * 1000).getHours() -1;
    let loop = null;

    switch(hour) {
      case 0: loop = 8; break;
      case 3: loop = 7; break;
      case 6: loop = 6; break; 
      case 9: loop = 5; break; 
      case 12: loop = 4; break;  
      case 15: loop = 3; break;
      case 18: loop = 2; break; 
      case 21: loop = 1; break;  
      default: loop = 0;
    }

    let pressure = [];
    let windSpeed = [];
    let temp = [];
    let perceptibleTemp = [];
    let main = [];
    let description = [];

    let date = '';
    let sunrise ='';
    let sunset = '';
    let country = '';
    let city = '';

      let i = 0;
      if (currentDay === 'tomorrow') {i = loop; loop += 8;}
      else if (currentDay === 'datomorrow') {i = loop + 8; loop += 16;}
      else if (currentDay === 'fourthday') {i = loop + 16; loop += 24;}

    for (i; i<loop; i++) {
        const currentList = this.data.list[i];
        pressure.push(currentList.main.pressure);
        windSpeed.push(currentList.wind.speed);
        temp.push(currentList.main.temp);
        perceptibleTemp.push(currentList.main.feels_like);
        main.push(currentList.weather[0].main);
        description.push(currentList.weather[0].description);
    }

    sunrise = new Date (this.data.city.sunrise * 1000).toISOString();
    sunrise  = sunrise.substring(11, 16);

    sunset = new Date (this.data.city.sunset * 1000).toISOString();
    sunset  = sunset.substring(11, 16);

    country = this.data.city.country;
    city = this.data.city.name;

    let accurateDay = new Date();
    if(this.day === "tomorrow") accurateDay.setDate(accurateDay.getDate() + 1);
    else if(this.day === "datomorrow") accurateDay.setDate(accurateDay.getDate() + 2);
    else if(this.day === "fourthday") accurateDay.setDate(accurateDay.getDate() + 3);

    console.log(accurateDay.toISOString().slice(0, 10));

    date = (accurateDay.toISOString()).slice(0, 10);

    this.setState({
      country,
      date,
      city,
      sunrise,
      sunset,
      windSpeed,
      pressure,
      temp,
      perceptibleTemp,
      main,
      description
    })
  }

  reset = () => {
    this.setState({
      sunrise: '',
      sunset: '',
      pressure: [],
      windSpeed: [],
      temp: [],
      perceptibleTemp: [],
      main: [],
      description: []
    });
  }

  nextDay = () => {
    const currentDay = this.day;
    let localDay = '';
    if(currentDay === 'today') {localDay = 'tomorrow'}
    else if (currentDay === 'tomorrow') {localDay = 'datomorrow'}
    else if (currentDay === 'datomorrow') {localDay = 'fourthday'}
    else if (currentDay === 'fourthday') {localDay = 'today'}
    this.day = localDay;
    this.manageData();
  }

  previousDay = () => {
    const currentDay = this.day;
    let localDay = '';
    if(currentDay === 'today') {localDay = 'fourthday'}
    else if (currentDay === 'tomorrow') {localDay = 'today'}
    else if (currentDay === 'datomorrow') {localDay = 'tomorrow'}
    else if (currentDay === 'fourthday') {localDay = 'datomorrow'}
    this.day = localDay;
    this.manageData();
  }

  handleSubmit = (e) => {
   e.preventDefault();
   const city = this.state.formValue;
   const urlAPI = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.KeyAPI}&units=metric`;
   fetch(urlAPI)
    .then(response => {
      if(response.ok) return response
      throw Error('API error')
    })
    .then(response => response.json())
    .then(result => {this.data = result; this.manageData();})
  }

  render () {
    return (
      <div className="App">
        <TopPanel />
        <Form typing={this.handleChange} submit={this.handleSubmit}/>
        <DayPanel next={this.nextDay} previous={this.previousDay} condition={this.state.city}/>
        <MainPanel data={this.state} day={this.day}/>
      </div>
    );
  }
}

export default App;
