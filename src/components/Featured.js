import React from "react"
import { feature } from "../assets/data/data"

const Featured = () => {
	return (
		<div className="featured">
			{feature.map((item) => (
				<div
					className="feature"
					key={item.id}>
					<img
						src={item.image}
						alt={item.title}
					/>
					<div>
						<h3>{item.title}</h3>
						<p>{item.quote}</p>
					</div>
				</div>
			))}
		</div>
	)
}

export default Featured
