import React from "react"
import { links, helpLinks } from "../assets/data/data"
import Copyright from "./Copyright"
import { Link } from "react-router-dom"
const Footer = () => {
	const filteredLinks = links.filter((item) =>
		["Home", "Shop", "Contact"].includes(item.label)
	)
	return (
		<footer>
			<div className="footer">
				<div className="address-col">
					<h3>Furniro.</h3>
					<address>
						<p className="address">
							400 University Drive Suite 200 Coral <br></br> Gables,<br></br> FL
							33134 USA
						</p>
					</address>
				</div>
				<div>
					<p className="footer-heading">Links</p>
					<ul className="footer-nav">
						{filteredLinks.map((link) => (
							<li key={link.id}>
								<Link
									className="footer-link"
									to={link.link}>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div>
					<p className="footer-heading">Help</p>
					<ul className="footer-nav">
						{helpLinks.map((link) => (
							<li key={link.id}>
								<a
									className="footer-link"
									href={link.link}>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
				<div>
					<p className="footer-heading">Newsletter</p>
					<form className="input-group">
						<input
							type="text"
							className="input-field"
							placeholder="Enter Your Email Address"
							required></input>
						<button
							type="submit"
							className="submit-btn">
							Subscribe
						</button>
					</form>
				</div>
			</div>
			<Copyright />
		</footer>
	)
}

export default Footer
