import React from 'react'
import '../css/slide.css'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import Vivus from 'vivus';






class Slide extends React.Component {

  componentDidMount() {
    new Vivus(this.props.id, {duration: 200, file: this.props.sketch});
  }

  render() {
  	return(
  		<div className={"slide"}>
        <div className={"child"}>
        <ScrollAnimation animateIn='fadeIn' duration={2}  animateOnce={true} className={"indexCard"}>
            <div className={"slideImg"}>
              <div className={"slideSketch"}>
                <img src={this.props.photoSrc} style={{"opacity":"0.5"}} alt={this.props.alt}/>
              </div>
              <div style={{position: "absolute", "top": "0px", "width": "100%"}}>
                <div id={this.props.id}/>
              </div>
            </div>
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