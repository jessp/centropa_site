import React from 'react'
import {shuffle} from '../utils/helpers.js';
import BgColumn from '../components/BgColumn'
import PhotoColumn from '../components/PhotoColumn'
import '../css/MediaColumn.css'




class MediaColumn extends React.Component {

  constructor(props){
    super(props);
  }

  

  render() {
  	return (
  		<div className={"imageCols"}>
        <BgColumn numSquares={15} windowHeight={this.props.windowHeight}/>
        <PhotoColumn photos={this.props.photos} numSquares={8} windowHeight={this.props.windowHeight}/>
  		</div>
  	)
  }


}

export default MediaColumn
