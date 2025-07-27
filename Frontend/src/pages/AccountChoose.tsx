import { useNavigate } from "react-router-dom";
import Login from "./Login";
function AccountChoose() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      
      <Login path="/summary" />
      
        <div className="grid grid-cols-1 gap-4 h-full ">
            <h1 className="text-2xl font-bold mb-4">Or continue anonymously</h1>
            <button 
              className="bg-blue-500 w-1/2 self-center self-end justify-self-center text-white mx-4 my-4 px-4 py-4 rounded hover:bg-blue-600 transition-colors"
              onClick={() => navigate("/summary")}
              >
            Continue as Guest
            </button>
        </div>
    </div>
  );
}
export default AccountChoose;
