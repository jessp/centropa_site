import React from 'react'
import {capitalizeFirstLetter} from "../utils/helpers"
import '../css/menuLocationPanel.css'





class MenuLocation extends React.Component {

  render() {
  	let theActive = this.props.active;
    let setActive = this.props.setActiveCat;

  	return(
  		<div className={"menuLocationPanel"}>
  			<h2>{"Menu"}</h2>
  			{
  				this.props.categories.map(function(d, idx){
  					return (
  						<a href={'#' + d}
                  key={idx} 
                  className={theActive === d ? "activeMenu" : ""}
                  onClick={() => setActive(d)}>
                {capitalizeFirstLetter(d)}
              </a>
  					)
  				})
  			}
  		</div>
  	)

  }
}

export default MenuLocation