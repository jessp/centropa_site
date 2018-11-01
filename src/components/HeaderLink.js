import React from 'react'
import { Link } from 'gatsby'
import '../css/ButtonLink.css'

class HeaderLink extends React.Component {

  render() {
  	return(
	  		<Link to={this.props.to}>
		  		{this.props.text}
	  		</Link>
  	)
  }
}

export default HeaderLink