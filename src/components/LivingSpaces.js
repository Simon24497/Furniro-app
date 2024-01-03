import React from "react"
import { rooms } from "../assets/data/data"

const LivingSpaces = () => {
	return (
		<section className="living-spaces">
			<h3>Browse The Range</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
			<div className="living-spaces-box">
				{rooms.map((room) => (
					<div key={room.id}>
						<img
							src={room.img}
							alt="room"
						/>
						<p className="rooms">{room.text}</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default LivingSpaces
