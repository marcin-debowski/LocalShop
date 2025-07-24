import "./App.css";
import AppRouter from "./routes/AppRouter";
import {Toaster} from "react-hot-toast";
function App() {
  return (
    <>
      {/* <Login/> */}
      <AppRouter />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;
