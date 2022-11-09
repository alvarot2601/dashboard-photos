import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/nav.svg";

const Nav = () => {
  return (
	<>
		<nav>
		<ul>
			<li>
				<Link to="/">Dashboard</Link>
			</li>
			<li>
				<Link to="/search">Search</Link>
			</li>
			<li>
				<Link to="/myphotos">My Photos</Link>
			</li>
			<li>
				<img src={logo} />
			</li>
		</ul>
		</nav>
		<Outlet/>
	</>


  );
};
export default Nav;
