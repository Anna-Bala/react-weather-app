import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const DayPanel = (props) => {
    return (
        <div className="navigation">
            
            {props.condition? 
            <>
                <p className="navigation__text">previous day</p> 
                <FontAwesomeIcon icon={faArrowLeft} className="navigation__item" onClick={props.previous}/> 
                <FontAwesomeIcon icon={faArrowRight} className="navigation__item" onClick={props.next}/>
                <p className="navigation__text">next day</p>
            </>
            : null}
        </div>
    )
}

export default DayPanel;