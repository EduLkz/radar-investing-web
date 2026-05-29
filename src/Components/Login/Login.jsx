import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUserInfo, userLogin, updateWallet, updateStocks } from '../features/User/userSlice';
import './Login.css'
import { useNavigate } from 'react-router';
import { updateUserStocksInfo, updateWalletInfo } from '../../api/api'

export default function Login() {
    const navigate = useNavigate()
    const userLogMock = {
        "user": 'Eduardo',
        email: 'edu@teste.com',
        phone:'11111111111',
        cpf: '11111111111'
    }

    const userStocks = useSelector((state) => state.user.stocks)
    const userinfo = useSelector((state) => state.user)
    const userinfo2 = useSelector((state) => state.info)


    const submitHandle = async(e) =>{
        e.preventDefault();
        dispatch(userLogin());
        dispatch(addUserInfo(userLogMock))

        const wallet = await updateWalletInfo(userLogMock.email)
        const updatedWallet = {
            balance: wallet[0],
            performance: wallet[1],
            variation: wallet[2],
            profit: wallet[3],
            variation_details: wallet[4],
        }
        
        dispatch(updateWallet(updatedWallet))
        
        const stocks = await updateUserStocksInfo(userLogMock.email, updatedWallet['variation_details'])
        await dispatch(updateStocks(stocks))
    
        console.log(userStocks);
        console.log(userinfo);
        console.log(userinfo2);

        navigate('/Wallet')
    }

    const dispatch = useDispatch();


  return (
    <div className='login'>
        <form action="submit" method="post" onSubmit={(e) => submitHandle(e)}>
            <div className="username">
                <label>User</label>
                <input type='text' minLength={5} value={'edu@teste.com'} className='loginInput'></input>
            </div>
            <div className="password">
                <label>Senha</label>
                <input type='password' minLength={8} value={12345678} className='loginInput'></input>
            </div>
            <button formAction='submit' className='loginButton'>Logar</button>
        </form>

    </div>
  )
}
