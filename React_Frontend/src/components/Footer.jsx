import React from "react";
import logo2 from "../assets/logo2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <div className="left-footer">
        <img src={logo2} alt="Logo" />
      </div>
      <p>© 2023 - Ahire Tersoo David. All rights reserved.</p>
      <div className="right-footer">
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
    </footer>
  );
}
