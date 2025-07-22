import Navbar from "../layout/Navbar"

function Header(){
    
    return(
        <header className="grid grid-cols-6 self-start fixed top-0 left-0 w-full z-50 bg-white shadow-md pb-2 ">

            <h1 className="col-span-2 ">Marcin's Shop</h1>
            <Navbar/>
        </header>
    )
}
export default Header;
