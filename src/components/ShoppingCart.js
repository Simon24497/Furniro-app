import React from "react"
import { RiCloseFill, RiDeleteBin6Line } from "react-icons/ri"
import { Link } from "react-router-dom"

const ShoppingCart = ({
	visibility,
	onClose,
	products,
	onQuantityChange,
	onProductRemove,
}) => {
	const calculateSubtotal = () => {
		return products.reduce(
			(total, product) => total + product.price * product.count,
			0
		)
	}
	return (
		<div className={`modal ${visibility ? "" : "hidden"}`}>
			<div className="cart-products">
				<div className="shopping-cart-box">
					<button
						onClick={onClose}
						className="close-btn">
						<RiCloseFill />
					</button>
					<h2>Shopping Cart</h2>
				</div>
				<div className="underline"></div>
				{products.length === 0 ? (
					<span className="empty-cart">Your basket is currently empty</span>
				) : (
					products.map((product) => (
						<div
							className="cart-products"
							key={product.id}>
							<div className="cart-products-box">
								<img
									src={product.img}
									alt="product"
								/>
								<div className="cart-price-box">
									<h4>{product.name}</h4>
									<div className="cart-price">
										<select
											className="count"
											value={product.count}
											onChange={(event) => {
												onQuantityChange(product.id, event.target.value)
											}}>
											{[...Array(10).keys()].map((number) => (
												<option
													value={number + 1}
													key={number + 1}>
													{number + 1}
												</option>
											))}
										</select>
										X
										<p>
											{`Rp ${(product.price * product.count).toLocaleString(
												"id-ID",
												{
													minimumFractionDigits: 0,
												}
											)}`}
										</p>
									</div>
								</div>
								<button
									className="btn remove-btn"
									onClick={() => onProductRemove(product)}>
									<RiDeleteBin6Line size={20} />
								</button>
							</div>
						</div>
					))
				)}
				<div className={products.length === 0 ? "hidden" : "subtotal"}>
					<p>Subtotal</p>
					<span>
						{`Rp ${calculateSubtotal().toLocaleString("id-ID", {
							minimumFractionDigits: 0,
						})}`}
					</span>
				</div>
			</div>
			<div className={products.length === 0 ? "hidden" : "cart-btns"}>
				<Link
					to={"/cart"}
					products={products}
					onClick={onClose}>
					<button>Cart</button>
				</Link>
				<Link
					to={"/checkout"}
					onClick={onClose}>
					<button>Checkout</button>
				</Link>
			</div>
		</div>
	)
}

export default ShoppingCart
