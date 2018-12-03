import React from 'react'
import { Link } from 'gatsby'
import '../css/Menu.css'
import '../css/MenuItem.css'
import {FaEye} from "react-icons/fa"



class MenuEntry extends React.Component {

  render() {
    let tagString = this.props.tags.join(", ");
  	return(
  		<div className={"menuEntry"}>
  			<div className={"menuItemHeading"}>
	  			<h3 className={"menuItemName"}>{this.props.item_name}</h3>
	  			<h3 className={"menuItemPrice"}>{this.props.price + "–"}</h3>
  			</div>
  			<p className={"menuDescription"}>{this.props.description}</p>
        {this.props.accompanyingText && 
          <p className = {"accompanyingText"}>
            <Link to={"/" + this.props.slug}>{this.props.accompanyingText}</Link>
          </p>
        }
        <p className={"menuTags"}>{tagString}</p>
  		</div>
  	)

  }
}

export default MenuEntry