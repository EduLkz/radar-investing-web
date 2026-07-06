import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUserInfo, userLogin, updateWallet, updateStocks, userLogoff } from '../features/User/userSlice';
import './Register.css'
import { NavLink, useNavigate } from 'react-router';
import { updateUserStocksInfo, updateWalletInfo, userLoginDB, userRegisterDB, verifySession } from '../../api/api'

export default function Register() {
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const [loginNome, setLoginNome] = useState('')
    const [loginCPF, setLoginCPF] = useState('')
    const [loginTel, setLoginTel] = useState('')
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState()

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
              }
          }else{
              dispatch(userLogoff())
          }
      }
      restoreSession();
      }, [dispatch]);


    const submitHandle = async(e) =>{
        e.preventDefault();
        try{
            const registerUser = await userRegisterDB(loginNome, loginCPF, loginTel, loginEmail, loginPassword)
            alert('Usuario cadastrado com sucesso!\n Um email para validação da sua conta foi enviado, verifique a caixa de spam!');
        } catch (error) {
            console.log(error)
            alert('Erro ao registrar usuario');
        }
    

        navigate('/Login')
    }


  return (
    <div className='register'>
        <form action="submit" method="post" onSubmit={(e) => submitHandle(e)}>
            <div className="username">
                <label>Nome</label>
                <input type='text' minLength={5} placeholder='nome' onChange={(e) => setLoginNome(e.target.value)} className='registerInput'></input>
            </div>
            <div className="username">
                <label>CPF</label>
                <input type='text' minLength={8} maxLength={10} placeholder='xxxxxxxxx-xx' onChange={(e) => setLoginCPF(e.target.value)} className='registerInput'></input>
            </div>
            <div className="username">
                <label>Celular</label>
                <input type='phone' minLength={10} maxLength={11} placeholder='xxxxxxxxxxx' onChange={(e) => setLoginTel(e.target.value)} className='registerInput'></input>
            </div>
            <div className="username">
                <label>E-mail</label>
                <input type='email' minLength={5} placeholder='e-mail' onChange={(e) => setLoginEmail(e.target.value)} className='registerInput'></input>
            </div>
            <div className="password">
                <label>Senha</label>
                <input type='password' minLength={8} onChange={(e) => setLoginPassword(e.target.value)} className='registerInput'></input>
            </div>
            <div style={{display:'grid', gridAutoFlow: 'row', marginTop: '20px'}}>
                <NavLink className='nav-link' to='/Register'>Entrar com uma conta</NavLink>
                <button formAction='submit' className='loginButton'>Registrar</button>
            </div>
        </form>

    </div>
  )
}
