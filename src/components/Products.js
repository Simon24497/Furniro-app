import React from "react"
import { product } from "../assets/data/data"
import { Link } from "react-router-dom"
const Products = ({ addToCart }) => {
	//SHOW ME ONLY 8 ELEMENTS FROM DATA
	const slicedData = product.slice(0, 8)

	return (
		<section className="products">
			<h3>Our Products</h3>
			<div className="product-cards-active">
				{slicedData.map((card) => (
					<div
						className="card-active"
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
						<div className="card-description-box-active">
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
			<div className="show-more">
				<Link
					to="/shop"
					style={{ textDecoration: "none" }}>
					<button className="show-more-btn">Show more</button>
				</Link>
			</div>
		</section>
	)
}

export default Products
