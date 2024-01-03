import React from "react"
import Hero from "../components/Hero"
import LivingSpaces from "../components/LivingSpaces"
import Products from "../components/Products"
import Inspiration from "../components/Inspiration"
import { motion } from "framer-motion"
const Home = ({ addToCart }) => {
	return (
		<motion.div
			initial={{ width: 0 }}
			animate={{ width: "100%" }}
			exit={{ x: window.innerWidth, transition: { duration: 0.6 } }}>
			<Hero />
			<LivingSpaces />
			<Products addToCart={addToCart} />
			<Inspiration />
		</motion.div>
	)
}

export default Home
