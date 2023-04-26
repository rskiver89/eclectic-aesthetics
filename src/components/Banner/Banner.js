import React, { useState, useEffect } from 'react';
import './Banner.css';
import { db } from '../../config/firebaseConfig';
import { getDocs, query, collection, orderBy, limit } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const [mainArticle, setMainArticle] = useState('');
  const [otherArticles, setOtherArticles] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const articleRef = collection(db, 'articles');
    const q = query(articleRef, orderBy('createdAt', 'desc'), limit(5));
    getDocs(q, articleRef).then((res) => {
      const articles = res.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setMainArticle(articles[0]);
      setOtherArticles(articles?.splice(1));
    });
  }, []);

  return (
    <div className="banner">
      <div
        className="main-article"
        style={{ backgroundImage: `url(${mainArticle.image})` }}
        onClick={() => navigate(`/article/${mainArticle.id}`)}
      >
        <div className="article-info">
          <h2>{mainArticle?.title}</h2>
          <small>{mainArticle?.createdAt?.toDate().toDateString()}</small>
        </div>
      </div>
      <div className="other-articles">
        {otherArticles &&
          otherArticles.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => navigate(`/article/${item.id}`)}
                className="other-article"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="article-info">
                  <h3>{item?.title}</h3>
                  <small>{item?.createdAt?.toDate().toDateString()}</small>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Banner;
