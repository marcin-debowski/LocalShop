function Login(){
return(
    <>
        <form className="grid grid-flow-col grid-rows-6 gap-3 min-w-md bg-zinc-100 rounded-md justify-items-center pt-5 pb-5 mt-30 ">
            <h1 className="">Log in</h1>
            
            <label htmlFor="login"  className="w-3/4 text-left content-center">Login</label>
            <input type="text" name="login" id="login" placeholder="Login" className="w-3/4 border-stone-400 border-2 rounded-sm focus:border-stone-900"/>
            
            <label htmlFor="password"  className="w-3/4 text-left content-center">Password</label>
            <input type="password" name="password" id="password" placeholder="Password" className="w-3/4   border-stone-400 border-2 rounded-sm focus:border-stone-900"/>
            
            <button className="w-1/2 m-auto hover:ba">Log in</button>        
        </form>
    </>
)
}
export default Login;