import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db, storage } from 'fbase';
import { ref, deleteObject } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'styles/tweet.scss'

function Tweet(props) {
  const {tweetObj:{text,id, attachmentUrl, createdAt}, isOwner} = props;
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(text);
  const [nowDate, setNowDate] = useState(createdAt)

  useEffect(() =>{
    //  
    let timeStamp = createdAt;
    const now = new Date(timeStamp);
    setNowDate(now.toDateString()) // toUTCString : 시분초까지 나옴
  },[])
  const deleteClick = async() =>{
    const ok = window.confirm("삭제하시겠습니까");
    if(ok){
      const data = await deleteDoc(doc(db, "tweets", `/${id}`));
      if(attachmentUrl !== ""){
        await deleteObject(ref(storage, attachmentUrl));
      }
      // 일치하는 아이디에 해당되는 문서를 삭제함. 
    } else {}
  }

  const toggleEditing = (e) =>{
    setEditing(prev => !prev);
  }
  const confirmEditing = async(e) =>{
    e.preventDefault();
    const newTweetRef = doc(db, "tweets", `/${id}`);

    await updateDoc(newTweetRef, {
      text: newTweet,
      createdAt: Date.name(),
    });
    setEditing(false);
  }

  const onChange = (e) =>{
    const {target:{value}} = e;
    setNewTweet(value);
  }

  return (
    <div className='tweet'>
     {editing ? (
      <>
      <form onSubmit={confirmEditing} className='container tweetEdit'>
      <input type='text' onChange={onChange} value={newTweet} required className='formInput'></input>
      <input type='submit' value='확인' className='formBtn'></input>

      </form>
      <input onClick={toggleEditing} className='formBtn cancelBtn' value='취소'></input> 
      {/* 굳이 캔슬을 다시 만들어 줄 필요가 없고 토글을 시켜주면 됨. */}

      </>
     ): (
      <>
      <h4>{text}</h4>
      {(attachmentUrl !=="") && <img src={attachmentUrl} width='50' height='50' alt=''/>}
      <span>{nowDate}</span>
      {isOwner && (
      <div className='tweet__actions'>
      <span onClick={deleteClick}><FontAwesomeIcon icon='fa-solid fa-trash' /></span>
      <span onClick={toggleEditing}><FontAwesomeIcon icon='fa-solid fa-pencil' /></span>
      </div>
      )}
      </>
     )}
    </div>
  )
}

export default Tweet