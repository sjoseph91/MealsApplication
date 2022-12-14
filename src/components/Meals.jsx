import { useGlobalContext } from "../context";
import { BsHandThumbsUp } from "react-icons/bs";

const Meals = () => {

  const { meals, addToFavorites, loading, selectMeal } = useGlobalContext();


  ;

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    )
  }
  else if (meals.length < 1) {
    return (
      <section className="section">
        <h4>No items</h4>
      </section>
    )
  }
  else {
    return (
      <section className="section-center">
        {meals.map((singleMeal) => {
          const { idMeal, strMeal: title, strMealThumb: image } = singleMeal
          return <article key={idMeal} className="single-meal" >
            <img src={image} className="img" onClick={() => selectMeal(idMeal)} />
            <footer>
              <h5>{title}</h5>
              <button
                className='like-btn'
                onClick={() => addToFavorites(idMeal)}
              ><BsHandThumbsUp />
              </button>
            </footer>
          </article>
        })}
      </section>
    )

  }
}

export default Meals;