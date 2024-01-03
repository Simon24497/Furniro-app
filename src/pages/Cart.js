import React from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import HeaderImage from "../components/HeaderImage"
import Featured from "../components/Featured"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Cart = ({ products, onQuantityChange, onProductRemove }) => {
	const calculateSubtotal = () => {
		return products.reduce(
			(total, product) => total + product.price * product.count,
			0
		)
	}
	return (
		<motion.div
			initial={{ width: 0 }}
			animate={{ width: "100%" }}
			exit={{ x: window.innerWidth, transition: { duration: 0.6 } }}>
			<HeaderImage />
			<div className="cart">
				<div className="cart-box">
					<table className="cart-table">
						<thead>
							<tr className="table-header">
								<th></th>
								<th>Product</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Subtotal</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product.id}>
									<td>
										<img
											className="cart-img"
											src={product.img}
											alt="product"
										/>
									</td>
									<td>{product.name}</td>
									<td>{`Rp ${product.price.toLocaleString("id-ID", {
										minimumFractionDigits: 0,
									})}`}</td>
									<td className="table-quantity">
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
									</td>
									<td className="table-subtotal">{`Rp ${(
										product.price * product.count
									).toLocaleString("id-ID", {
										minimumFractionDigits: 0,
									})}`}</td>
									<td>
										<button
											className="btn remove-btn table-button"
											onClick={() => onProductRemove(product)}>
											<RiDeleteBin6Line size={20} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="small-table">
					{products.map((product) => (
						<div
							key={product.id}
							className="borders-table">
							<div className="small-table-box">
								<h3>Product</h3>
								<p>{product.name}</p>
							</div>
							<div className="small-table-box">
								<h3>Price</h3>
								<p>{`Rp ${product.price.toLocaleString("id-ID", {
									minimumFractionDigits: 0,
								})}`}</p>
							</div>
							<div className="small-table-box">
								<h3>Quantity</h3>
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
							</div>
							<div className="small-table-box">
								<h3>Subtotal</h3>
								<p className="subtotal-small">{`Rp ${(
									product.price * product.count
								).toLocaleString("id-ID", {
									minimumFractionDigits: 0,
								})}`}</p>
							</div>
							<div className="small-table-box">
								<button
									className="btn remove-btn table-button"
									onClick={() => onProductRemove(product)}>
									<RiDeleteBin6Line size={20} />
								</button>
							</div>
						</div>
					))}
				</div>
				<div className="cart-totals">
					<h2>Cart Totals</h2>
					<div className="subtotal-price">
						<p>Subtotal</p>
						<span>
							{`Rp ${calculateSubtotal().toLocaleString("id-ID", {
								minimumFractionDigits: 0,
							})}`}
						</span>
					</div>
					<div className="total-price">
						<p>Total</p>
						<span>
							{`Rp ${calculateSubtotal().toLocaleString("id-ID", {
								minimumFractionDigits: 0,
							})}`}
						</span>
					</div>
					<div className="checkout-button">
						<Link
							to={"/checkout"}
							style={{ textDecoration: "none" }}>
							<button className="checkout-btn">Check Out</button>
						</Link>
					</div>
				</div>
			</div>
			<Featured />
		</motion.div>
	)
}

export default Cart
