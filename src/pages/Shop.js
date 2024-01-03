import React, { useState, useEffect, useCallback, useRef } from "react"
import HeaderImage from "../components/HeaderImage"
import { product } from "../assets/data/data"
import { HiViewGrid } from "react-icons/hi"
import { MdOutlineViewDay } from "react-icons/md"
import Featured from "../components/Featured"
import { motion } from "framer-motion"

const Shop = ({ addToCart }) => {
	const [numOfProductsToDisplay, setNumOfProductsToDisplay] = useState(8)
	const [currentPage, setCurrentPage] = useState(1)
	const [gridView, setGridView] = useState(true)
	const [listView, setListView] = useState(false)
	const [showingResults, setShowingResults] = useState("")
	const [sortOption, setSortOption] = useState("default")
	const [sortedProducts, setSortedProducts] = useState([])
	const [isOpen, setIsOpen] = useState(false)

	const filtersRef = useRef()

	const showFilters = () => {
		setIsOpen(!isOpen)
		if (filtersRef.current) {
			filtersRef.current.classList.toggle("filters_sidebar")
		}
	}

	const resetFilters = () => {
		if (filtersRef.current) {
			filtersRef.current.classList.remove("filters_sidebar")
			setIsOpen(false)
		}
	}

	const handleGridView = () => {
		setGridView(true)
		setListView(false)
	}

	const handleListView = () => {
		setGridView(false)
		setListView(true)
	}

	const getProductsForCurrentPage = () => {
		const startIndex = (currentPage - 1) * numOfProductsToDisplay
		const endIndex = startIndex + numOfProductsToDisplay
		return sortedProducts.slice(startIndex, endIndex)
	}

	const getPageNumbers = () => {
		const pageNumbers = []
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(i)
		}
		return pageNumbers
	}

	const totalPages = Math.ceil(product.length / numOfProductsToDisplay)

	const handlePrevClick = () => {
		setCurrentPage(Math.max(currentPage - 1, 1))
	}

	const handleNextClick = () => {
		setCurrentPage(Math.min(currentPage + 1, totalPages))
	}

	const handleSortChange = (e) => {
		const option = e.target.value
		setSortOption(option)
	}

	const sortProducts = useCallback(() => {
		let sorted = [...product]

		switch (sortOption) {
			case "name":
				sorted = sorted.sort((a, b) => a.name.localeCompare(b.name))
				break
			case "lowestPrice":
				sorted = sorted.sort((a, b) => a.price - b.price)
				break
			case "highestPrice":
				sorted = sorted.sort((a, b) => b.price - a.price)
				break
			default:
				// Default sorting or no sorting
				break
		}

		setSortedProducts(sorted)
		setCurrentPage(1)
	}, [sortOption])

	useEffect(() => {
		sortProducts()
	}, [sortOption, sortProducts])

	const handleNumOfProductsChange = (e) => {
		const newValue = parseInt(e.target.value, 10)
		if (!isNaN(newValue) && [4, 8, 12, 16, 20, 24, 28, 32].includes(newValue)) {
			setNumOfProductsToDisplay(newValue)
			setCurrentPage(1)
		}

		const upperBound = Math.min(newValue, product.length)

		setShowingResults(`showing 1-${upperBound} of ${product.length} results`)
	}

	useEffect(() => {
		// Set initial showingResults value
		setShowingResults(
			`showing 1-${numOfProductsToDisplay} of ${product.length} results`
		)
	}, [numOfProductsToDisplay, sortedProducts.length])

	return (
		<motion.div
			initial={{ width: 0 }}
			animate={{ width: "100%" }}
			exit={{ x: window.innerWidth, transition: { duration: 0.6 } }}>
			<section className="shop">
				<HeaderImage />
				<div className="shop-heading-box">
					<div
						className="filters"
						ref={filtersRef}>
						<div className="icons-box">
							<button
								onClick={handleGridView}
								className="icon-view">
								<HiViewGrid />
							</button>
							<button
								onClick={handleListView}
								className="icon-view">
								<MdOutlineViewDay />
							</button>
							<div className="vl"></div>
							<p>{showingResults}</p>
						</div>

						<div className="filter-box">
							<div className="num-of-products-input">
								<label
									htmlFor="numOfProducts"
									className="show">
									Show
								</label>
								<select
									id="numOfProducts"
									value={numOfProductsToDisplay}
									onChange={handleNumOfProductsChange}
									className="show-items">
									<option value="4">4</option>
									<option value="8">8</option>
									<option value="12">12</option>
									<option value="16">16</option>
									<option value="20">20</option>
									<option value="24">24</option>
									<option value="28">28</option>
									<option value="32">32</option>
								</select>
							</div>
							<div className="sort-options">
								<label
									htmlFor="sortOption"
									className="short-by">
									Short by
								</label>
								<select
									id="sortOption"
									value={sortOption}
									onChange={handleSortChange}
									className="short-by-options">
									<option value="default">Default</option>
									<option value="name">Name</option>
									<option value="lowestPrice">Lowest Price</option>
									<option value="highestPrice">Highest Price</option>
								</select>
							</div>
						</div>
						<button
							className="show-results"
							onClick={resetFilters}>
							Show results
						</button>
					</div>
				</div>
				<button
					className="show-filters"
					onClick={showFilters}>
					Show filters
				</button>

				<div className="products">
					<div
						className={
							gridView
								? "product-cards-active"
								: listView
								? "product-cards"
								: ""
						}>
						{getProductsForCurrentPage().map((card) => (
							<div
								className={gridView ? "card-active" : listView ? "card" : ""}
								key={card.id}>
								<div
									className={
										card.newItem === card.percentage
											? "display-none"
											: "" || card.newItem === "New"
											? "new-product"
											: "product-update"
									}>
									<p>{card.newItem || card.percentage}</p>
								</div>
								<img
									className="card-img"
									src={card.img}
									alt="product"
								/>
								<div
									className={
										gridView
											? "card-description-box-active"
											: listView
											? "card-description-box"
											: ""
									}>
									<h4>{card.name}</h4>
									<p className="card-description">{card.description}</p>
									<div className="price-box">
										<p
											className={
												card.price ? "mar-left" : ""
											}>{`Rp ${card.price.toLocaleString("id-ID", {
											minimumFractionDigits: 0,
										})}`}</p>
										<del>
											<p>{card.reducedPrice}</p>
										</del>
									</div>
								</div>

								<div className="card-body">
									<h1 className="card-title">{card.name}</h1>
									<button
										className="card-btn"
										onClick={() => addToCart(card)}>
										Add to cart
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="pagination">
					<button
						onClick={handlePrevClick}
						disabled={currentPage === 1}>
						Prev
					</button>

					{getPageNumbers().map((page) => (
						<button
							key={page}
							onClick={() => setCurrentPage(page)}
							className={currentPage === page ? "active" : ""}>
							{page}
						</button>
					))}

					<button
						onClick={handleNextClick}
						disabled={currentPage === totalPages}>
						Next
					</button>
				</div>
				<Featured />
			</section>
		</motion.div>
	)
}

export default Shop
