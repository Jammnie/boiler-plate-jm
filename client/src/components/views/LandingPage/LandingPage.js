import React, { useEffect } from 'react'
import Axios from 'axios';
import { useDispatch } from 'react-redux';



function LandingPage() {
  useEffect(()=> {
    console.log('go');
    Axios.get('/api')
    .then((response)=> {console.log(response.data)})
    .catch((err)=>{console.error(err)})
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent:'center', alignContent: 'center',
      width: '100%', height:'100vh'
    }}>
      <h2>
        시작페이지
      </h2>
    </div>
  )
}

export default LandingPage