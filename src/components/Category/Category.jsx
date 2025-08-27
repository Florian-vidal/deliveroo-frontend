import "./category.css";
import Meal from "../Meal/Meal";

const Category = ({
  category,
  mealDefaultImage,
  shorteringString,
  basket,
  setBasket,
}) => {
  return (
    <div className="category">
      <h2>{category.name}</h2>
      <div>
        {category.meals.map((meal) => {
          // console.log(meal);
          return (
            <Meal
              key={meal.id}
              mealDefaultImage={mealDefaultImage}
              shorteringString={shorteringString}
              meal={meal}
              basket={basket}
              setBasket={setBasket}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
