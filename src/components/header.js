import React from 'react'
import { Link } from 'gatsby'
import HeaderLink from "./HeaderLink"
import "./../css/Header.css"

const Header = ({ siteTitle }) => (
  <div className={"headerContainer"}>
    <div>
      <HeaderLink to={"/"} text={"Home"}/>
      <HeaderLink to={"/"} text={"Menu"}/>
      <HeaderLink to={"/"} text={"About"}/>
      <HeaderLink to={"/"} text={"12x"}/>
    </div>
  </div>
)

export default Header
