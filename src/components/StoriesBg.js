import React from 'react'
import { Link} from "gatsby"
import Parallax from 'react-rellax'

class StoriesBg extends React.Component {



  render() {

    return (

      <div className={"bgLayers"} style={
          {"height":"calc(100% + 50px)", "position": "relative", "overflowX": "hidden", "overflowY": "visible", "marginTop": "-50px"}
        }>
        <Parallax>
            <div className={"redRect"}
            style={{"left":"2vw","top":"1.2vw", "width": "4.3vw", "height": "4.2vw"}}/>
        </Parallax>
        <Parallax>
            <div className={"redRect"}
            style={{"left":"12.4vw","top":"6.5vw", "width": "2.3vw", "height": "2.2vw"}}/>
        </Parallax>
         <Parallax>
            <div className={"redRect"}
            style={{"left":"1vw", "top":"9vw", "width": "7.3vw", "height": "7.2vw"}}/>
        </Parallax>
         <Parallax>
            <div className={"redRect"}
            style={{"left":"20vw", "top":"11vw", "width": "6vw", "height": "6vw"}}/>
         <Parallax>
            <div className={"redRect"}
            style={{"left":"25.5vw", "top":"31vw", "width": "4.5vw", "height": "4.6vw"}}/>
        </Parallax>
        </Parallax>
            <div style={{
          "width": "16vw", 
          "height":"22vw", 
          "left": "calc(50% - 15vw)", 
          "top": "calc(35% + 4vw)", 
          "backgroundImage":"url(" + (this.props.featuredAuthor.acf.location_photo.source_url) + ")"}}/>
        {this.props.featuredSandwichImage &&
          <div style={{
          "width": "16vw", 
          "height":"18vw", 
          "left": "calc(50% - 1vw)", 
          "top": "calc(35% + 15vw)", 
          "backgroundImage":"url(" + (this.props.featuredSandwichImage.source_url) + ")"}}/>
        }
        <div style={{
          "width": "16vw", 
          "height":"19vw", 
          "left": "calc(50% - 2vw)", 
          "top": "calc(35% - 16vw)", 
          "backgroundImage":"url(" + (this.props.featuredAuthor.acf.author_photo.source_url) + ")"}}/>
        <div style={{
          "minWidth": "20vw", 
          "minHeight":"110px", 
          "left": "calc(50% - 10vw)", 
          "top": "35%", 
          "backgroundColor":"#0d3e32"}} className={"underlineLink readNow"}> 
          <div style={{"top": "50%", "transform": "translateY(-50%)"}}>
            <p style={{"fontSize":"0.85em"}}>{"Read " + this.props.featuredAuthor.acf.author_name + "'s"}</p>
            <Link to={"/" + this.props.featuredAuthor.slug}>
              <span>{this.props.featuredAuthor.title}</span>
            </Link>
          </div>

          </div>
            <div className={"bgExcerpts"} style={{
              "width": "20vw", 
              "right": "0px", 
              "top": "calc(35% + 16vw)"}}>
              <div style={{"width": "100%"}}>
                <div>
                  <p>
                    {"“" + this.props.featuredAuthor.acf.story_excerpt + "”"}
                  </p>
                  </div>
              </div>
            </div> 
        </div>
    )

  }


}

export default StoriesBg