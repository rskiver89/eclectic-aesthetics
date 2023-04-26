import React from 'react'
import './Header.css'
import {FaHome} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {auth} from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'

function Header({categories}) {

    let navigate=useNavigate();
    const [user]=useAuthState(auth)
  return (
    <div className='header-wrapper'>
    <div className='header-accent'></div>
    <div className='header-container'>

      <div className='categories-container'>
        {
            categories.map((item, index)=>{
                return <Link key={index} className='nav-link' to={`/category/${item}`}>{item}</Link>
            })
        }
      </div>

      <FaHome className='home-icon' onClick={()=> navigate('/')} />

      <div>

      {
      user? 
      <div className='signin-container'>
        <span className='username'>{user?.displayName ? user?.displayName : user?.email} </span>
        {
          user
          ? <Link className='auth-link' to='addArticle'>Add Article</Link>
          : null
        }
        <button onClick={()=>signOut(auth)} className='auth-link'>Logout</button>
      </div>
      : <Link className='auth-link' to={'/auth'}> Signup </Link>   
      } 

      </div>

    </div>
    </div>
  )
}

export default Header