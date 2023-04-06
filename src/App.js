import { useEffect, useState } from "react";
import AppRouter from "Router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFontAwesome, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
library.add(fas, faTwitter, faFontAwesome, faGoogle, faGithub)

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // state에 auth의 현재 유저 정보를 값으로 넣어서 조건을 판단.
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true)
    });
  },[]) 

  return (
    <>
    {init ? (
    <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
    ) : (
      "initializing..."
    )}
    </>
  );
}

export default App;
