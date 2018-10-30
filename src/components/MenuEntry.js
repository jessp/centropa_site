import React from 'react'
import '../css/MenuItem.css'


class MenuEntry extends React.Component {

  render() {
  	return(
  		<div className={"menuEntry"}>
  			<div className={"menuItemHeading"}>
	  			<h3 className={"menuItemName"}>{this.props.item_name}</h3>
	  			<h3 className={"menuItemPrice"}>{this.props.price + "–"}</h3>
	  			<div className={"clearer"}></div>
  			</div>
  			<p>{this.props.description}</p>
  		</div>
  	)

  }
}

export default MenuEntry