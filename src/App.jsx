import { Route, Routes } from 'react-router';
import './App.css';
import Header from './Components/Header/Header';
import Wallet from './Pages/Wallet/Wallet';
import Profile from './Pages/Profile/Profile';
import About from './Pages/About/About';
import Login from './Components/Login/Login';
import Search from './Components/Search/Search';
import { useSelector } from 'react-redux';
import Register from './Components/Register/Register';
import RedefinePassword from './Components/RedefinePassword/RedefinePassword';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';


function App() {

  const isLogged = useSelector((state) => state.user.logged)
 
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>

      <div className="App-body">
        
        <Routes>
          <Route index element={<Search/>} />
          <Route path='Wallet' element={!isLogged ? <Login/> : <Wallet/>} />
          <Route path='About' element={<About/>} />
          <Route path='Profile' element={!isLogged ? <Login/> : <Profile/>} />
          <Route path='Login' element={<Login/>} />
          <Route path='Register' element={<Register/>} />
          <Route path='update-password' element={<RedefinePassword/>} />
          <Route path='forgot-password' element={<ForgotPassword/>} />

        </Routes>
        
      </div>
    </div>
  );
}

export default App;
