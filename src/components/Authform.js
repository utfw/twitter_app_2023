import { authService } from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useCallback, useState } from 'react'
import 'styles/authform.scss'

function Authform() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = useCallback((e) => {
    const {target:{name,value}} = e;
    // name은 각 인풋태그에서 name 속성
    if (name === 'email'){
      setEmail(value);
    } else if(name === 'password'){
      setPassword(value);
    }
  },[email, password]);

  const onSubmit = useCallback(async(e) => {
    e.preventDefault();
    try { // 서버에 요청
      let data;
      if(newAccount){ //회원가입
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else { //로그인
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log('전송함 '+data);
    } catch (error) {
      // 에러 메시지 
      console.log(error);
      setError(error.message);
    }
  },[email, password]);

  const toggleAccount = useCallback((e) => {
    setNewAccount(prev => !prev);
    //화살표 함수
  },[newAccount]); // 버튼을 토글시킴.

  return (
    <>
    <form onSubmit={onSubmit} className='container'>
      <input name='email' type='email' placeholder='Email' required value={email} onChange={onChange} className='authInput'/>
      <input name='password' type='password' placeholder='Password' required value={password} onChange={onChange} className='authInput'/>
      <input type='submit' required value={newAccount ? "Create Account" : "Log in"} className='authInput authSubmit'/>
      {/* state 값에 따라 버튼의 표시(벨류)가 변경 */}
      {error && <span className='authError'>{error}</span>}
    </form>
    <span onClick={toggleAccount} className='authSwitch'>
      {newAccount ? "Sign in" : "Create Account"}
    </span>
    </>
  )
}

export default Authform