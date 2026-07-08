import FeatherIcon from 'feather-icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router'
import { userLogoff } from '../features/User/userSlice'
import "./Header.css"

export default function Header() {
    const isLogged = useSelector((state) => state.user.logged)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleLogoff = () => {
        dispatch(userLogoff())
        navigate('/Login')
    }


  return (
    <div className='nav-header'>
        <ul className='nav-list'>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/'>Home</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to={isLogged ? '/Wallet' : '/Login'}>Carteira</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/About'>Sobre</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to={isLogged ? '/Profile' : '/Login'}>Perfil</NavLink>
            </li>
        </ul>
        {/* <p>{isLogged ? 'Logado' : 'Nao Logado'}</p> */}
        <div className="log">
            {
                !isLogged ? (
                    <>
                        <NavLink className='nav-btn' to='/Login'>
                            <FeatherIcon icon='log-in' stroke='white'/>
                        </NavLink>
                    </>
                ) : (
                    <>  
                        <button onClick={handleLogoff} className='nav-btn logof'> 
                            <FeatherIcon icon='log-out' stroke='white'/>
                        </button>
                    </>
                )
            }

        </div>
    </div>
  )
}
