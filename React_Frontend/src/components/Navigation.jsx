import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // If scrolled down more than 50 pixels, add the 'scrolled' class
        setScrolled(true);
      } else {
        // Otherwise, remove the 'scrolled' class
        setScrolled(false);
      }
    };

    // Add the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={` ${scrolled ? "scrolled-nav" : ""}`}>
      <div className="left-nav">
        <Link to={"/"}>
          <img src={logo2} alt="Navigation Logo" />
        </Link>
      </div>
      <div className="right-nav">
        <Link to={"/"}>Home</Link>
        <Link to={"#"}>About</Link>
        <Link to={"#"}>Company</Link>
        <Link to={"#"}>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            size="2xs"
            className="icon"
          />
          Docs
        </Link>
        <a
          href="https://github.com/tersoo-ahire/Movie-Search-App"
          target="_blank"
        >
          <FontAwesomeIcon
            icon={faGithub}
            size="xl"
            className="github"
            style={{ color: "#ffde00" }}
          />
        </a>
      </div>
    </nav>
  );
}
