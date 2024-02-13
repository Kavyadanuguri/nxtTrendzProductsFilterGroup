import {IoSearchOutline} from 'react-icons/io5'
import './index.css'

const FiltersGroup = props => {
  const {
    categoryDetails,
    ratingDetails,
    getFilterValue,
    searchInput,
    onPressEnter,
    activeCategory,
    activeRating,
    categoryState,
    ratingState,
    removeCategoryAndRatingAndSearch,
  } = props

  const filterValue = event => {
    getFilterValue(event.target.value)
  }

  const onEnterKey = event => {
    if (event.key === 'Enter') {
      onPressEnter()
    }
  }

  const getCategory = value => {
    activeCategory(value)
  }

  const getRating = value1 => {
    activeRating(value1)
  }

  const removeFilters = () => {
    removeCategoryAndRatingAndSearch()
  }

  return (
    <div className="filters-group-container">
      <div className="filter-container1">
        <input
          className="input-search"
          type="search"
          onChange={filterValue}
          onKeyDown={onEnterKey}
          value={searchInput}
          placeholder="Search"
        />
        <IoSearchOutline className="search-img" />
      </div>
      <h1 className="category-h1">Category</h1>
      <ul>
        {categoryDetails.map(each => (
          <li
            className="category-con1"
            onClick={() => getCategory(each.categoryId)}
            key={each.categoryId}
          >
            {categoryState === each.categoryId ? (
              <p className="category-p2">{each.name}</p>
            ) : (
              <p className="category-p1">{each.name}</p>
            )}
          </li>
        ))}
      </ul>
      <h1 className="category-h1">Rating</h1>
      <ul>
        {ratingDetails.map(each => (
          <li
            className="rating-con"
            onClick={() => getRating(each.ratingId)}
            key={each.ratingId}
          >
            <img
              src={each.imageUrl}
              alt={`rating ${each.ratingId}`}
              className="star-img"
            />
            {ratingState === each.ratingId ? (
              <p className="rating-p2">& up</p>
            ) : (
              <p className="rating-p1">& up</p>
            )}
          </li>
        ))}
      </ul>
      <button onClick={removeFilters} className="filter-btn" type="button">
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
