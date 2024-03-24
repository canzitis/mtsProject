import React from 'react'
import s from './PopUp.module.scss'
const AuthPopup = ({children}:any) => {

  return (
    <div className={s.authPopup}>
      {children}
    </div>
  )
}

export default AuthPopup
