import React, {useContext, createContext, useEffect, useState} from 'react';
import axios from "axios";

const AppContext = createContext();

const AppProvider = (props) => {

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const [meals, setMeals] = useState([])
const [loading, setLoading] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [showModal, setShowModal] = useState(false);
const [selectedMeal, setSelectedMeal] = useState(null)  
const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

const selectMeal = (id, favoriteMeal) => {
  let meal;
  if (favoriteMeal){
    meal = favorites.find(meal => meal.idMeal === id)
  }else{
    meal = meals.find(meal => meal.idMeal === id);
  }
  setSelectedMeal(meal);
  setShowModal(true);
}
function getFavoritesFromLocalStorage() {
  let favorites = localStorage.getItem("favorites");
  if(favorites){
    favorites = JSON.parse(localStorage.getItem("favorites"))
  }else{
    favorites = [];
  }
  return favorites;
}

const addToFavorites = (idMeal) => {
  const alreadyFavorite = favorites.find(meal => meal.idMeal === idMeal);
  if (alreadyFavorite) return
  const meal = meals.find(meal => meal.idMeal === idMeal);
  const updatedFavorites = [...favorites, meal];
  setFavorites(updatedFavorites);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
}

const removeFromFavorites = (idMeal) => {
  const updatedFavorites = favorites.filter( item => item.idMeal !== idMeal);
  setFavorites(updatedFavorites)
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
  
}
const closeModal = () => {
  setShowModal(false);
}
const fetchMeals = async (url) => {
  try{
    setLoading(true);
    const {data} = await axios(url)
    if (data.meals){
      setMeals(data.meals)
    }else{
      setMeals([])
    }
    
    setLoading(false);
  }
  catch (err){
    console.log(err)
  }
}

const fetchRandomMeal = () => {
  fetchMeals(randomMealUrl);
}
  useEffect(() =>{
    fetchMeals(allMealsUrl)
  }, [])
  useEffect(() => {
    if (!searchTerm) return;
    fetchMeals(allMealsUrl + searchTerm)
  }, [searchTerm])
  
  return (
    <AppContext.Provider
      value={{meals, loading, setSearchTerm, fetchRandomMeal, showModal, closeModal, selectMeal, selectedMeal, favorites, addToFavorites, removeFromFavorites}}  
    >
      {props.children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export {AppProvider}