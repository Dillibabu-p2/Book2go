import React, { Component } from "react";
import Movies from "./components/Movies";
import Register from "./components/Register";
import Login from "./components/Login";
import Booking from "./components/Booking";

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false, // Tracks login status
      currentComponent: "Login", // Default component (Login or Register)
      userEmail: "", // Tracks the logged-in user
      movies: ["Movie 1", "Movie 2", "Movie 3"],
      selectedMovie: null,
    };
  }

  handleLogin = (email) => {
    this.setState({
      isLoggedIn: true,
      currentComponent: "Movies", // Redirect to Movies page after login
      userEmail: email,
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      currentComponent: "Login", // Redirect to Login page after logout
      userEmail: "",
    });
  };

  handleNavigation = (component, selectedMovie = null) => {
    this.setState({ currentComponent: component, selectedMovie });
  };

  renderComponent() {
    const { currentComponent, isLoggedIn, userEmail, movies, selectedMovie } =
      this.state;

    switch (currentComponent) {
      case "Register":
        return (
          <Register
            onRegisterSuccess={() => this.handleNavigation("Login")}
            onLoginClick={() => this.handleNavigation("Login")}
          />
        );
      case "Login":
        return (
          <Login
            onLoginSuccess={this.handleLogin}
            onRegisterClick={() => this.handleNavigation("Register")}
          />
        );
      case "Movies":
        return (
          <Movies
            userEmail={userEmail}
            onLogout={this.handleLogout}
            onBookTicket={(movie) => this.handleNavigation("Booking", movie)}
          />
        );
      case "Booking":
        return (
          <Booking
            userEmail={userEmail}
            selectedMovie={selectedMovie}
            onBackToMovies={() => this.handleNavigation("Movies")}
          />
        );
      default:
        return <Login onLoginSuccess={this.handleLogin} />;
    }
  }

  render() {
    return (
      <div>
        {/* Render the current component */}
        {this.renderComponent()}
      </div>
    );
  }
}
