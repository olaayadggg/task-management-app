import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import SideNav from './components/SideNav';
import { useState } from 'react';
function App() {
  const [navLink, setNavLink] = useState("list")
  return (
    <div className="App">
      <div className="d-flex">
        <SideNav setNavLink={setNavLink} />
        <div className="flex-grow-1">
          <HomePage navLink={navLink} />
        </div>
      </div>
    </div>
  );
}

export default App;
