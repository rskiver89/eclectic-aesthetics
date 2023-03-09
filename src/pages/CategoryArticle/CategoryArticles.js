import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ArticleCard from '../../components/ArticleCard/ArticleCard'


function CategoryArticles() {
  const {categoryName}={useParams}
  const [articles, setArticles]=useState([])


  return (
    <div>
      
    </div>
  )
}

export default CategoryArticles
