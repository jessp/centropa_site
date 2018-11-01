import React from 'react'
import '../css/PageTurner.css'
import {FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight} from "react-icons/fa"



class PageTurner extends React.Component {

  render() {
  	return(
  		<div className={"pageTurner"}>
        {this.props.left && 
  			   <FaRegArrowAltCircleLeft
              size={20} 
              style={{ position: `relative`, bottom: 1 }} 
              className={"childIcon"}
              onClick={this.props.doClick} />
        }
        {!this.props.left && 
           <FaRegArrowAltCircleRight
              size={20} 
              style={{ position: `relative`, bottom: 1 }} 
              className={"childIcon"}
              onClick={this.props.doClick} />
        }

  		</div>
  	)

  }
}

export default PageTurner