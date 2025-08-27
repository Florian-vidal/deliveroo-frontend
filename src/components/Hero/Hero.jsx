import "./hero.css";

const Hero = ({ infos }) => {
  //   console.log("ici =>", infos);
  return (
    <section className="hero">
      <div className="container">
        <div>
          <h1>{infos.name}</h1>
          <p>{infos.description}</p>
        </div>
        <img
          src={infos.picture}
          alt="magnifique présentation de buffet très appétissant"
        />
      </div>
    </section>
  );
};

export default Hero;
