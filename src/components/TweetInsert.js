import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db, storage } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import "styles/tweetinsert.scss"
function TweetInsert({userObj}) {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (tweet !== ""){
      try {
        let attachmentUrl = "";
        
        if(attachment !==""){
          const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
          const response = await uploadString(storageRef, attachment, 'data_url');
          attachmentUrl = await getDownloadURL(ref(storage, response.ref))
        }

        const docRef = await addDoc(collection(db,"tweets"),{
          text: tweet,
          createdAt: Date.now(),
          creatorId: userObj.uid,
          attachmentUrl
        })
        console.log("Document written with ID: ", docRef.id);
        // console.log(userObj.uid)
      } catch (e) {
        console.log('error');
      }
      setTweet("");
      setAttachment("");
    }
  } // input-submit에 온클릭이 아닌 폼에 온서브밋으로 해주어야함. 
  
  const onChange = useCallback((e) => {
    setTweet(e.target.value)
  },[])
  const onFileChange = (e) =>{
    const {target:{files}} = e;
    const theFile = files[0];
    
    const reader = new FileReader();
    // browser API 브라우저에서 보여지게 함. 
      reader.onloadend = (finishedEvent) =>{
        console.log(finishedEvent)
        const {currentTarget:{result}} = finishedEvent;
        // string 형태의 주소.

        setAttachment(result)
      }
    reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () =>{
      setAttachment("");
    }  
  return (
    <form onSubmit={onSubmit} className='InsertForm'>
    <div className='Insert__container'>
      <input type='text' placeholder="What's on your mind" onChange={onChange} value={tweet} maxLength={120} className='InsertInput__Input'/>
      <input type='submit' value='&rarr;' className='InsertInput__arrow' />
    </div>
    <label htmlFor='attach-file' className='InsertInput__label'>
      <span>Add photos</span>
      <FontAwesomeIcon icon='fa-solid fa-plus' />
    </label>
    <input type='file' accept='image/*' onChange={onFileChange} id='attach-file' style={{opacity:0}}/>

    { attachment && (
      <div className='InsertForm__attachment'>
        <img src={attachment} style={{backgroundImage:attachment}} alt=''/>
        <div className='InsertForm__clear' onClick={onClearAttachment}>
          <span>Remove</span>
          </div>
      </div>
    )}
  </form>
  )
}

export default TweetInsert