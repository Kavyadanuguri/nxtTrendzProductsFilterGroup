import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

/*  <img
          className="failure-img1"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          alt="products failure"
        /> */

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    searchInput: '',
    categoryState: '',
    ratingState: '',
    isValue: false,
    isLoading: false,
    activeOptionId: sortbyOptions[0].optionId,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const {searchInput, categoryState, ratingState} = this.state

    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&title_search=${searchInput}&category=${categoryState}&rating=${ratingState} `
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({isValue: true})
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  getFilterValue = value => {
    this.setState({searchInput: value})
  }

  onPressEnter = () => {
    this.getProducts()
  }

  activeCategory = value => {
    const {categoryState} = this.state
    this.setState({categoryState: value}, this.getProducts)
    console.log(categoryState)
  }

  activeRating = ratingValue => {
    this.setState({ratingState: ratingValue}, this.getProducts)
  }

  removeCategoryAndRatingAndSearch = () => {
    this.setState(
      {categoryState: '', ratingState: '', searchInput: ''},
      this.getProducts,
    )
  }

  renderSuccessOrFailureResponse = props => {
    console.log(props)
    const {isValue} = this.state
    return isValue ? (
      <div className="failure-container1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
          alt="products failure"
          className="failure-img1"
        />

        <h1 className="failure-h1">Oops! Something went wrong</h1>
        <p className="failure-p">
          We are having some trouble processing your request <br />
          Please try again.
        </p>
      </div>
    ) : (
      this.renderProductsList()
    )
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    const isNoProducts = productsList.length > 0
    // TODO: Add No Products View
    return isNoProducts ? (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />

        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view

  render() {
    const {isLoading, searchInput, categoryState, ratingState} = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}

        <FiltersGroup
          categoryDetails={categoryOptions}
          ratingDetails={ratingsList}
          onPressEnter={this.onPressEnter}
          categoryState={categoryState}
          ratingState={ratingState}
          activeCategory={this.activeCategory}
          getFilterValue={this.getFilterValue}
          activeRating={this.activeRating}
          searchInput={searchInput}
          removeCategoryAndRatingAndSearch={
            this.removeCategoryAndRatingAndSearch
          }
        />

        {isLoading
          ? this.renderLoader()
          : this.renderSuccessOrFailureResponse()}
      </div>
    )
  }
}

export default AllProductsSection
