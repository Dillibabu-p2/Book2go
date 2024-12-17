import React, { useState, useEffect } from "react";

function Movies({ userEmail, onBookTicket, onLogout }) {
  const [moviesList, setMoviesList] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: "", genre: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch movies when the component mounts
  useEffect(() => {
    fetch("/api/Movie")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((movies) => {
        setMoviesList(movies);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies. Please try again.");
        setLoading(false);
      });
  }, []);

  // Handle adding a new movie
  const handleAddMovie = () => {
    if (!newMovie.title || !newMovie.genre) {
      setError("Both Title and Genre are required.");
      setMessage(""); // Clear any existing success message
      return;
    }

    fetch("/api/Movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add movie");
        }
        return response.json();
      })
      .then((addedMovie) => {
        setMoviesList((prevMovies) => [...prevMovies, addedMovie]); // Update the movies list
        setNewMovie({ title: "", genre: "" }); // Reset input fields
        setMessage("Movie added successfully!");
        setError(""); // Clear any existing error message
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
        setError("Failed to add the movie. Please try again.");
        setMessage(""); // Clear any existing success message
      });
  };

  // Handle deleting a movie
  const handleDeleteMovie = (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    fetch(`/api/Movie/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete movie");
        }
        setMoviesList((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== id)
        );
        setMessage("Movie deleted successfully!");
        setError(""); // Clear any existing error message
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
        setError("Failed to delete the movie. Please try again.");
        setMessage(""); // Clear any existing success message
      });
  };

  // Show loading state
  if (loading) {
    return <p>Loading movies...</p>;
  }

  return (
    <div>
      <h1>Movies</h1>
      <p>Welcome, {userEmail}!</p>

      {/* Display success or error messages */}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Movies List */}
      {moviesList.length > 0 ? (
        <ul className="movie-list">
          {moviesList.map((movie) => (
            <li key={movie.id} style={{ marginBottom: "10px" }}>
              <strong>
                {movie.title} ({movie.genre})
              </strong>
              <button
                onClick={() => handleDeleteMovie(movie.id)}
                style={{
                  marginLeft: "10px",
                  color: "white",
                  backgroundColor: "red",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
              <button
                onClick={() => onBookTicket(movie)}
                style={{
                  marginLeft: "10px",
                  color: "white",
                  backgroundColor: "blue",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Book Ticket
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No movies available. Add a movie to get started!</p>
      )}

      {/* Add New Movie Section */}
      <h2>Add a New Movie</h2>
      <div className="add-movie">
        <input
          type="text"
          placeholder="Title"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Genre"
          value={newMovie.genre}
          onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleAddMovie} style={{ cursor: "pointer" }}>
          Add Movie
        </button>
      </div>

      {/* Logout Button */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={onLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Movies;
