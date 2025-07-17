import { Link } from "react-router-dom"

function Navbar(){
return(
    <nav className="col-start-1 col-end-7 flex justify-between items-center mt-2">
        <ul className="grid grid-cols-9 w-full">
            <li className="col-start-1"><Link to="/">Home</Link></li>
            <li className="col-start-2"><Link to="/shop">Shop</Link></li>
            <li className="col-start-8"><Link to="/login">Login</Link></li>
            <li className="col-start-9"><Link to="/register">Register</Link></li>
        </ul>
    </nav>
)
    
}
export default Navbar