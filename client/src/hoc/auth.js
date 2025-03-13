import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';
export default function (SpecificComponent, option, adminRoute=null ) {


  function AuthenticationCheck (props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth())
      .then(response => {
        console.log('hoc auth');
        console.log(response);

        //로그인 하지 않은 상태
        //.payload.isAuth

        if(!response.payload.isAuth) {
          if( option ) {
            navigate('/loginpage');
          }
        } else {
          //로그온 한 상태
          // 어드민인가요?
          if(adminRoute && !response.payload.isAdmin) {
            navigate('/');
          } else {
            // 옵션이 false 인상태
            if( option === false ) { 
              navigate('/landingpage');
            }
          }
        }
      });
    }, []);
    return ( <SpecificComponent />);
  }

  return AuthenticationCheck
}