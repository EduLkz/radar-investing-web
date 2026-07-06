import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { userChangePassword } from '../../api/api';
import './RedefinePassword.css';

export default function RedefinePassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const [newPassword, setNewPassword] = useState(123456789)
    const [confirmPassword, setConfirmPassword] = useState(123456789)

    const submitHandle = async(e) =>{
        if(newPassword !== confirmPassword) return;
        e.preventDefault();
        try{
            userChangePassword(newPassword, token)

        } catch (error) {
            console.log(error)
        }

        navigate('/Login')

    }

  return (
    <div className='redpwd'>
        <form action="submit" method="post" onSubmit={(e) => submitHandle(e)}>
            <div className="redpassword">
                <label>Senha</label>
                <input type='password' minLength={8} onChange={(e) => setNewPassword(e.target.value)} className='redpwdInput'></input>
            </div>
            <div className="redpassword">
                <label>Confirmar senha</label>
                <input type='password' minLength={8} onChange={(e) => setConfirmPassword(e.target.value)} className='redpwdInput'></input>
            </div>
            <div style={{display:'grid', gridAutoFlow: 'row', marginTop: '20px'}}>
                <button formAction='submit' className='redpwdButton'>Redefinir Senha</button>
            </div>
        </form>

    </div>
  )
}
