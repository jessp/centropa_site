import React from 'react'
import { Link } from 'gatsby'
import HeaderLink from "./HeaderLink"
import "./../css/Header.css"

const Header = ({ siteTitle }) => (
  <div className={"headerContainer"}>
      <HeaderLink to={"/"} text={"Home"}/>
      <HeaderLink to={"/menu"} text={"Menu"}/>
      <HeaderLink to={"/about"} text={"About"}/>
      <HeaderLink to={"/12x"} text={"12x"}/>
  </div>
)

export default Header
