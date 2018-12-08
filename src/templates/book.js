import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import PropTypes from "prop-types"

import './../layouts/main.css'
import '../css/LayoutColumns.css'
import '../css/BookLayout.css'
import '../css/MediaColumn.css'


import Header from '../components/header';
import { VictoryPie } from 'victory';
import BgColumn from '../components/BgColumn'
import PhotoColumn from '../components/PhotoColumn'



class PostTemplate extends Component {

  constructor(props){
    super(props);

    this.state = {
      "scrollPercent": 0,
      "totalRead": this.props.data.wordpressPost.content.split(" ").length/225,
      "remainingRead": Math.round(this.props.data.wordpressPost.content.split(" ").length/225 * 2)/2
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    
    //check if there are images to display
    this.images = [];
    let images = this.images;

    let shortHand = this.props.data.wordpressPost.acf;

    let checkForImages = this.checkForImages;


    [shortHand.image_one, shortHand.image_two, 
    shortHand.image_three, shortHand.image_four, 
    shortHand.image_five].forEach(function(e){
      if (e && e["source_url"]){
        images.push({"img": e.source_url});
      }
    })
  }

 
  componentDidMount(){
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('scroll', this.handleScroll);
  }

  updateWindowDimensions() {
    if (this.refs && this.refs.multiColumnWrapper){
      this.setState({ windowHeight: this.refs.multiColumnWrapper.scrollHeight });
    }
  }

  handleScroll(event) {
    let scrollPercent = (window.scrollY - (window.innerHeight))/(document.documentElement.scrollHeight - window.innerHeight * 2) * 100;
    if (scrollPercent < 0) {
      scrollPercent = 0;
    } else if (scrollPercent > 100){
      scrollPercent = 100;
    }
    let remaining = Math.round(this.state.totalRead * (100 - this.state.scrollPercent)/100 * 2)/2;
    this.setState({scrollPercent: scrollPercent, remainingRead: remaining});
    
  }


  render() {
    const post = this.props.data.wordpressPost
    return (
        <div style={{"width": "100%", "height": "100%", "position": "relative"}} ref={"multiColumnWrapper"}>
          <div className={"storyHeaderHolder"}>
            <div className={"storyLocationImageHolder"} style={{"backgroundImage": "url(" + post.acf.location_photo.source_url + ")"}}/>
            <div className={"storyNameHolder"}>
              <div className={"storyMetaText"}>
                <h1>{post.title}</h1>
                <h2>{"Inspired by " + post.acf.country_name}</h2>
                <p>{"“" + post.acf.story_excerpt + "”"}</p>
              </div>
            </div>
            <div className={"authorBio"}>
              <h1>{post.acf.author_name}</h1>
              <p>
                {post.acf.author_bio}
              </p>
              <p className = {"commissionText"}>
                {"This piece was commissioned as part of "}
                <Link to={"/stories"}>{"Centropa Stories"}</Link>
                {". We recommend accompanying it with the "}
                <Link to={"/menu#sandwiches"}>{"smørbrod we created"}</Link>
                {" inspired by it."}
              </p>
            </div>
          </div>


          <div className={"layoutColumns storyHolder"}>
            <div className={"pieHolder"}>
              <div style={{"width": "80%", "marginLeft": "10%"}}>
                <VictoryPie animate data={[
                    { x: "", y: this.state.scrollPercent, fill: "#0d3e32", opacity: 0 },
                    { x: "", y: 100 - this.state.scrollPercent, fill: "#0d3e32" }
                  ]}
                  style={{
                    data: {
                      fill: (d) => d.fill,
                      opacity: (d) => d.opacity
                    }
                  }}
                  labels={() => null}/>
              </div>
              <p>{this.state.remainingRead + " mins left to read"}</p>
            </div>
            <div className={"multiColumnWrapper"}>
              <div className={"contentColumn storyColumn"} dangerouslySetInnerHTML={{ __html: post.content }}/>
              <div className={"mediaColumn"} style={{"height": (this.state.windowHeight - 200) + "px", "marginTop": "-100%"}}>
                <div className={"imageCols redSquares"} style={{"height": "calc(" + this.state.windowHeight + " - 100% - 200px)"}}>
                  <BgColumn numSquares={Math.floor(this.state.remainingRead) + 10} windowHeight={this.state.windowHeight}/>
                </div>
              </div>
              {this.images.length > 0 &&
                    <div className={"storyPhotoColumn"} style={{"height": "calc(" + this.state.windowHeight + " - 100%)"}}>
                      <PhotoColumn photos={this.images} 
                                  numSquares={this.images.length} 
                                  windowHeight={this.state.windowHeight}/>
                    </div>
                  }
            </div>
            <div className={"clearer"}/>
          </div>
          <div className={"storyAuthorImageHolder"} style={{"backgroundImage": "url(" + post.acf.author_photo.source_url + ")"}}/>
          <Header/>
        </div>
    )
  }
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default PostTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      acf {
        author_name
        country_name
        story_excerpt
        author_bio
        author_photo {
          source_url
        }
        location_photo {
          source_url
        }
        image_one {
          source_url
        }
        image_two {
          source_url
        }
        image_three {
          source_url
        }
        image_four {
          source_url
        }
        image_five {
          source_url
        }
      }
    }
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`