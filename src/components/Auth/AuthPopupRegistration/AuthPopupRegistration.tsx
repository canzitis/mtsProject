import React, {useState} from 'react';
import LoginPage from "../../LoginPage/LoginPage";
import s from "./AuthPopupRegistration.module.scss";
import {Button, Form, Input} from "antd";
import {regexPassword} from "../../../constants/constants";
import {useNavigate} from "react-router-dom";

const AuthPopupRegistration = () => {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  return (
    <LoginPage>
      <div className={s.authPopupRegistration}>
        <h3 className={s.authPopupRegistration__title}>Регистрация</h3>
        <Form
          name="basic"
          initialValues={{remember: true}}
          autoComplete="off"
          className={s.authPopupRegistration__formWrapper}
        >
          <Form.Item name={'email'}
                     rules={[{type: 'email', required: true, message: 'Неверная электорнная почта'}]}
                     className={s.authPopupRegistration__formWrapper__itemInput__email}>
            <Input placeholder="Почта" onChange={(e) => setEmail(e.target.value)}/>
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={!email.length}
                    className={s.authPopupRegistration__buttonLogin}>
              Далее
            </Button>

          </Form.Item>

          <div className={s.authPopupRegistration__wrapperButtonFooter}>
            <button className={s.authPopupRegistration__wrapperButtonFooter__signIn}
                    onClick={() => navigate('/login')}>Уже есть аккаунт
            </button>
          </div>

        </Form>
      </div>

    </LoginPage>
  );
};

export default AuthPopupRegistration;
