import { Route, Routes } from 'react-router';
import './App.css';
import Header from './Components/Header/Header';
import Wallet from './Pages/Wallet/Wallet';
import Profile from './Pages/Profile/Profile';
import About from './Pages/About/About';
import Login from './Components/Login/Login';
import Search from './Components/Search/Search';


function App() {
 
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>

      <div className="App-body">
        
        <Routes>
          <Route index element={<Search/>} />
          <Route path='Wallet' element={<Wallet/>} />
          <Route path='About' element={<About/>} />
          <Route path='Profile' element={<Profile/>} />
          <Route path='Login' element={<Login/>} />

        </Routes>
        
      </div>
    </div>
  );
}

export default App;
