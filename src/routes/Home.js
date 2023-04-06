import React, { useCallback, useEffect, useState } from 'react';
import { collection, addDoc, getDocs, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db, storage } from 'fbase';
import Tweet from 'components/Tweet';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import TweetInsert from 'components/TweetInsert';


function Home({userObj}) {
  const [tweets, setTweets] = useState([]);

/*   const getTweet = async () =>{
    const querySnapshot = await getDocs(collection(db, "tweets"));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      const tweetObject = {...doc.data(), id:doc.id}
      // 기존의 문서 데이터를 가져오면서 id를 문서의 id 값을 추가함. 
      setTweets(prev => [tweetObject, ...prev]); //새로운 게 앞에 있어야함. 
    });
  } */

  useEffect(() => {
    const q = query(collection(db, "tweets"),orderBy("createdAt","desc"));
    // query 문서를 요청함. + 정렬을 함. 
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // onSnapshot => 문서를 불러옴. 
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id}); // 밀어넣음. 
      });
      setTweets(newArray);
    });
  },[]);

  return (
    <div className='container'>
    <TweetInsert userObj={userObj}></TweetInsert>
    <div>
      {tweets.map(tweet => (
      <Tweet 
        key = {tweet.id}
        tweetObj = {tweet}
        isOwner = {tweet.creatorId === userObj.uid}
       />
       ))
       }
    </div>
    <footer>&copy; {new Date().getFullYear()} Twitter app</footer>
    </div>
  )
}

export default Home