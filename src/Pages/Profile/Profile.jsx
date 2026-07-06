import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getEmailValidation, userConfirmedChangePassword } from '../../api/api'
import './Profile.css'

export default function Profile() {

  // const dispatch = useDispatch()
  // const isLogged = useSelector((state) => state.user.logged)
  const userInfo = useSelector((state) => state.user.info)
  const [emailSent, setEmailSent] = useState(false)
  const [emailTimer, setEmailTimer] = useState(0)

  const [currentPassword, setCurrentPassword] = useState(123456789)
  const [newPassword, setNewPassword] = useState(123456789)
  const [confirmPassword, setConfirmPassword] = useState(123456789)
  

  const handleConfirmation = () => {
    setEmailSent(true);
    setEmailTimer(10);

    sendConfirmation()
  }

  const handleChangePassword = () => {
    if(newPassword === confirmPassword)
      userConfirmedChangePassword(userInfo.email, currentPassword, newPassword)
  }

  const sendConfirmation = async() => {
    const status = await getEmailValidation(userInfo.email, userInfo.nome)

    if(status === 200){
      alert("Enviamos um email com link para confirmação.\nVerifique a caixa de spam!")
    }else{
      alert("Tivemos um problema para enviar o email")
    }
  }

  const formatphone = (tel) => {
  if (!tel) return "";
  return tel.replace(/\D/g, "")
            .replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1)$2$3-$4");
};

const formatCPF = (cpf) => {
  if (!cpf) return "";
  const digitos = String(cpf).replace(/\D/g, "");
  const cpfCompleto = digitos.padStart(11, "0");
  return cpfCompleto.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

  useEffect(() => {
  if (emailTimer <= 0) return;
  const timerId = setTimeout(() => {
    setEmailTimer(emailTimer - 1);
  }, 1000);

  return () => clearTimeout(timerId);
}, [emailTimer]);
  return (
    <div className="profile">
          <div className="item">
            <label htmlFor="user">User: </label>
            <p>{userInfo.nome}</p>
          </div>
          <div className="item">
            <label htmlFor="email">Email: </label>
            <p>{userInfo.email}</p>
          </div>      
          {
            !userInfo.confirmado ?
            (
            <div className="item">
              <label htmlFor="confirmEmail">Confirmar email: </label>
              <div>
              <button onClick={handleConfirmation} disabled={emailTimer > 0}  className='item-button'>Enviar confirmação</button>
              {
                emailSent ? (<p style={{margin:0}}>Reenviar email em: {emailTimer}</p>):(<></>)
              }
              </div>
            </div>
            ):(<></>)
          }
          <div className="item">
            <label htmlFor="phone">Celular: </label>
            <p>{formatphone(userInfo.phone)}</p>
          </div>
          <div className="item">
            <label htmlFor="cpf">CPF: </label>
            <p>{formatCPF(userInfo.cpf)}</p>
          </div>
            <h3>Alterar Senha</h3>
          <div className="item-input">
            <label htmlFor="cpf">Senha Atual: </label>
            <input type='password' minLength={8} onChange={(e) => setCurrentPassword(e.target.value)} className='loginInput'></input>
          </div>
          <div className="item-input">
            <label htmlFor="cpf">Nova senha: </label>
            <input type='password' minLength={8} onChange={(e) => setNewPassword(e.target.value)} className='loginInput'></input>
          </div>
          <div className="item-input">
            <label htmlFor="cpf">Confirmar nova senha: </label>
            <input type='password' minLength={8} onChange={(e) => setConfirmPassword(e.target.value)} className='loginInput'></input>
          </div>
          <button className='item-button' disabled={!userInfo.confirmado} 
            title={(!userInfo.confirmado) ? 'necessário confirmar email para trocar a senha' : ''}
            onClick={handleChangePassword}>
              Trocar senha</button>

          


          
    </div>
  )
}
