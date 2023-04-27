import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebaseConfig';
import './Homepage.css';
import { getDocs, collection} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const [selectedArticles, setSelectedArticles] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const articleRef = collection(db, 'content');
    getDocs(articleRef).then((res) => {
      const articles = res.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setSelectedArticles(articles);
    });
  }, []);

  return (
    <div className="homepage">
      <div className="selected-articles">
      {selectedArticles?.map((item) => {
        return (
          <div key={item.id} className="selected-article" onClick={() => navigate(`/article/${item.id}`)}>
            <div className="selected-article-info">
              <p>{item.title}</p>
            </div>
            <img src={item.image} alt={item.title} />
          </div>
        );
      })}

      </div>
    </div>
  );
}

export default Homepage;
