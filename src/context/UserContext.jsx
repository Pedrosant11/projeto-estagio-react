import React, { createContext, useEffect, useState, useCallback } from "react";
import { getFirestore, collection, where, query, getDocs, setDoc, doc } from "firebase/firestore";
import app from "./../config/firebaseConfig";

export const UserContext = createContext(1);

export const UserContextProvider = (props) => {
    const [user, setUser] = useState();
    const [favorites, setFavorites] = useState(new Set());
    const [ratings, setRatings] = useState({})

    const db = getFirestore(app);

    const fetchData = useCallback(async () => {
        
        if (!user) {
            return
        }
        const q = query(collection(db, "user_favorites"), where("user_id", "==", user.uid), where("is_favorite", "==", true));
        const querySnapshot = await getDocs(q);
        const userFavorites = querySnapshot.docs.map((doc) => {
            return doc.data().game_id;
        });
        console.log(userFavorites)
        setFavorites(new Set(userFavorites));
      }, [user])

    useEffect( () => {
        fetchData().catch(console.error);
    },[user, fetchData])

    const isGameFavorite = (gameId) => {
        return favorites.has(gameId)
    }
    
    const updateGameFavorite = async (gameId, isFavorite) => {
        console.log(gameId)
        console.log(isFavorite)
        try {
            await setDoc(doc(db, "user_favorites", user.uid + gameId.toString()), {
                is_favorite: isFavorite,
                game_id: gameId,
                user_id: user.uid
                });
            if (isFavorite) {
                favorites.add(gameId)
            }else {
                favorites.delete(gameId)
            }
            setFavorites(favorites)
          } catch (error) {
              console.log(error)
          }
        }

    const fetchDataRating = useCallback(async () => {
        if (!user) {
            return
        }
        const docs = await getDocs(collection(db, "user_ratings"))
        const allRatings = {};
        docs.forEach((doc) => {
            if (!(doc.data().game_id in allRatings)) {
                allRatings[doc.data().game_id] = [];
            }
            allRatings[doc.data().game_id].push(doc.data().rating)
        });
        const averages = {}
        Object.entries(allRatings).forEach((entry) => {
            const [gameId, ratings] = entry 
            averages[gameId] = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        })
        setRatings(averages);
    }, [user])

      useEffect( () => {
          fetchDataRating().catch(console.error);
      },[user, fetchDataRating])

      const updateGameRating = async (gameId, rating) => {
        console.log(gameId)
        console.log(rating)
        try {
            await setDoc(doc(db, "user_ratings", user.uid + gameId.toString()), {
                rating,
                game_id: gameId,
                user_id: user.uid
                });
            ratings[gameId] = rating;
            setRatings(ratings)
          } catch (error) {
              console.log(error)
          }
        }

    return (
        <UserContext.Provider value={{user, setUser, favorites, isGameFavorite, ratings, updateGameFavorite, updateGameRating}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;

