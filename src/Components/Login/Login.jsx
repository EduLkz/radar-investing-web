import React from 'react'
import { useDispatch } from 'react-redux';
import { addUserInfo, userLogin } from '../features/User/userSlice';
import './Login.css'
import { useNavigate } from 'react-router';

export default function Login() {
    const navigate = useNavigate()
    const userLogMock = {
        "user": 'Eduardo',
        email: 'edu.teste@teste.com',
        phone:'11111111111',
        cpf: '11111111111'
    }

    const submitHandle = (e) =>{
        e.preventDefault();
        dispatch(userLogin());
        dispatch(addUserInfo(userLogMock))
        navigate('/Wallet')
    }

    const dispatch = useDispatch();


  return (
    <div className='login'>
        <form action="submit" method="post" onSubmit={(e) => submitHandle(e)}>
            <div className="username">
                <label>User</label>
                <input type='text' minLength={5} required className='loginInput'></input>
            </div>
            <div className="password">
                <label>Senha</label>
                <input type='password' minLength={8} required className='loginInput'></input>
            </div>
            <button formAction='submit' className='loginButton'>Logar</button>
        </form>
    </div>
  )
}
