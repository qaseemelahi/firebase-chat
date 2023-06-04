import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import Welcome from "./pages/Welcome";
import ChatBox from "./pages/Chat";
import { useRegisterServiceWorker } from "./hooks/useRegisterServiceWorker";

function App() {
  const [user] = useAuthState(auth);
  useRegisterServiceWorker()
  return (
    <div className="App">
      {!user ? (
        <Welcome />
      ) : (
        <>
         <ChatBox />
        </>
      )}
    </div>
  );
}

export default App;
