import React, { createContext, useContext, useState } from "react";
const LikesContext = createContext();

export const useLikes = () => {
  return useContext(LikesContext);
};

export const LikesProvider = ({ children }) => {
  const [likes, setLikes] = useState([]);
  const handleSetLikes = (id) => {
    if (likes.includes(id)) {
      setLikes((prevLikes) => prevLikes.filter((likeId) => likeId !== id));
    } else {
      setLikes((prevLikes) => [...prevLikes, id]);
    }
  };

  return (
    <LikesContext.Provider value={{ likes, handleSetLikes }}>
      {children}
    </LikesContext.Provider>
  );
};
