function Register(){
return(
    <>
        <form className="grid grid-flow-col grid-rows-10 min-w-md bg-zinc-100 rounded-md justify-items-center pt-5 pb-5  mt-30 ">
            <h1 className="">Register</h1>
            <label htmlFor="email" className="w-3/4 text-left content-center">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" className="w-3/4 border-stone-400 border-2 rounded-sm focus:border-stone-900"/>
            
            <label htmlFor="login"  className="w-3/4 text-left content-center">Login</label>
            <input type="text" name="login" id="login" placeholder="Login" className="w-3/4 border-stone-400 border-2 rounded-sm focus:border-stone-900"/>
            
            <label htmlFor="password"  className="w-3/4 text-left content-center">Password</label>
            <input type="password" name="password" id="password" placeholder="Password" className="w-3/4   border-stone-400 border-2 rounded-sm focus:border-stone-900"/>
            
            <label htmlFor="passwordAgain"  className="w-3/4 text-left content-center">Confirm Password</label>
            <input type="password" name="passwordAgain" id="passwordAgain" placeholder="Confirm Password" className="w-3/4   border-stone-400 border-2 rounded-sm focus:border-stone-900"/>
            
            <button className="w-1/2 m-auto hover:ba">Sign up</button>        
        </form>
    </>
)
}
export default Register;