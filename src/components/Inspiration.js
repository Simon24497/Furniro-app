import React, { useState, useEffect } from "react"
import { data } from "../assets/data/data"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

const Inspiration = () => {
	const [slider] = useState(data)
	const [index, setIndex] = React.useState(0)

	useEffect(() => {
		const lastIndex = slider.length - 1
		if (index < 0) {
			setIndex(lastIndex)
		}
		if (index > lastIndex) {
			setIndex(0)
		}
	}, [index, slider])

	return (
		<section className="inspiration">
			<div className="inspiration-text-box">
				<h3>50+ Beautiful rooms inspiration</h3>
				<p>
					Our designer already made a lot of beautiful <br></br> prototipe of
					rooms that inspire you
				</p>
				<button className="explore-more">Explore More</button>
			</div>
			<div className="inspiration-box">
				{slider.map((slide, slideIndex) => {
					const { id, image, name } = slide

					let position = "nextSlide"
					if (slideIndex === index) {
						position = "activeSlide"
					}
					if (
						slideIndex === index - 1 ||
						(index === 0 && slideIndex === slider.length - 1)
					) {
						position = "lastSlide"
					}

					return (
						<article
							className={position}
							key={id}>
							<img
								src={image}
								alt={name}
								className={
									position === "activeSlide" ? "slider-lg-img" : "slider-img"
								}
							/>
						</article>
					)
				})}
				<button
					className={index === 0 ? "prev-none" : "prev"}
					onClick={() => setIndex(index - 1)}>
					<FiChevronLeft />
				</button>
				<button
					className="next"
					onClick={() => setIndex(index + 1)}>
					<FiChevronRight />
				</button>
			</div>
		</section>
	)
}

export default Inspiration
