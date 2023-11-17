import { Link } from "react-router-dom";
import heroImage from "../../assets/ai_hero_image.jpg";

export const Home = () => {
  return (
    <div className="home-container">
      <div className="home-container-box-half-width left">
        <h1>Supercar Card Game</h1>
        <h2>A card game with supercars.</h2>
        <h3>
          Unleash your need for speed: Conquer the asphalt with supercar
          strategy!
        </h3>
        <h3>Ready to get started? Click the button to log in!</h3>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
      <div className="home-container-box-half-width">
        <img src={heroImage} alt="" />
        <h3>Not a member yet? Sign up here!</h3>
        <Link to="/register">
          <button className="login-button">Register</button>
        </Link>
      </div>
    </div>
  );
};
