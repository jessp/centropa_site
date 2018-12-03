import React, { Component } from 'react'
import {select} from 'd3-selection'
import {transition} from 'd3-transition'
import {easeLinear, easeQuad} from 'd3-ease'

import logo_text from './../images/home_page/logo_text-13.png'

class LogoAnimation extends Component {
   constructor(props){
      super(props)
      this.createLogoAnimation = this.createLogoAnimation.bind(this);
      this.getStartingPath = this.getStartingPath.bind(this);
   }
   componentDidMount() {
      this.createLogoAnimation()
   }

   createLogoAnimation() {
      const text = " FOOD inspired by STORIES inspired by TRAVEL inspired by FOOD inspired by STORIES inspired by TRAVEL inspired by ".split("");
      const node = select(this.refs.svgNode);

      const textPath = node.select("text").select("textPath").selectAll("tspan");
         

      textPath.data(text, function(d){ return d;}).enter()
         .append("tspan")
         .style("font-weight", function(d){ 
            //would be more efficient to have this all in a starting array, but 
            //doing it this way for efficiency
            if (d === d.toUpperCase()) {
               return "bold";
            } else {
               return "normal";
            }
         })
         .style("opacity", 0)
         .text(function(d){ return d})
            .transition()
               .delay(function (d,i){ return 25*i})
               .duration(100)
               .style("opacity", 1);

      const globeCirc = node
      .select("#globeCirc");

      const totalLength = globeCirc.node().getTotalLength();

      globeCirc.attr("stroke-dasharray", totalLength + " " + totalLength)
               .attr("stroke-dashoffset", totalLength)
               .transition()
               .ease(easeLinear)
               .duration(text.length * 25)
               .attr("stroke-dashoffset", 0);

      const innerLogo = select(".innerLogo");

      innerLogo
         .transition()
         .delay(text.length * 25 + 2250)
         .duration(2000)
         .style("opacity", 1)

      //we have to reselect things rather than using the variable we created due to how react interacts with the dom
      node.select("text").select("textPath").selectAll("tspan")
            .transition()
            .delay(text.length * 25 + 2200)
            .duration(1750)
            .style("opacity", 0)
            .remove()

      const completeAnimation = this.props.completeAnimation;

      node.select("image")
         .transition()
            .delay(text.length * 25 + 2200 + 1750)
            .duration(1750)
            .style("opacity", 1)
            .on("end", function(){
               completeAnimation();
            })



   }



 getStartingPath(cx, cy, r) {

   return "M " + cx + " " + cy + " m -" + r + ", 0 " + "a " + r + "," + r + " 0 1,0 " + (r * 2) + ",0 " + "a " + r + "," + r + " 0 1,0 -" + (r * 2) + ",0";
}

render() {
      return (
      <svg ref={"svgNode"} viewBox="0 0 325 400">
         <defs>
            <path id={"textPath"}
               d = {this.getStartingPath(162.5, 175, 151)}/>
         </defs>
         <path d = {this.getStartingPath(162.5, 175, 151)} fill={"none"} stroke={"none"}/>
         <path id={"globeCirc"} d = {this.getStartingPath(162.5, 175, 125)} stroke={"#0d3e32"} strokeWidth={9} fill={"none"}/>
         <text style={{"fontFamily": "Lato"}} fill={"#0d3e32"}>
            <textPath href={"#textPath"}>
            </textPath>
         </text>
         <g className={"innerLogo"} fill={"none"} stroke={"#0d3e32"} strokeWidth={9} style={{"opacity": 0}}>
            <ellipse cx="162.5" cy="175" rx="62.5" ry="125"/>
            <line x1="162.5" y1="50" x2="162.5" y2="300"/>
            <line x1="37.5" y1="175" x2="287.5" y2="175"/>
            <path d="M60 105 Q 160 135 270 105"/>
            <path d="M60 245 Q 160 215 270 245"/>
         </g>
         <image href={logo_text} height="140" width="290" transform={"translate(15,280)"} style={{"opacity": 0}}/>
      </svg>
      )
   }
}
export default LogoAnimation