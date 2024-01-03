import React from "react"
import Shop from "../pages/Shop"
import Home from "../pages/Home"
import Contact from "../pages/Contact"
import Cart from "../pages/Cart"
import CheckOut from "../pages/CheckOut"

import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

const AnimatedRoutes = ({
	addToCart,
	products,
	onQuantityChange,
	onProductRemove,
	resetShoppingCart,
}) => {
	const location = useLocation()
	return (
		<AnimatePresence>
			<Routes
				location={location}
				key={location.pathname}>
				<Route
					index
					element={<Home addToCart={addToCart} />}
				/>
				<Route
					path="/shop"
					element={<Shop addToCart={addToCart} />}
				/>
				{/* <Route path="about" element={<About />} /> */}
				<Route
					path="/contact"
					element={<Contact />}
				/>
				<Route
					path="/cart"
					element={
						<Cart
							products={products}
							onQuantityChange={onQuantityChange}
							onProductRemove={onProductRemove}
						/>
					}
				/>
				<Route
					path="/checkout"
					element={
						<CheckOut
							products={products}
							onQuantityChange={onQuantityChange}
							resetShoppingCart={resetShoppingCart}
						/>
					}
				/>
			</Routes>
		</AnimatePresence>
	)
}

export default AnimatedRoutes
