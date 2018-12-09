import React from 'react'
import HeaderLink from "./HeaderLink"
import "./../css/Header.css"


class Header extends React.Component {

	render(){
		return (
		  <div className={"underlineLink headerContainer"}>
		      <HeaderLink to={"/"} pageName={this.props.page} text={"Home"}/>
		      <HeaderLink to={"/menu"} pageName={this.props.page} text={"Menu"} color={"#2A8FA3"}/>
		      <HeaderLink to={"/stories"} pageName={this.props.page} text={"Centropa Stories"} color={"#A4384D"}/>
		  </div>
		)
	}
}

export default Header
