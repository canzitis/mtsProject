import React, {useEffect, useState} from 'react';
import s from "./AuthPopupPasswordRecovery.module.scss";
import {Button, Form, FormProps, Input} from "antd";
import {AuthPopupLoginProps, FieldType} from "../../../types/types";
import {useNavigate} from "react-router-dom";
import LoginPage from "../../LoginPage/LoginPage";


const AuthPopupPasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [emailSubmissionStage, setEmailSubmissionStage] = useState('first')
  const [newPasswordForm, setNewPasswordForm] = useState(false)
  const [count, setCount] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRunning) return
    const timer = setInterval(() => {
      setCount(prevCount => prevCount - 1);

    }, 1000);


    return () => {
      setIsRunning(false)
      clearInterval(timer)
    };
  }, [isRunning]);

  useEffect(() => {
    setIsButtonDisabled(email.length < 3)
  }, [email]);

  useEffect(() => {
    setEmailSubmissionStage('first')
    setNewPasswordForm(false)
  }, []);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onBackForm = () => {
    setEmail('')
    setEmailSubmissionStage('first')
  }

  const sendEmail = () => {
    setIsRunning(true)
    setCount(30)
    emailSubmissionStage === 'first' && setEmailSubmissionStage('two')

  }

  return (
    <LoginPage>
      <div className={s.authPopupPasswordRecovery}>
        {newPasswordForm
          ? <div>Новый пароль</div>
          : <>
            <div className={s.authPopupPasswordRecovery__wrapperTitle}>
              {emailSubmissionStage !== 'first' &&
                <button className={s.authPopupPasswordRecovery__wrapperTitle__backButton} onClick={() => onBackForm()}>
                  <img
                    src="./img/backIcon.svg" alt="backButton"/></button>
              }
              <h3 className={s.authPopupPasswordRecovery__title}>Восстановление пароля</h3>
            </div>

            {emailSubmissionStage === 'first' && <span className={s.authPopupPasswordRecovery__subtitle}>Отправим ссылку на восстановление вам на почту</span>}
            {emailSubmissionStage === 'two' &&
              <span
                className={s.authPopupPasswordRecovery__subtitle}>Отправили ссылку на создание нового пароля на {email}</span>}

            <Form
              name="basic"
              initialValues={{remember: true}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className={s.authPopupPasswordRecovery__formWrapper}
            >
              {emailSubmissionStage === 'first'
                && <>
                  <Form.Item name={'email'}
                             rules={[{type: 'email', required: true, message: 'Неверная электорнная почта'}]}
                             className={s.authPopupPasswordRecovery__formWrapper__itemInput__email}>
                    <Input placeholder="Электронная почта" onChange={(e) => setEmail(e.target.value)}/>
                  </Form.Item>


                  <Button type="primary" htmlType="submit" disabled={isButtonDisabled}
                          className={s.authPopupPasswordRecovery__buttonSend}
                          onClick={() => sendEmail()}>
                    Отправить
                  </Button>
                </>
              }

              {emailSubmissionStage === 'two' && <Button type="primary" htmlType="submit" disabled={count > 0}
                                                         className={s.authPopupPasswordRecovery__buttonSend}
                                                         onClick={() => sendEmail()}>
                {count > 0 && `Отправить повторно 00:${count}`}
                {count <= 0 && 'Отправить повторно'}


              </Button>}

              <div className={s.authPopupPasswordRecovery__wrapperButtonFooter}>
                <button className={s.authPopupPasswordRecovery__wrapperButtonFooter__signIn}
                        onClick={() => navigate('/login')}>Вспомнил пароль
                </button>
                <button className={s.authPopupPasswordRecovery__wrapperButtonFooter__signUp}
                        onClick={() => navigate('/register')}>Создать
                  аккаунт
                </button>
              </div>

            </Form>
          </>
        }
      </div>
    </LoginPage>
  );
};

export default AuthPopupPasswordRecovery;
