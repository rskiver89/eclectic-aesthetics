import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ArticleCard from '../../components/ArticleCard/ArticleCard'
import {db} from '../../config/firebaseConfig'
import {getDocs, query, collection, where} from 'firebase/firestore'
import './CategoryArticles.css'



function CategoryArticles() {
  const {categoryName}=useParams()
  const [articles, setArticles]=useState([])


  useEffect(()=>{
    const articleRef = collection(db, 'content')
    const q = query(articleRef, where('category', "==", categoryName))
    getDocs(q, articleRef)
    .then(res => {
      const articles = res.docs.map(item => ({
        id: item.id,
        ...item.data()

    }))
        setArticles(articles)
        console.log(articles)
  })

  .catch(err=>console.log(err))
  }, [categoryName])



  return (
    <div className='category-articles'>

      {
        articles.map(item => {
          return <ArticleCard key={item.id} article={item} />
        })
      }
      
    </div>
  )
}

export default CategoryArticles
