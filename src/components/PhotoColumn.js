import React from 'react'
import {shuffle} from '../utils/helpers.js';
import Rellax from 'rellax'




class PhotoColumn extends React.Component {

  constructor(props){
    super(props);

    this.renderPhotoColumns = this.renderPhotoColumns.bind(this);

    let numBg = this.props.numSquares;
    //let's set percentage widths and heights on load so photos don't shift around every time the component is rerendered
    let tops = Array(numBg).fill().map(function(na, id){ return Math.round((id/numBg) * 100)/100 });
    let lefts = Array(numBg).fill().map(() => Math.round(Math.random() * 100)/100);
    let widths = Array(numBg).fill().map(() => Math.round(Math.random() * 10 + 15));
    let heights = widths.map((e) => Math.round(e * (Math.random() * 0.5 + 0.75)));

    let squares = [];
    for (var sqr = 0; sqr < numBg; sqr ++){
      let object = this.props.photos[sqr];
      object["left"] = lefts[sqr];
      object["top"] = tops[sqr];
      object["width"] = widths[sqr];
      object["height"] = heights[sqr];
      squares.push(object);
    }

    this.squares = squares;

  }

  componentDidMount(){
    var rellax = new Rellax('.rellax', {
      speed: -2,
      center: false,
      wrapper: null,
      round: true,
      vertical: true,
      horizontal: false
    });
  }

  renderPhotoColumns(){
    let windowHeight = this.props.windowHeight;


    return this.squares.map(function(node, id) {
      return <div key={id + node.left} 
                  style={
                      {
                        "right": (node.left * 30) + "%",
                        "top": (node.top * (windowHeight - 200) / 1.25) + "px",
                        "width": (node.width) + "vw",
                        "height": (node.height) + "vw",
                        "backgroundImage": "url(" + node.img + ")"
                      }
                    } className={"rellax"}>
                <div>
                  <h4>{node.title}</h4>
                </div>
            </div>
        }
      )

    
  }

  render() {

  	return (
        <div className={"bgLayers"} >
    			   {this.renderPhotoColumns()}
        </div>
  	)
  }


}

export default PhotoColumn