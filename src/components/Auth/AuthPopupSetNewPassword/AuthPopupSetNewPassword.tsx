import React, {useEffect, useState} from 'react';
import s from "./AuthPopupSetNewPassword.module.scss";
import {Button, Form, Input} from "antd";
import {regexPassword} from "../../../constants/constants";
import {useNavigate} from "react-router-dom";
import LoginPage from "../../LoginPage/LoginPage";

const AuthPopupSetNewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!newPassword.length && !newPasswordRepeat.length) return

    if ((newPassword === newPasswordRepeat) && (regexPassword.test(newPassword) && regexPassword.test(newPasswordRepeat))) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }

  }, [newPassword, newPasswordRepeat]);


  return (
    <LoginPage>
      <div className={s.authPopupSetNewPassword}>
        <h3 className={s.authPopupSetNewPassword__title}>Новый пароль</h3>
        <Form
          name="basic"
          initialValues={{remember: true}}
          autoComplete="off"
          className={s.authPopupSetNewPassword__formWrapper}
        >
          <Form.Item
            name="password"
            extra={!newPassword.length && 'Не менее 8 знаков: латинские буквы, цифры, спецсимволы'}
            rules={[
              {
                required: true,
                message: 'Пароль должен содержать и латиницу, и цифры',
                validator: (_, value) => (regexPassword.test(newPassword) ? Promise.resolve() : Promise.reject(new Error('Неверный пароль'))),
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Пароль" onChange={(e) => setNewPassword(e.target.value)}/>
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            rules={[
              {
                //required: true,
                message: 'Пожалуйста подтвердите ваш пароль',
              },
              ({getFieldValue}) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароль, который вы ввели, не соответствует'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Повторите пароль" onChange={(e) => setNewPasswordRepeat(e.target.value)}/>
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isButtonDisabled}
                    className={s.authPopupSetNewPassword__buttonLogin}>
              Сохранить
            </Button>

            <div className={s.authPopupSetNewPassword__wrapperButtonFooter}>
              <button className={s.authPopupSetNewPassword__wrapperButtonFooter__signIn}
                      onClick={() => navigate('/login')}>Вспомнил пароль
              </button>
              <button className={s.authPopupSetNewPassword__wrapperButtonFooter__signUp}
                      onClick={() => navigate('/register')}>Создать
                аккаунт
              </button>
            </div>


          </Form.Item>
        </Form>
      </div>
    </LoginPage>
  );
};

export default AuthPopupSetNewPassword;
