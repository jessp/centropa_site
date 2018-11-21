import React from 'react'
import { Link } from 'gatsby'
import HeaderLink from "./HeaderLink"
import "./../css/Header.css"

const Header = ({ siteTitle, pageName, minimal }) => (
  <div className={"headerContainer " + (minimal ? "minimalHeader" : "")}>
      <HeaderLink to={"/"} text={"Home"}/>
      <HeaderLink to={"/menu"} text={"Menu"}/>
      <HeaderLink to={"/12x"} text={"12x"}/>
      <h1 className ={"pageName"}>{pageName}</h1>
  </div>
)

export default Header
