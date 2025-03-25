import "./index.css"
import {Link} from "react-router-dom"
import { FaPeopleGroup } from "react-icons/fa6";
import { PiMapPinAreaFill } from "react-icons/pi";
const EachItem=(props)=>{
    const {itemDetails}=props
    const {id,title,location,image,description,population}=itemDetails
    return (
        <li className="glass-effect">
            <Link className="linkitem" to={`/map/${id}`}>
            <div className="flex-container">
                 <div>
                    <h1 className="cityTitle">{title}</h1>
                    <p className="paradescription">{description}</p>
                    <p className="populationitem"><FaPeopleGroup size={20} />{"     "}{population}</p>
                    <p className="location"> <PiMapPinAreaFill color="#D20103"/> {location}</p>
                 </div>
                 <div>
                    <img className="cityImage" src={image} alt={`${title} image`}/>
                 </div>
                 </div>
            </Link>
    </li>
    )
}

export default EachItem