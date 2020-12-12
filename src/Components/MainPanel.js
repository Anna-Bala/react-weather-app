import Info from './Info';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSun} from '@fortawesome/free-solid-svg-icons';
import {faSun as farSun } from '@fortawesome/free-regular-svg-icons';

const MainPanel = (props) => {
    const data = props.data;
    return (
        <>
            <div className="main">
                {data.country? <p className="main__text">{data.country},&nbsp;</p> : null}
                <p className="main__text">{data.city}</p>
                <p className="main__data">{data.date}</p>

                {data.sunrise?
                <div className="main__sun"> 
                    <FontAwesomeIcon icon={farSun} className="main__icon --first" pulse color="#ffd556"/> 
                    <p className="main__text">Sunrise: {data.sunrise}</p>
                </div>
                : null}
                
                {data.sunset? 
                <div className="main__sun">
                    <FontAwesomeIcon icon={faSun} className="main__icon --second" pulse color="#649b92"/>
                    <p className="main__text">Sunset: {data.sunset}</p>
                </div> 
                : null}
            </div>
            <Info data={data} day={props.day}/>
        </>
    );
}

export default MainPanel;