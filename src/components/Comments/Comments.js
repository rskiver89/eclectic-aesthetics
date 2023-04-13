import React, {useState, useEffect} from 'react'
import {db, auth} from '../../config/firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'
import {Timestamp, getDocs, addDoc, query, collection, where, deleteDoc, doc} from 'firebase/firestore'
import {toast} from 'react-toastify'
import './Comments.css'

function Comments({articleId}) {
    const [newComment, setNewComment]=useState('')
    const [user]=useAuthState(auth)
    const [comments, setComments]=useState([])



  return (
    <div className='comments-container'>
        {
            comments.map(item=>{
                return <div className='comment' key={item.id}>
                    <p>{item.content}</p>
                    {
                        user.uid === item.userId
                        ?<button onClick={()=>deleteComment(item.id)}>Delete</button>
                        : null
                    }


                    {
                        user
                        ? <form onSubmit={addNewComment}>
                            <input value={newComment}
                            type='text'
                            onChange={(e)=>setNewComment(e.target.value)}
                             />
                             <button type='submit'>Add new comment</button>
                        </form>
                        :       <p>Please login to comment</p>
                    }
                </div>
            })
        }
    </div>
  )
}

export default Comments

