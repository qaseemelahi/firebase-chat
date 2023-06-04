import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import Welcome from "./pages/Welcome";
import ChatBox from "./pages/Chat";
import { useRegisterServiceWorker } from "./hooks/useRegisterServiceWorker";
import NavBar from "./Components/Navbar";

function App() {
  const [user,loading] = useAuthState(auth);
  useRegisterServiceWorker()
  return (
    <>
      <NavBar />

    <div className="App">
    {loading ? <h2>Loading...</h2> : 
    <>
     {!user ? (
        <Welcome />
      ) : (
        <>
         <ChatBox />
        </>
      )}
    </>
    }

     
    </div>
    </>
  );
}

export default App;
