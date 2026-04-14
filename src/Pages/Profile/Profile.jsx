import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Login from '../../Components/Login/Login'

export default function Profile() {

  const dispatch = useDispatch()
  const isLogged = useSelector((state) => state.user.logged)
  const userInfo = useSelector((state) => state.user.info)


  return (
    <div className="profile">

    {
      !isLogged ? <Login/> : (
        <>
          <div className="item">
            <label htmlFor="user">User: </label>
            <p>{userInfo.user}</p>
          </div>
          <div className="item">
            <label htmlFor="email">Email: </label>
            <p>{userInfo.email}</p>
          </div>      
          <div className="item">
            <label htmlFor="phone">Celular: </label>
            <p>{userInfo.phone}</p>
          </div>
          <div className="item">
            <label htmlFor="cpf">CPF: </label>
            <p>{userInfo.cpf}</p>
          </div>
        </>
      )
    }

    </div>
  )
}
