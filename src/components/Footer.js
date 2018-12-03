import React from 'react'
import '../css/Footer.css'
import { FaFacebook, FaInstagram } from 'react-icons/fa';


class Footer extends React.Component {

  render() {
  	return (
  		<div className={"footer"}>
  			<div className={"floatLeft contact"}>
          <p>{"+47 111 11 111"}</p>
          <p>{"Dronning Eufemias gate 4, 0154 Oslo"}</p>
        </div>
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
