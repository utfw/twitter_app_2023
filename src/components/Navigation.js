import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Navigation({userObj}) {
  return (
  <nav>
    <ul style={{display:"flex", justifyContent:"center", marginTop: 50}}>
      <li><Link to={'/'} style={{marginRight:10}}>
        <FontAwesomeIcon icon='fa-brands fa-twitter' size='2x' color={'#04aaff'}/>
      </Link></li>
      <li><Link to={'/profile'} style={{display:'flex', flexDirection:"column", alignItems:"center", marginRight:10, fontSize:12}}>
        <FontAwesomeIcon icon='fa-solid fa-user' size='2x' color={'#04aaff'}/><span style={{marginTop:10}}>{userObj.displayName ? (userObj.displayName+"'s Profile"):("My Profile")}</span><img src='' alt=''></img>
      </Link></li>
    </ul>
  </nav>
  )
}

export default Navigation