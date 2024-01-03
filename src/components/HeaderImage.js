import React, { useEffect, useState } from "react"
import shopImg from "../assets/images/header-image.png"
import { Link, useLocation } from "react-router-dom"
import { links } from "../assets/data/data"
const HeaderImage = () => {
	const location = useLocation()
	const [activeLink, setActiveLink] = useState("")
	const [breadcrumbs, setBreadcrumbs] = useState([])

	const generateBreadcrumbs = (pathname) => {
		const pathSegments = pathname.split("/").filter((segment) => segment !== "")

		const homeBreadcrumb = { label: "Home", path: "/" }
		const breadcrumbs = [homeBreadcrumb]

		pathSegments.forEach((segment, index) => {
			const path = `/${pathSegments.slice(0, index + 1).join("/")}`
			const link = links.find((link) => link.link === path)
			if (link) {
				breadcrumbs.push({ label: link.label, path })
			}
		})

		return breadcrumbs
	}

	useEffect(() => {
		// Update breadcrumbs whenever the route changes
		const currentBreadcrumbs = generateBreadcrumbs(location.pathname)
		setBreadcrumbs(currentBreadcrumbs)
	}, [location.pathname])

	useEffect(() => {
		// Update activeLink whenever the route changes
		const currentLink = links.find((link) =>
			location.pathname.endsWith(link.link)
		)
		if (currentLink) {
			setActiveLink(currentLink.label)
		}
	}, [location.pathname])

	return (
		<div className="image-header">
			<img
				src={shopImg}
				alt={activeLink}
			/>
			{activeLink && <p className="image-header-link">{activeLink}</p>}
			<div className="breadcrumbs">
				{breadcrumbs.map((breadcrumb, index) => (
					<React.Fragment key={index}>
						{index > 0 && " / "}
						{index === 0 ? (
							<Link
								to={breadcrumb.path}
								className="breadcrumb-link">
								{breadcrumb.label}
							</Link>
						) : (
							<span className="breadcrumb-label">{breadcrumb.label}</span>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	)
}

export default HeaderImage
