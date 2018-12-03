import React from 'react'
import {shuffle} from '../utils/helpers.js';



class BgColumn extends React.Component {

  constructor(props){
    super(props);

    this.renderBgColumns = this.renderBgColumns.bind(this);

    let numBg = this.props.numSquares;
    //let's set percentage widths and heights on load so photos don't shift around every time the component is rerendered
    let tops = Array(numBg).fill().map(function(na, id){ return Math.round((id/numBg) * 100 + Math.random() * 5)/100 });
    let lefts = Array(numBg).fill().map(() => Math.round(Math.random() * 100)/100);
    let widths = Array(numBg).fill().map(() => Math.round(Math.random() * 6 + 6));

    let squares = [];
    for (var sqr = 0; sqr < numBg; sqr ++){
      let object = new Object();
      object["left"] = lefts[sqr];
      object["top"] = tops[sqr];
      object["width"] = widths[sqr];
      squares.push(object);
    }

    this.squares = squares;

  }

  renderBgColumns(){
    let windowHeight = this.props.windowHeight;


    return this.squares.map(function(node, id) {
      return <div key={id + node.left}
                style={
                    {
                      "right": (node.left * 35) + "%",
                      "top": (node.top * (windowHeight - 200)) + "px",
                      "width": (node.width) + "vw",
                      "height": (node.width) + "vw"
                    }
                  }>
          </div>
        }
      )

    
  }

  render() {
    // console.log(this.props.photos);
  	return (
        <div className={"bgLayers bgSquares"} style={{"height": this.props.windowHeight + "px"}}>
    			{this.renderBgColumns()}
        </div>
  	)
  }


}

export default BgColumn
