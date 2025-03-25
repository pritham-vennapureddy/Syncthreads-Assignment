import { CgProfile } from "react-icons/cg";
import "./index.css"
const Header=()=>{
    return (
        <>
        <div className="background-container">
            <h1 className="dashboardheading">Dashboard</h1> 
            <div>
            <CgProfile color="#DFDEE6" size={40} />
            </div>
        </div>
        </>
    )
}

export default Header