import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBolt, faCloudRain, faCloudShowersHeavy, faSnowflake, faSun, faCloudSun, faSmog} from '@fortawesome/free-solid-svg-icons';

const Info = (props) => {
    const description = props.data.description;
    const main = props.data.main;
    const perceptibleTemp = props.data.perceptibleTemp;
    const pressure = props.data.pressure;
    const temp = props.data.temp;
    const windSpeed = props.data.windSpeed;

    const length = temp.length;
    const hourDescriptions = ["After 9 PM", "After 6 PM", "After 3 PM", "In the afternoon", "After 9 AM", "After 6 AM", "After 3 AM", "After midnight"];

    let hours = [];

    for(let i = 0; i<length; i++) {
        hours.push(hourDescriptions[i]);
    }

    hours.reverse();

    const indexes = temp.map(item => temp.indexOf(item));

    const icons = {
        Thunderstorm: faBolt,
        Drizzle: faCloudRain,
        Rain: faCloudShowersHeavy,
        Snow: faSnowflake,
        Clear: faSun,
        Clouds: faCloudSun,
        Mist:  faSmog
        //ATMOSPHERE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //DATAAAAAAAAAAAAAAAAAAAAAAAaa
}
        let day = null;
        if(props.day === "datomorrow") day = "Day after tomorrow";
        else if(props.day === "fourthday") day = "Fourth day";
        else if (props.day === "today") day = "today";
        else day = props.day;

        const content = indexes.map(index => {
            const localMain = main[index];
            const localIcon = icons.[localMain]; 
            return(
            <div className="info" key={index}>
            <p className="info__hour">{hours[index]}</p>
            <hr className="info__line"/>
            <div className="info__main">
                <FontAwesomeIcon icon={localIcon} className="info__icon"/>
                <p className="info__description">{description[index]}</p>
            </div>
            <p className="info__text">Temperature: {temp[index]}&#176;C <br/>Apparent temperature: {perceptibleTemp[index]}&#176;C</p>
            <p className="info__text">Wind speed: {windSpeed[index]} m/s</p>
            <p className="info__text">Pressure: {pressure[index]} hPa</p>
        </div>
        )})

        return (
            <>
            {length? <b className="day">{day}</b> : null }
            <div className="container">
                {content}
            </div>
            </>
        )
}

export default Info;