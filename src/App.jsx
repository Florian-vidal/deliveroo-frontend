import "./App.css";
import { useEffect, useState } from "react";

import axios from "axios";
import Header from "./components/Header";
import Hero from "./components/Hero/Hero";
import Category from "./components/Category/Category";
import mealDefaultImage from "./assets/images/meal.png";

const baseURL = import.meta.env.VITE_API_URL;

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);

  const shorteringString = (str) => {
    if (str.length > 80) {
      return str.slice(0, 80) + "...";
    } else {
      return str;
    }
  };

  console.log("coucou");

  useEffect(() => {
    // appel à l'API pour récupérer les données via axios
    const fetchData = async () => {
      const response = await axios.get(baseURL + "/");
      // console.log(response.data); // OK
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // fonction permettant da calculer le prix total du panier :
  const getTotal = (arr) => {
    const initialValue = 0;
    let total = arr.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      initialValue
    );

    return total.toFixed(2);
  };

  return isLoading ? (
    <p>Chargement ...</p>
  ) : (
    <>
      <Header />
      <Hero infos={data.restaurant} />
      <main>
        <div className="container">
          <section>
            {data.categories.map((category, index) => {
              // console.log(category); // {name: 'Brunchs', meals: Array(2)}
              return (
                category.meals.length > 0 && (
                  <Category
                    key={category.name + index}
                    category={category}
                    shorteringString={shorteringString}
                    mealDefaultImage={mealDefaultImage}
                    index={index}
                    basket={basket}
                    setBasket={setBasket}
                  />
                )
              );
            })}
          </section>
          <aside className="basket">
            {basket.length === 0 ? (
              <p>Votre panier est vide</p>
            ) : (
              <>
                <section>
                  {basket.map((article, index) => {
                    console.log(article);
                    return (
                      <article key={article.id}>
                        <div>
                          <button
                            onClick={() => {
                              // on veut modifier la quantité du meal :
                              // si la quantité est 1, on supprimera l'élément : modification d'un state tableau
                              // 1 :
                              const copy = [...basket];
                              if (article.quantity < 2) {
                                // 2 :
                                copy.splice(index, 1);
                              } else {
                                // sinon on retire 1 à la quantité
                                // 2 :
                                copy[index].quantity = copy[index].quantity - 1;
                              }
                              // 3 :
                              setBasket(copy);
                            }}
                          >
                            -
                          </button>
                          <p>{article.quantity}</p>
                          <button
                            onClick={() => {
                              // on veut ajouter un à la quantité de l'élément :
                              // 1 :
                              const copy = [...basket];
                              // 2 :
                              copy[index].quantity = copy[index].quantity + 1;
                              // 3 :
                              setBasket(copy);
                            }}
                          >
                            +
                          </button>
                        </div>
                        <p>{article.title}</p>
                        <p>
                          {/* ne pas oublier les parenthèses autour de la multiplication ! */}
                          {(article.price * article.quantity).toFixed(2) + " €"}
                        </p>
                      </article>
                    );
                  })}
                </section>
                <section>
                  <p>Total : {getTotal(basket) + " €"}</p>
                </section>
              </>
            )}
          </aside>
        </div>
      </main>
    </>
  );
}

export default App;
