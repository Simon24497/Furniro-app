import React from "react"
import heroImage from "../assets/images/hero.png"
const Hero = () => {
	return (
		<section>
			<div className="hero">
				<img
					className="hero-image"
					src={heroImage}
					alt="hero"
				/>
				<div className="hero-text-box">
					<span className="new-arrival">New Arrival</span>
					<h1 className="heading-primary">Discover Our New Collection</h1>
					<p className="hero-description">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
						tellus, luctus nec ullamcorper mattis.
					</p>
					<button className="hero-btn">buy now</button>
				</div>
			</div>
		</section>
	)
}

export default Hero
