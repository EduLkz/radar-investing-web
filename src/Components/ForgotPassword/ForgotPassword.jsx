import { useState } from 'react';
import { requestChangePassword } from '../../api/api';
import './ForgotPassword.css';

export default function ForgotPassword() {
    const [pwdEmail, setPwdEmail] = useState('edu_a.r@hotmail.com')

    const submitHandle = async(e) =>{
        e.preventDefault();
        try{
            requestChangePassword(pwdEmail);
            alert('Email enviado com link para redefinição de senha\nVerifique a caixa de spam!')
        } catch (error) {
            console.log(error)
            alert('Erro ao enviar email de redefinição')
        }
    }

  return (
    <div className='fgpwd'>
        <form action="submit" method="post" onSubmit={(e) => submitHandle(e)}>
            <div className="username">
                <label>E-mail</label>
                <input type='email' minLength={5} placeholder='e-mail' onChange={(e) => setPwdEmail(e.target.value)} className='fgpwdInput'></input>
            </div>
            <div style={{display:'grid', gridAutoFlow: 'row', marginTop: '20px'}}>
                <button formAction='submit' className='fgpwdButton'>Recuperar senha</button>
            </div>
        </form>

    </div>
  )
}
