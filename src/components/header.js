import React from 'react'
import HeaderLink from "./HeaderLink"
import "./../css/Header.css"

const Header = ({ siteTitle, pageName, minimal }) => (
  <div className={"underlineLink headerContainer " + (minimal ? "minimalHeader" : "")}>
      <HeaderLink to={"/"} text={"Home"}/>
      <HeaderLink to={"/menu"} text={"Menu"} color={"#2A8FA3"}/>
      <HeaderLink to={"/12x"} text={"12x"} color={"#A4384D"}/>
      <h1 className ={"pageName"}>{pageName}</h1>
  </div>
)

export default Header
