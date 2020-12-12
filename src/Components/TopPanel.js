import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSun} from '@fortawesome/free-solid-svg-icons';


const TopPanel = () => {
    return (
        <div className="topPanel">
            <FontAwesomeIcon icon={faSun} className="topPanel__icon" spin/>
            <p className="topPanel__text">react weather app</p>
        </div>
    )
}

export default TopPanel;