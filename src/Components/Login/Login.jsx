import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUserInfo, userLogin, updateWallet, updateStocks, userLogoff } from '../features/User/userSlice';
import './Login.css'
import { useNavigate } from 'react-router';
import { updateUserStocksInfo, updateWalletInfo, userLoginDB, verifySession } from '../../api/api'

export default function Login() {
    const navigate = useNavigate()
    const userLogMock = {
        "user": 'Eduardo',
        email: 'edu@teste.com',
        phone:'11111111111',
        cpf: '11111111111'
    }

    const dispatch = useDispatch();

    const [loginEmail, setLoginEmail] = useState('edu@teste.com')
    const [loginPassword, setLoginPassword] = useState(123456)

    const userStocks = useSelector((state) => state.user.stocks)
    const userinfo = useSelector((state) => state.user.info)

    useEffect(() => {
      const restoreSession = async () => {
          const storedToken = localStorage.getItem('@radarinvest:token');
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
      }, [dispatch]);


    const submitHandle = async(e) =>{
        e.preventDefault();
        const userLogged = await userLoginDB(loginEmail, loginPassword)
        dispatch(await userLogin());
        dispatch(await addUserInfo(userLogged))

        updateLoggedUserInfo(loginEmail)
    }

    const updateLoggedUserInfo = async (loggedEmail) => {
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
    }


  return (
    <div className='login'>
        <form action="submit" method="post" onSubmit={(e) => submitHandle(e)}>
            <div className="username">
                <label>User</label>
                <input type='text' minLength={5} defaultValue={'edu@teste.com'} className='loginInput'></input>
            </div>
            <div className="password">
                <label>Senha</label>
                <input type='password' minLength={8} defaultValue={123456} className='loginInput'></input>
            </div>
            <button formAction='submit' className='loginButton'>Logar</button>
        </form>

    </div>
  )
}
