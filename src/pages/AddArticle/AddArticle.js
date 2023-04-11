import React, {useState} from 'react'
import './AddArticle.css'
import {db, storage, auth} from '../../config/firebaseConfig';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import {toast} from 'react-toastify';

function AddArticle(categories) {
  const [user]=useAuthState(auth);
  let navigate = useNavigate();

  const [formData, setFormData]=useState({
    title: '',
    summary: '',
    paragraphOne: '',
    paragraphTwo: '',
    paragraphThree: '',
    category: '',
    image: ''

  })

  const createArticle = (e) => {
    e.preventDefault()
    const imageRef=ref(storage, `images/${formData.image.name}`)
    uploadBytes(imageRef, formData.image)
    .then(res=>{
      getDownloadURL(res.ref)
      .then(url=> {
        const articleRef=collection(db, 'articles')
        addDoc(articleRef, {
          title: formData.title,
          summary: formData.summary,
          paragraphOne: formData.paragraphOne,
          paragraphTwo: formData.paragraphTwo,
          paragraphThree: formData.category,
          category: formData.title,
          image: url,
          createdAt: Timestamp.now().toDate(),
          createdBy: user?.displayName
        })
        .then(res=>{
          toast('Article added successfully', {type: 'success', autoClose:1500})
          setTimeout(()=>{
            navigate('/')
          }, 20000);
        })
      })
    })
  }




  return (
    <div className='add-article-container'>
      <form className='add-article-form' onSubmit={createArticle}>
        <h2>Create Article</h2>
        <labe for='title'>Title: </labe>
        <input type='text' name='name'></input>

        <label htmlFor='summary'>Summary:</label>
        <textarea name='summary'></textarea>

        <label htmlFor='paragraph-one'>Paragraph One:</label>
        <textarea name='paragraph-one'></textarea>

        <label htmlFor='paragraph-two'>Paragraph Two:</label>
        <textarea name='paragraph-one'></textarea>

        <label htmlFor='paragraph-three'>Paragraph Three:</label>
        <textarea name='paragraph-one'></textarea>
<div>
        <label htmlFor="category">Category:</label>
        <select id="category" name="category">
            <option value="">Select a category</option>
        </select>
        </div>

        <div className='input-group'>
          <label>Upload Image</label>
        </div>
      </form>
      
    </div>
  )
}

export default AddArticle
