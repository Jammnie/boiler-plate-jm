import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setComfirmPassword] = useState("");
  

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onConfirmPasswordHandler = (event) => {
    setComfirmPassword(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if(Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인이 같아야 합니다.');
    }

    const body = {
      email: Email,
      password: Password,
      name: Name
    }

    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success) {
        navigate("/loginpage");
      } else {
        alert("Fail to sign up");
      }
    });
  }

  return (
    <div style={{ display: 'flex', justifyContent:'center', alignContent: 'center',
      width: '100%', height:'100vh'
    }}>
      <form style={{ display:'flex', flexDirection: 'column' }}
      onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type='email' value={Email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type='text' value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type='password' value={Password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br/>

        <button type='submit'>
          회원가입
        </button>
      </form>
    </div>
  )
}

export default RegisterPage