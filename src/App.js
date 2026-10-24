import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Header from './components/Header'
import MovieList from './components/MovieList'
import MovieDetails from './components/MovieDetails'
import NotFound from './components/NotFound'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/">
  <MovieList category="popular" title="Popular" />
</Route>
      <Route exact path="/top-rated">
        <MovieList category="top_rated" title="Top Rated" />
      </Route>
      <Route exact path="/upcoming">
        <MovieList category="upcoming" title="Upcoming" />
      </Route>
      <Route exact path="/search">
        <MovieList category="search" title="Search Results" />
      </Route>
      <Route exact path="/movie/:id" component={MovieDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
