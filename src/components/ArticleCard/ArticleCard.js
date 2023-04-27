import React from 'react'
import { Link } from 'react-router-dom'
import './ArticleCard.css'
import { useNavigate } from 'react-router-dom'

function ArticleCard({article}) {
  const navigate = useNavigate();
  return (
    <div
      className="selected-article"
      onClick={() => navigate(`/article/${article.id}`)}
    >
      <div className="selected-article-info">
        <p>{article.title}</p>
      </div>
      <img src={article.image} alt={article.title} />
    </div>
  );
}

export default ArticleCard
