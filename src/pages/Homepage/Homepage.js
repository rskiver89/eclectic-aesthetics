import React, { useState, useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import { db } from '../../config/firebaseConfig';
import './Homepage.css';
import { getDocs, query, collection, where, limit } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [selectedArticles, setSelectedArticles] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const articleRef = collection(db, 'articles');
    const q = query(articleRef, where('isSelected', '==', true), limit(5));
    getDocs(q, articleRef).then((res) => {
      const articles = res.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setSelectedArticles(articles);
    });
  }, []);

  return (
    <div className="homepage">
      {/* <h1 className="homepage-title">Editor's Choice</h1> */}
      <Banner />
      <div className="selected-articles">
        {selectedArticles?.map((item) => {
          return (
            <div key={item.id} className="selected-article">
              <p>{item.title}</p>
              <img src={item.image} alt={item.title} />
              <button onClick={() => navigate(`/article/${item.id}`)}>Read</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Homepage;
