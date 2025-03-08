import React, { useEffect } from 'react'
import axios from 'axios';
// import { response } from 'express';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function LandingPage() {
  const navigate = useNavigate();

  useEffect(()=> {
    axios.get('/api/hello')
    .then((response)=> {console.log(response.data)})
    .catch((err)=>{console.error(err)})
  }, []);

const onClickHandler = () => {
  axios.get('/api/users/logout')
  .then(response =>{
    if(response.data.logoutSuccess) {
      navigate('/loginpage');
    } else {
      alert('로그아웃에 실패하였습니다.');
    }
  }
  )
  .catch(error=>console.error(error));
}
  
  return (
    <div style={{ display: 'flex', justifyContent:'center', alignContent: 'center',
      width: '100%', height:'100vh'
    }}>
      <h2>
        시작페이지
      </h2>
      <button onClick={onClickHandler}>logout</button>
    </div>
  )
}

export default LandingPage