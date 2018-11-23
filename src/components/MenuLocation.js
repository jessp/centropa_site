import React from 'react'
import {capitalizeFirstLetter} from "../utils/helpers"
import '../css/menuLocationPanel.css'





class MenuLocation extends React.Component {

  render() {
  	return(
  		<div className={"menuLocationPanel"}>
  			<h2>{"Menu"}</h2>
  			{
  				this.props.categories.map(function(d, idx){
  					return (
  						<a href={'#' + d} key={idx}>{capitalizeFirstLetter(d)}</a>
  					)
  				})
  			}
  		</div>
  	)

  }
}

export default MenuLocation