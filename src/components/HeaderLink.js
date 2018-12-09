import React from 'react'
import { Link } from 'gatsby'
import '../css/ButtonLink.css'

class HeaderLink extends React.Component {

  render() {
  	let theStyle = {"color": this.props.color};
  	return(
	  		<Link to={this.props.to} activeClassName={"activeUnderlineLink"} style={theStyle} className={this.props.pageName === this.props.text ? "activeUnderlineLink" : ""}>
	  			<span>
		  			{this.props.text}
		  		</span>
	  		</Link>
  	)
  }
}

export default HeaderLink