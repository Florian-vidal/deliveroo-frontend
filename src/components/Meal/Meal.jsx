import "./meal.css";
import { FaStar } from "react-icons/fa";

const Meal = ({
  meal,
  shorteringString,
  mealDefaultImage,
  basket,
  setBasket,
}) => {
  return (
    <article
      onClick={() => {
        // ajouter le meal au panier !
        // pour cela, il nous faut le satte panier, et la fonction permettant de le modifier !
        // il s'agit d'un state de type tableau, il faut donc respecter les 3 étapes permettant de modifier un state de type complexe :
        // 1 :
        const copy = [...basket];
        // on vérifie AVANT que le meal n'est pas déjà présent dans le panier :

        // Méthode numéro UNE : boucle for
        // let isPresent = false;
        // let indexOfMeal;
        // for (let i = 0; i < copy.length; i++) {
        //   if (copy[i].id === meal.id) {
        //     isPresent = true;
        //     indexOfMeal = i;
        //   }
        // }
        // if (isPresent) {
        //   // alors je rajoute à la quantité de l'élément en question
        //   copy[indexOfMeal].quantity++;

        // Méthode numéro 2 : méthode find
        const result = copy.find((element) => element.id === meal.id); // permet de chercher (et potentiel récupérer) si un élément a le même id que le meal sur lequel on a cliqué
        if (result) {
          // 2
          result.quantity++;
        } else {
          // 2 :
          // rajouter une clef quantity à l'objet meal : on utilise une copie de meal pour ne pas "modifier" le meal "originel"
          const mealCopy = { ...meal };
          mealCopy.quantity = 1;
          copy.push(mealCopy);
        }
        // 3 :
        setBasket(copy);
      }}
    >
      <div>
        <h3>{meal.title}</h3>
        <p>{shorteringString(meal.description)}</p>
        <div className="price-line">
          <p>{meal.price + " €"}</p>
          {meal.popular && (
            <p className="popular">
              <FaStar />
              Populaire
            </p>
          )}
        </div>
      </div>
      {meal.picture ? (
        <img src={meal.picture} alt="aperçu du plat" />
      ) : (
        <img src={mealDefaultImage} alt="aperçu du plat" />
      )}
    </article>
  );
};

export default Meal;
