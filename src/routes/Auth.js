import React from 'react';
import { authService } from 'fbase';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Authform from 'components/Authform';
import 'styles/auth.scss';

function Auth() {

  const onSocialClick = async(e) => {
    const {target:{name}} = e;
    let provider;
    // console.log(name);
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    // 왜 로그인 정보를 저장하는가. 
  }

  return (
    <div className='authContainer'>
      <FontAwesomeIcon icon="fa-brands fa-twitter" size='3x' color={'#04AAFF'} style={{marginBottom:30}} />
      <Authform />
      <div className='authBtns'>
        <button onClick={onSocialClick} name='google' className='authBtn'>Continue with Google <FontAwesomeIcon icon="fa-brands fa-google" /></button>
        <button onClick={onSocialClick} name='github' className='authBtn'>Continue with Github <FontAwesomeIcon icon="fa-brands fa-github" /></button>
      </div>
    </div>
  )
}

export default Auth