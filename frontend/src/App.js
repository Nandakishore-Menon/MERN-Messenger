import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './Login';
import {useStateValue} from "./StateProvider.js";
import dotenv from 'dotenv'
function App() {
  dotenv.config();
  const [{user},dispatch] = useStateValue();
  return (
    <div className = "App">
      {!user ?(
        <Login />
      ):(
        <div className = "app_wrapper">
        <Router>
          <Sidebar />
          <Switch>
            {/* --------------Sidebar----------------- */}
            <Route path = "/rooms/:roomId">
              <Chat/>
            </Route>
            <Route path = "/">

            </Route>
          </Switch>
        </Router>
      </div>
      ) }
    </div>
  );
}

export default App;
