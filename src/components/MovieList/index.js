import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import './index.css'

const API_KEY = process.env.REACT_APP_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const MovieList = ({category, title}) => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const query = params.get('query') || ''
  const page = Math.min(500, Math.max(1, Number(params.get('page')) || 1))

  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const getMovies = async () => {
      if (category === 'search' && !query.trim()) {
        setMovies([])
        setTotalPages(1)
        setLoading(false)
        setError('')
        return
      }

      setLoading(true)
      setError('')

      let url

      if (category === 'search') {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query,
        )}&page=${page}`
      } else {
        url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`
      }

      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }

        const data = await response.json()

        if (active) {
          setMovies(Array.isArray(data.results) ? data.results : [])
          setTotalPages(Math.min(data.total_pages || 1, 500))
        }
      } catch (err) {
        if (active) {
          setMovies([])
          setTotalPages(1)
          setError('Unable to load movies. Check your API key.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    getMovies()

    return () => {
      active = false
    }
  }, [category, query, page])

  return (
    <main className="movie-list-page">
      <h2 className="page-heading">{title}</h2>

      {loading && <p role="status">Loading movies...</p>}

      {!loading && error && <p role="alert">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p>No Search Results Found</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <ul className="movies-grid">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>

          <Pagination page={page} totalPages={totalPages} />
        </>
      )}
    </main>
  )
}

export default MovieList
