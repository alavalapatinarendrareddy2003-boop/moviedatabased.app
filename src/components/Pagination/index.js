
import React from 'react'
import {useHistory, useLocation} from 'react-router-dom'

const Pagination = ({page, totalPages}) => {
  const history = useHistory()
  const location = useLocation()

  const changePage = nextPage => {
    const params = new URLSearchParams(location.search)
    params.set('page', String(nextPage))

    history.push({
      pathname: location.pathname,
      search: `?${params.toString()}`,
    })

    window.scrollTo(0, 0)
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="pagination" aria-label="Movie pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => changePage(page - 1)}
      >
        Previous
      </button>

      <p>
        Page {page} of {totalPages}
      </p>

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => changePage(page + 1)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
