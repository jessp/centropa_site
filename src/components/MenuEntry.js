import React from 'react'
import '../css/Menu.css'
import '../css/MenuItem.css'
import {FaEye, FaEyeSlash} from "react-icons/fa"



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
        <p className={"menuTags"}>{tagString}</p>
        {this.props.image &&
          <div onClick={() => this.props.changeImg({"title": this.props.item_name, "img": this.props.image})}
          className={"menuIcon " + (this.props.isActive ? "activeImageIcon" : "")}>
            <FaEye />
            {!this.props.isActive &&
              <span className = {"previewIcon"}>{"Take a look"}</span>
            }
          </div>
        }
  		</div>
  	)

  }
}

export default MenuEntry