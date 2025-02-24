import React, { useEffect } from 'react'
import axios from 'axios';

function LandingPage() {
  useEffect(()=> {
    console.log('go');
    axios.get('/api/helloworld')
    .then((response)=> {console.log(response.data)})
    .catch((err)=>{console.error(err)})
  }, []);

  return (
    <div>LandingPage</div>
  )
}

export default LandingPage