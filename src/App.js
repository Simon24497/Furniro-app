import React, { useEffect, useState } from "react"
import { BrowserRouter } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ShoppingCart from "./components/ShoppingCart"
import AnimatedRoutes from "./components/AnimatedRoutes"
import ScrollToTop from "./ScrollToTop"

function App() {
	const [cartsVisibilty, setCartsVisibilty] = useState(false)
	const [productsInCart, setProductsInCart] = useState(
		JSON.parse(localStorage.getItem("shopping-cart")) || []
	)

	useEffect(() => {
		localStorage.setItem("shopping-cart", JSON.stringify(productsInCart))
	}, [productsInCart])

	const addProductToCart = (product) => {
		const existingProduct = productsInCart.find(
			(item) => item.id === product.id
		)

		if (existingProduct) {
			// If the product with the same ID already exists, update its count
			const updatedProducts = productsInCart.map((item) =>
				item.id === product.id ? { ...item, count: item.count + 1 } : item
			)
			setProductsInCart(updatedProducts)
		} else {
			// If the product with the same ID is not in the cart, add it with count 1
			const newProduct = {
				...product,
				count: 1,
			}
			setProductsInCart([...productsInCart, newProduct])
		}
	}

	//Changing price and quantity

	const onQuantityChange = (productId, count) => {
		setProductsInCart((oldState) => {
			const updatedProducts = oldState.map((item) =>
				item.id === productId ? { ...item, count: parseInt(count, 10) } : item
			)
			return updatedProducts
		})
	}

	//Removing products from cart

	const onProductRemove = (product) => {
		setProductsInCart((oldState) => {
			const productIndex = oldState.findIndex((item) => item.id === product.id)
			if (productIndex !== -1) {
				oldState.splice(productIndex, 1)
			}
			return [...oldState]
		})
	}

	const onClose = () => {
		setCartsVisibilty(false)
	}

	const onOpen = () => {
		setCartsVisibilty(true)
	}

	const resetShoppingCart = () => {
		setProductsInCart([])
	}

	return (
		<BrowserRouter>
			<ScrollToTop />
			<div className={`overlay ${cartsVisibilty ? "" : "hidden"}`}></div>
			<ShoppingCart
				visibility={cartsVisibilty}
				products={productsInCart}
				onQuantityChange={onQuantityChange}
				onProductRemove={onProductRemove}
				onClose={onClose}
			/>
			<Navbar
				//visibilty={cartsVisibilty}
				products={productsInCart}
				onOpen={onOpen}
			/>
			<AnimatedRoutes
				addToCart={addProductToCart}
				products={productsInCart}
				onQuantityChange={onQuantityChange}
				onProductRemove={onProductRemove}
				resetShoppingCart={resetShoppingCart}
			/>
			<Footer />
		</BrowserRouter>
	)
}
export default App
