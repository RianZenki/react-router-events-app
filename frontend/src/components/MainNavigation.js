import { NavLink } from "react-router-dom";

import NewsletterSignup from "./NewsletterSignup";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
	return (
		<header className={classes.header}>
			<nav>
				<ul className={classes.list}>
					<li>
						<NavLink
							to=""
							end
							className={({ isActive }) =>
								isActive ? classes.active : undefined
							}
						>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink
							to="events"
							className={({ isActive }) =>
								isActive ? classes.active : undefined
							}
						>
							Events
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/newsletter"
							className={({ isActive }) =>
								isActive ? classes.active : undefined
							}
						>
							Newsletter
						</NavLink>
					</li>
				</ul>
			</nav>
			<NewsletterSignup />
		</header>
	);
}

export default MainNavigation;
