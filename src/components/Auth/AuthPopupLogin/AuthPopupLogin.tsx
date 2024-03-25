import {useState, useEffect} from 'react';
import './AuthPopupLogin.module.scss';
import s from './AuthPopupLogin.module.scss';
import {Button, Checkbox, Form, type FormProps, Input} from 'antd';
import {AuthPopupLoginProps, FieldType} from "../../../types/types";
import LoginPage from "../../LoginPage/LoginPage";
import {useNavigate} from "react-router-dom";





const AuthPopupLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  useEffect(() => {
    setIsButtonDisabled(email.length < 3 || password.length < 3);
  }, [email, password]);

  return (
    <LoginPage>
      <div className={s.wrapperAuthPopupLogin}>
        <h3 className={s.wrapperAuthPopupLogin__title}>Вход</h3>
        <Form
          name="basic"
          initialValues={{remember: true}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className={s.wrapperAuthPopupLogin__formWrapper}
        >
          <Form.Item name={'email'} rules={[{type: 'email', required: true, message: 'Неверная електорнная почта'}]}
                     className={s.wrapperAuthPopupLogin__formWrapper__itemInput__email}>
            <Input placeholder="Электронная почта" onChange={(e) => setEmail(e.target.value)}/>
          </Form.Item>

          <Form.Item
            name={['password']}
            rules={[{required: true, message: 'Неверный пароль'}]}
            className={s.wrapperAuthPopupLogin__formWrapper__itemInput__password}
          >
            <Input.Password placeholder="Пароль" onChange={(e) => setPassword(e.target.value)}/>
          </Form.Item>

          <button className={s.wrapperAuthPopupLogin__resetPassword} onClick={()=>navigate('/recover-password')}>Забыли пароль</button>

          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isButtonDisabled}
                    className={s.wrapperAuthPopupLogin__buttonLogin}>
              Войти
            </Button>

            <button className={s.wrapperAuthPopupLogin__createAccount} onClick={()=>navigate('./recover-password')}>Создать аккаунт</button>

          </Form.Item>
        </Form>
      </div>
    </LoginPage>

  )
}

export default AuthPopupLogin
