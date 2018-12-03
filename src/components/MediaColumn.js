import React from 'react'
import {shuffle} from '../utils/helpers.js'
import BgColumn from '../components/BgColumn'
import PhotoColumn from '../components/PhotoColumn'
import ExcerptColumn from '../components/ExcerptColumn'
import '../css/MediaColumn.css'



class MediaColumn extends React.Component {

  constructor(props){
    super(props);
  }

  render() {    
  	return (
  		<div className={"imageCols"}>
          <BgColumn numSquares={15} windowHeight={this.props.windowHeight}/>
          <PhotoColumn photos={this.props.photos} 
            numSquares={this.props.photos.length >= 8 ? 8 : this.props.photos.length} 
            windowHeight={this.props.windowHeight}/>
          <ExcerptColumn excerpts = {this.props.excerpts.slice(0, 6)}
                        numSquares={this.props.excerpts.length >= 6 ? 6 : this.props.excerpts.length}
                        windowHeight={this.props.windowHeight}/>
  		</div>
  	)
  }


}

export default MediaColumn
