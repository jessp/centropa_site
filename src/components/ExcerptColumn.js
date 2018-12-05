import React from 'react'
import {shuffle} from '../utils/helpers.js';
import Parallax from 'react-rellax'




class ExcerptColumn extends React.Component {

  constructor(props){
    super(props);

    this.renderExcerptColumns = this.renderExcerptColumns.bind(this);

    let numBg = this.props.numSquares;
    //let's set percentage widths and heights on load so photos don't shift around every time the component is rerendered
    let tops = Array(numBg).fill().map(function(na, id){ return Math.round(((id)/numBg) * 100 + Math.random() * 2)/100 });
    let lefts = Array(numBg).fill().map(() => Math.floor(Math.random() * 100)/100);
    let widths = Array(numBg).fill().map(() => Math.round(Math.random() * 3 + 17));
    let squares = [];
    for (var sqr = 0; sqr < numBg; sqr ++){
      let object = this.props.excerpts[sqr];
      object["left"] = lefts[sqr];
      object["top"] = tops[sqr];
      object["width"] = widths[sqr];
      squares.push(object);
    }

    this.squares = squares;

  }


  renderExcerptColumns(){
    let windowHeight = this.props.windowHeight;


    return this.squares.map(function(node, id) {
        return <Parallax  key={id + node.left} speed={2.5}><div 
                          style={
                              {
                                "right": (node.left * 22) + "%",
                                "top": (node.top * (windowHeight)) + "px",
                                "width": (node.width) + "vw"
                              }
                            }>
                        <p>{"“" + node.story_excerpt + "”"}</p>
                        <p>{"–" + node.author_name}</p>
                    </div>
                </Parallax>
        }
      )

    
  }

  render() {

    // console.log(this.props.photos);
  	return (
        <div className={"bgLayers bgExcerpts"} style={{"height": this.props.windowHeight + "px"}}>
    			   {this.renderExcerptColumns()}
        </div>
  	)
  }


}

export default ExcerptColumn
