import React, {useState, useEffect} from 'react'
import './Banner.css'
import {db} from '../../config/firebaseConfig'
import {getStorage, ref, list} from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import {getDocs, query, collection, orderBy, limit} from 'firebase/firestore'

function Banner() {
    const [mainArticle, setMainArticle]=useState('')
    const [otherArticles, setOtherArticles]=useState('')
    let navigate=useNavigate()

    useEffect(()=>{
      const articleRef = collection(db, 'articles')
      const q = query(articleRef, orderBy('createdAt', 'desc'), limit(5))
      getDocs(q, articleRef)
      .then(res => {
        const articles = res.docs.map(item => ({
          id: item.id,
          ...item.data()
  
      }))
          setMainArticle(articles[0])
          setOtherArticles(articles?.splice(1))
    })
    }, [])


  return (
    <div className='banner-info'>
      <h2>{mainArticle?.title}...</h2>
      <small>{mainArticle?.createdAt?.toDate().toDateString()}</small>
    </div>
  )
}

export default Banner
