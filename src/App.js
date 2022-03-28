import './styles/index.css';
import './styles/freedom.css';
import AppRoutes from "./routes/AppRoutes";
import {io} from "socket.io-client";

export const socket = io("http://localhost:8000")
export const isAuth = localStorage.getItem("userData") ? true : false

function App() {
    return (
        <div className="App">
            <AppRoutes/>
        </div>

    );
}

export default App;
