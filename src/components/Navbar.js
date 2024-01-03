import React, { useRef, useState } from "react"
import logo from "../assets/images/furniro-logo.png"
import "../styles/main.css"
import { links } from "../assets/data/data"
import { RiShoppingCart2Line, RiMenuFill, RiCloseFill } from "react-icons/ri"

import { Link } from "react-router-dom"
const Navbar = ({ onOpen, products }) => {
	const [isOpen, setIsOpen] = useState(false)

	// Calculate the total number of items in the cart
	const totalItemsInCart = products.reduce(
		(total, product) => total + product.count,
		0
	)

	const navRef = useRef()

	const filteredLinks = isOpen
		? links.filter((item) =>
				["Home", "Shop", "Cart", "Contact"].includes(item.label)
		  )
		: links.filter((item) => ["Home", "Shop", "Contact"].includes(item.label))

	const showNavBar = () => {
		setIsOpen(!isOpen)
		if (navRef.current) {
			navRef.current.classList.toggle("responsive_nav")
		}
	}

	const resetMainNav = () => {
		if (navRef.current) {
			navRef.current.classList.remove("responsive_nav")
			setIsOpen(false)
		}
	}
	return (
		<div>
			<header className="header">
				<img
					src={logo}
					alt="logo"
				/>
				<nav
					ref={navRef}
					className="main-nav">
					<ul className="main-nav-list">
						{filteredLinks.map((item) => (
							<li key={item.id}>
								<Link
									onClick={resetMainNav}
									className="main-nav-link"
									to={`${item.link}`}>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
					<button
						className="nav-btn nav-close-btn"
						onClick={showNavBar}>
						<RiCloseFill />
					</button>
				</nav>

				<div className="main-nav-icons">
					{/* <RiAccountCircleLine size={28} />
					<RiSearch2Line size={28} />
					<RiHeart3Line size={28} /> */}
					<button
						className="btn-icon"
						onClick={onOpen}>
						<RiShoppingCart2Line size={28} />
						{totalItemsInCart > 0 && (
							<span className="cart-item-count">{totalItemsInCart}</span>
						)}
					</button>
				</div>
				<button
					className="nav-btn"
					onClick={showNavBar}>
					<RiMenuFill />
				</button>
			</header>
		</div>
	)
}

export default Navbar
