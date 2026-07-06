import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { updateUserStocksInfo, updateWalletInfo, userLoginDB, verifySession } from '../../api/api';
import { addUserInfo, updateStocks, updateWallet, userLogin, userLogoff } from '../features/User/userSlice';
import './Login.css';

export default function Login() {
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const [loginEmail, setLoginEmail] = useState('edu_a.r@hotmail.com')
    const [loginPassword, setLoginPassword] = useState(123456789)

    const userStocks = useSelector((state) => state.user.stocks)
    const userinfo = useSelector((state) => state.user.info)

    useEffect(() => {
      const restoreSession = async () => {
          const storedToken = localStorage.getItem('@radarinvest2:token');
          if(storedToken){
              const validSession = await verifySession(storedToken);
              console.log(validSession)
              if(validSession.length === 0)
                dispatch(userLogoff)
              else{
                dispatch(await addUserInfo(validSession))
                dispatch(await userLogin());
                updateLoggedUserInfo(validSession.email)
              }
          }else{
              dispatch(userLogoff())
          }
      }
      restoreSession();
       // eslint-disable-next-line
      }, [dispatch]);


    const submitHandle = async(e) =>{
        e.preventDefault();
        try{
            const userLogged = await userLoginDB(loginEmail, loginPassword)
            dispatch(await userLogin());
            dispatch(await addUserInfo(userLogged))

            updateLoggedUserInfo(loginEmail)
        } catch (error) {
            alert('Login falhou')
        }
    }

    const updateLoggedUserInfo = async (loggedEmail) => {
        try{
            const wallet = await updateWalletInfo(loggedEmail)
            const updatedWallet = {
                balance: wallet[0],
                performance: wallet[1],
                variation: wallet[2],
                profit: wallet[3],
                variation_details: wallet[4],
            }
            
            
            dispatch(updateWallet(updatedWallet))
            
            const stocks = await updateUserStocksInfo(loggedEmail, updatedWallet['variation_details'])
            await dispatch(updateStocks(stocks))
        
            console.log(userStocks);
            console.log(userinfo);
            navigate('/Wallet')
        } catch (error) {
            console.log(error)
        }

    }



  return (
    <div className='login'>
        <form action="submit" method="post" onSubmit={(e) => submitHandle(e)}>
            <div className="username">
                <label>E-mail</label>
                <input type='email' minLength={5} placeholder='e-mail' onChange={(e) => setLoginEmail(e.target.value)} className='loginInput'></input>
            </div>
            <div className="password">
                <label>Senha</label>
                <input type='password' minLength={8} onChange={(e) => setLoginPassword(e.target.value)} className='loginInput'></input>
            </div>
            <div style={{display:'grid', gridAutoFlow: 'row', marginTop: '20px'}}>
                <NavLink className='nav-link' to='/Register'>Resgistrar nova conta</NavLink>
                <NavLink className='nav-link' to='/forgot-password'>Esqueci minha senha</NavLink>

                <button formAction='submit' className='loginButton'>Logar</button>
            </div>
        </form>

    </div>
  )
}
