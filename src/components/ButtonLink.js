import React from 'react'
import { Link } from 'gatsby'
import '../css/ButtonLink.css'

class ButtonLink extends React.Component {

  render() {
  	return(
  			<div style={{"display": "block", "margin": "10px"}}>
		  		<Link className={"buttonLink"} to={this.props.to}>
			  		{this.props.text}
		  		</Link>
		  	</div>
  	)
  }
}

export default ButtonLink