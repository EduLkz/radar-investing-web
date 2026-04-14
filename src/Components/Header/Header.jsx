import React, { useEffect } from 'react'
import "./Header.css"
import { NavLink } from 'react-router'
import FeatherIcon from 'feather-icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogoff } from '../features/User/userSlice'

export default function Header() {
  const isLogged = useSelector((state) => state.user.logged)
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user.info)
    
  useEffect(() => {
    console.log(userInfo.user)
  }, [isLogged])

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
                        <button onClick={ () => dispatch(userLogoff())} className='nav-btn logof'> 
                            <FeatherIcon icon='log-out' stroke='white'/>
                        </button>
                    </>
                )
            }

        </div>
    </div>
  )
}
