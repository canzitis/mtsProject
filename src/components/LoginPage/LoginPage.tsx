import React from 'react'
import AuthPopup from "../Auth/AuthPopup/AuthPopup";
import s from './LoginPage.module.scss'

const LoginPage = ({children}:any) => (
  <div className={s.loginPage}>
    <img
      src='/img/logo.svg'
      alt='logo'
      width={160}
      height={75}
      className={s.loginPage__logoImg}
    />

    <img
      src='/img/backgroundLoginPage.svg'
      alt='backgroungImg'
      width={1000}
      height={1000}
      className={s.loginPage__backgroundImg}
    />
    <AuthPopup children={children} />
  </div>
)

export default LoginPage
