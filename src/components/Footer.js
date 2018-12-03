import React from 'react'
import '../css/Footer.css'
import { FaFacebook, FaInstagram } from 'react-icons/fa';


class Footer extends React.Component {

  render() {
  	return (
  		<div className={"footer"}>
  			<div className={"floatLeft"}></div>
  			<div className={"floatRight social"}>
  				<FaFacebook/>
  				<FaInstagram/>
  			</div>
  			<div className={"clearer"}/>
  		</div>
  	)
  }


}

export default Footer
