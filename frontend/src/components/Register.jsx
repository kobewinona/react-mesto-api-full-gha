import {useState} from 'react';
import {Link} from 'react-router-dom';

import Form from './Form';
import Input from './Input';


const Register = props => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  
  const handleEmailValueUpdate = event => {
    setEmailValue(event.target.value);
  }
  
  const handlePasswordValueUpdate = event => {
    setPasswordValue(event.target.value);
  }

  const handleSubmit = () => {
    props.onSignUp({
      email: emailValue,
      password: passwordValue
    });
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <Form
        onSubmit={handleSubmit}
        validate={true}
        submitText="Зарегистрироваться"
        place="auth"
        theme="dark"
        size="small"
        {...props}
      >
        <div className="auth__inputs-container">
          <Input
            onChange={handleEmailValueUpdate}
            value={emailValue}
            validate={false}
            place="auth"
            name="userEmail"
            type="email"
            placeholder="Email"
            aria-label="Email."
            required
          />
          <Input
            onChange={handlePasswordValueUpdate}
            value={passwordValue}
            validate={false}
            place="auth"
            name="userPassword"
            type="password"
            placeholder="Пароль"
            aria-label="Пароль."
            required
          />
        </div>
      </Form>
      <p className="auth__text">Уже зарегистрированы?
        <Link className="auth__link" to="/sign-in"> Войти</Link>
      </p>
    </section>
  );
};

export default Register;