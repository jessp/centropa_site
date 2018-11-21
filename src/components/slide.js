import React from 'react'
import '../css/slide.css'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";



class Slide extends React.Component {

  render() {
  	return(
  		<div className={"slide"}>
        <div className={"child"}>
        <ScrollAnimation animateIn='fadeIn' duration={2}  animateOnce={true} className={"indexCard"}>
              <div className={"indexCardImg"} style={{"backgroundImage": "url('" + this.props.imgSrc + "')"}} />
            <div className={"indexCardInfo"}>
              <h1>{this.props.header}</h1>
              <p>{this.props.body}</p>
            </div>
            <div className={"clearer"}/>
        </ScrollAnimation>
        </div>
  		</div>
  	)

  }
}

export default Slide