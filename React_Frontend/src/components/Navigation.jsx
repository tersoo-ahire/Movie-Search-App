import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  return (
    <nav>
      <div className="left-nav">
        <Link to={"/"}>
          <img src={logo2} alt="Navigation Logo" />
        </Link>
      </div>
      <div className="right-nav">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/company"}>Company</Link>
        <Link to={"/docs"}>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            size="2xs"
            className="icon"
          />
          Docs
        </Link>
      </div>
    </nav>
  );
}
