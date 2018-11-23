import React from 'react'
import '../css/slide.css'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";
import Vivus from 'vivus';






class Slide extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    new Vivus(this.props.id, {duration: 200, file: this.props.sketch});
  }

  render() {
  	return(
  		<div className={"slide"}>
        <div className={"child"}>
        <ScrollAnimation animateIn='fadeIn' duration={2}  animateOnce={true} className={"indexCard"}>
            <div className={"slideImg"}>
              <div style={{position: "absolute"}} className={"slideSketch"}>
                <img src={this.props.photoSrc} style={{"opacity":"0.5"}}/>
              </div>
              <div style={{position: "absolute"}}>
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