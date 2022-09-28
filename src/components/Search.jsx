import { useState } from "react";
import {useGlobalContext} from "../context.jsx"


const Search = () => {

  const [text, setText] = useState("");
  const {setSearchTerm, fetchRandomMeal} = useGlobalContext();

  function handleChange(event){
    setText(event.target.value);
  }
  function handleSubmit(e){
    e.preventDefault();
    console.log("submitted");
    
    if (text.length > 0){
      setSearchTerm(text);
    }
  }
  function handleRandomMeal(){
    setSearchTerm("");
    setText("");
    fetchRandomMeal();
  }
    
  return (
    <header className="search-container">
      <form onSubmit={handleSubmit}>
        <input 
          className="form-input"
          placeholder="type favorite meal"
          onChange={handleChange}
          value={text}
          type="text"
        />
        <button className="btn" type="submit">search</button>
        <button className="btn btn-hipster" type="button" onClick={handleRandomMeal}>surprise me!</button>
      </form>
    </header>
  )
}

export default Search;
