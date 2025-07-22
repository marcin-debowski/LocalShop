import { Link } from "react-router-dom"
import { useAuthStore } from "../../zustand/authStore"

function Navbar(){

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
return(
    <nav className="col-start-1 col-end-7 flex justify-between items-center mt-2">
        <ul className="grid grid-cols-9 w-full ">
            <li className="col-start-1"><Link to="/">Home</Link></li>
            <li className="col-start-2"><Link to="/shop">Shop</Link></li>
            {user ?(
                <>
                    <span className="col-start-8 m-auto">Witaj, {user.name}</span>
                    <button className="col-start-9" onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <li className="col-start-8 m-auto"><Link to="/login">Login</Link></li>
                    <li className="col-start-9 m-auto"><Link to="/register">Register</Link></li>
                </>
            )}
        </ul>
    </nav>
)
    
}
export default Navbar