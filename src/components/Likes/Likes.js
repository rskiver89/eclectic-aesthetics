import React, { useState, useEffect } from "react";
import { db, auth } from "../../config/firebaseConfig";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getDocs,
  addDoc,
  query,
  collection,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Likes({ articleId }) {
  const [user] = useAuthState(auth);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const likesRef = collection(db, "likes");

  useEffect(() => {
    if (user) {
      const q = query(likesRef, where("articleId", "==", articleId), where("userId", "==", user.uid));
      getDocs(q).then((res) => {
        setIsLiked(!res.empty);
      });
    }
  }, [user, articleId, likesRef]);

  useEffect(() => {
    const q = query(likesRef, where("articleId", "==", articleId));
    getDocs(q).then((res) => {
      setLikeCount(res.size);
    });
  }, [articleId, likesRef]);

  const handleLike = () => {
    addDoc(likesRef, {
      userId: user?.uid,
      articleId: articleId,
    }).then(() => {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    });
  };

  const handleUnlike = () => {
    const q = query(likesRef, where("articleId", "==", articleId), where("userId", "==", user.uid));
    getDocs(q).then((res) => {
      if (!res.empty) {
        const likeId = res.docs[0].id;
        deleteDoc(doc(db, "likes", likeId)).then(() => {
          setIsLiked(false);
          setLikeCount(likeCount - 1);
        });
      }
    });
  };

  return (
    <div style={{ marginLeft: "10px", display: "flex", alignItems: "center", cursor: "pointer" }}>
      {isLiked ? (
        <div>
          <FaHeart onClick={handleUnlike} style={{margin: '0 8px'}} />
          <span>{likeCount}</span>
        </div>
      ) : (
        <div>
          <FaRegHeart onClick={handleLike} style={{margin: '0 8px'}} />
          <span>{likeCount}</span>
        </div>
      )}
    </div>
  );
}

export default Likes;
