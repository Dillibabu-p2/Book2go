import React, { useState, useEffect } from "react";

function Booking({ userEmail, selectedMovie, onBackToMovies }) {
  const [seats, setSeats] = useState(1);

  const handleBooking = () => {
    if (!selectedMovie || seats <= 0) {
      alert("Please provide valid movie title and number of seats.");
      return;
    }

    fetch("/api/movie/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail,
        movieTitle: selectedMovie.title,
        seats,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Booking successful!");
        } else {
          throw new Error("Failed to book tickets.");
        }
      })
      .catch((error) => {
        console.error("Error booking tickets:", error);
        alert("Booking failed. Please try again.");
      });
  };

  return (
    <div>
      <h1>Book Tickets</h1>
      <div>
        <label>
          Movie Title:
          <input type="text" value={selectedMovie.title} readOnly />
        </label>
      </div>
      <div>
        <label>
          Seats:
          <input
            type="number"
            value={seats}
            min="1"
            onChange={(e) => setSeats(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <button onClick={handleBooking}>Book Tickets</button>
        <button onClick={onBackToMovies}>Back to Movies</button>
      </div>
    </div>
  );
}

export default Booking;
