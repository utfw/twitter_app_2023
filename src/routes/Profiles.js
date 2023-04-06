import { authService, db } from 'fbase'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import Tweet from 'components/Tweet';
import { updateProfile } from 'firebase/auth';
import { async as async1 } from "@firebase/util"
import 'styles/profile.scss';

function Profiles({userObj}) {
  const navigate = useNavigate();
  const [tweets, setTweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState("")
  const onLogOutClick = (e) => {
    authService.signOut();
    navigate('/');
  }
  useEffect(() => {
    const q = query(collection(db, "tweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
          newArray.push({...doc.data(), id:doc.id});
      })
      setTweets(newArray)
      // console.log(newArray)
    })
  },[])

  const onSubmit = async(e) =>{
    e.preventDefault();
    if (userObj.displayName !== newDisplayName){
      await updateProfile(userObj,{
        displayName: newDisplayName,
        // photoURL: 
      });
    }
  }
  console.log(userObj)
  const onChange = (e) =>{
    const {target:{value}} = e;
    setNewDisplayName(value)
  }

  return (
    <div className='container'>
    <form onSubmit={onSubmit} className='profileForm'>
      <input type='text' onChange={onChange} value={newDisplayName} placeholder='Change name' className='formInput' />
      <input type='submit' value='Update Profile' className='formBtn' />
    </form>
      <span onClick={onLogOutClick} className='formBtn cancelBtn logOut'>Log Out</span>
      <div>
        {tweets.map(tweet =>(
          <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid}></Tweet>
        ))}
      </div>
    </div>
  )
}

export default Profiles