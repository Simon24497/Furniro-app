import React, { useState, useEffect } from "react"
import HeaderImage from "../components/HeaderImage"
import { FaLocationDot, FaPhone, FaClock } from "react-icons/fa6"
import { motion } from "framer-motion"

const Contact = () => {
	const [contactData, setContactData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	})

	const handleInputChange = (name, value) => {
		setContactData((prevContactData) => ({
			...prevContactData,
			[name]: value,
		}))
	}

	const handleFormSubmit = (e) => {
		e.preventDefault()

		// Validate the form data here if needed

		// Save the form data to local storage
		localStorage.setItem("contactFormData", JSON.stringify(contactData))

		// Optionally, you can clear the form fields
		setContactData({
			name: "",
			email: "",
			subject: "",
			message: "",
		})
	}

	useEffect(() => {
		const storedFormData = JSON.parse(localStorage.getItem("contactFormData"))

		if (storedFormData) {
			setContactData(storedFormData)
		}
	}, [])

	return (
		<motion.div
			initial={{ width: 0 }}
			animate={{ width: "100%" }}
			exit={{ x: window.innerWidth, transition: { duration: 0.6 } }}>
			<section className="contact-section">
				<HeaderImage />
				<div className="contact-section-box">
					<div className="contact-description">
						<h2>Get In Touch With Us</h2>
						<p>
							For More Information About Our Product & Services. Please Feel
							Free To Drop Us <br></br> An Email. Our Staff Always Be There To
							Help You Out. Do Not Hesitate!
						</p>
					</div>
					<div className="contact-box">
						<div>
							<div className="contact-icon-box">
								<div>
									<FaLocationDot size={"2.2rem"} />
								</div>
								<div className="contact-info">
									<h3>Address</h3>
									<address>
										<p>
											236 5th SE Avenue, New <br></br> York NY10000, United{" "}
											<br></br>
											States
										</p>
									</address>
								</div>
							</div>
							<div className="contact-icon-box">
								<div>
									<FaPhone size={"2.2rem"} />
								</div>
								<div className="contact-info">
									<h3>Phone</h3>
									<p>
										<a href="tel:+4733378901">Mobile: +47 333 78 901</a>
									</p>
									<p>
										<a href="tel:+4733378901">Hotline: +47 321 78 591</a>
									</p>
								</div>
							</div>
							<div className="contact-icon-box">
								<div>
									<FaClock size={"2.2rem"} />
								</div>
								<div className="contact-info">
									<h3>Working Time</h3>
									<p>
										Monday-Friday: 9:00 - <br></br> 22:00
									</p>
									<p>
										Saturday-Sunday: 9:00 - <br></br> 21:00
									</p>
								</div>
							</div>
						</div>
						<form onSubmit={handleFormSubmit}>
							<div className="contact-form">
								<div className="form-info">
									<label for="your-name">Your name</label>
									<input
										id="your-name"
										type="text"
										placeholder="Abc"
										name="your-name"
										required
										value={contactData.name}
										onChange={(e) =>
											handleInputChange("name", e.target.value)
										}></input>
								</div>
								<div className="form-info">
									<label for="email">Email address</label>
									<input
										id="email"
										type="email"
										placeholder="Abc@def.com"
										name="your-email"
										required
										value={contactData.email}
										onChange={(e) =>
											handleInputChange("email", e.target.value)
										}></input>
								</div>
								<div className="form-info">
									<label for="subject">Subject</label>
									<input
										id="subject"
										type="text"
										placeholder="This is an optional"
										value={contactData.subject}
										onChange={(e) =>
											handleInputChange("subject", e.target.value)
										}
										name="subject"></input>
								</div>
								<div className="form-info">
									<label for="message">Message</label>
									<input
										id="message"
										type="text"
										placeholder="Hi! id like to ask about"
										name="message"
										required
										value={contactData.message}
										onChange={(e) =>
											handleInputChange("message", e.target.value)
										}></input>
								</div>
								<button
									type="submit"
									className="form-submit">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</motion.div>
	)
}

export default Contact
