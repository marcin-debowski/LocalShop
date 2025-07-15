function Login(){
return(
    <>
        <form className="grid grid-flow-col grid-rows-5 gap-5 min-w-xs">
            <label htmlFor="login">Login</label>
            <input type="text" name="login" id="login" placeholder="Login" className="border-stone-400 border-2 rounded-sm focus:border-stone-900"/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Password" className="border-stone-400 border-2 rounded-sm focus:border-stone-900"/>
            <button className="w-1/2 m-auto hover:ba">Login in</button>        
        </form>
    </>
)
}
export default Login;