import { Link } from "react-router-dom";
import heroImage from "../../assets/ai_hero_image.jpg";

export const Home = () => {
  return (
    <div className="home-container">
      <div className="home-container-box-half-width left">
        <h1>Speed Titans</h1>
        <h2>A supercar card game.</h2>
        <h3>
          Unleash the Speed Titans: Conquer the Asphalt with Supercar Strategy!
        </h3>
        <h3>Ready to get started? Click the button to log in!</h3>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
      <div className="home-container-box-half-width">
        <img src={heroImage} alt="" />
        <Link to="/register">
          <button className="login-button">Register</button>
        </Link>
      </div>
    </div>
  );
};
