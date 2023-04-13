import React, {useState, useEffect} from 'react'
import {db, auth} from '../../config/firebaseConfig'
import {FaHeart, FaRgHeart} from 'react-icons/fa'
import {useAuthState} from 'react-firebase-hooks/auth'
import {getDocs, addDoc, query, collection, where, deleteDoc, doc} from 'firebase/firestore'

function Likes() {
    const [user]=useAuthState(auth)
    const [isLiked, setIsLiked]=useState(false)
    const [likeCount, setLikeCount]=useState(0)



  return (
    <div style={{marginLeft: '10px', display:'flex', alignItems:'center', cursor:'pointer'}}>
        {/* {
            isLiked
            ? 
            <div>
                <FaHeart onClick={handleUnlike} />
                <span>{likeCount}</span>




            </div>
            :
            <div>
                <FaHeart onClick={handleLike} />
                <span>{likeCount}</span>




            </div>

        }
       */}

       <button>Like</button>
    </div>
  )
}

export default Likes
