
import React from 'react'
import {useHistory} from 'react-router-dom'
import './index.css'

const MovieCard = ({movie}) => {
  const history = useHistory()

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750?text=No+Poster'

  return (
    <li className="movie-card">
      <img
        src={posterUrl}
        alt={movie.title}
        className="movie-poster"
      />

      <div className="movie-card-content">
        <h3 className="movie-title">{movie.title}</h3>

        <p className="movie-rating">
          {movie.vote_average}
        </p>

        <button
          type="button"
          className="details-button"
          onClick={() => history.push(`/movie/${movie.id}`)}
        >
          View Details
        </button>
      </div>
    </li>
  )
}

export default MovieCard
