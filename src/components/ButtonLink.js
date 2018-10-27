import React from 'react'
import { Link } from 'gatsby'
import '../css/ButtonLink.css'

class ButtonLink extends React.Component {

  render() {
  	return(
  		<div className={"buttonLink"}>
	  		<Link to={this.props.to}>
	  			{this.props.text}
	  		</Link>
  		</div>
  	)
  }
}

export default ButtonLink