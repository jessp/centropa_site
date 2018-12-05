import React, { Component } from "react"
import { graphql, Link } from "gatsby"
import PropTypes from "prop-types"
import Header from '../components/header';
import '../css/BookLayout.css'
import GreenScrollDown from "./../images/green_scroll_down.svg";
import { VictoryPie } from 'victory';


class PostTemplate extends Component {

  constructor(props){
    super(props);


    this.state = {
      "scrollPercent": 0,
      "totalRead": this.props.data.wordpressPost.content.split(" ").length/225,
      "remainingRead": Math.round(this.props.data.wordpressPost.content.split(" ").length/225 * 2)/2
    }
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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
        <div style={{"width": "100%", "height": "100%", "position": "relative"}}>
          <div className={"storyHeaderHolder"}>
            <div className={"storyLocationImageHolder"} style={{"backgroundImage": "url(" + post.acf.location_photo.source_url + ")"}}/>
            <div className={"storyAuthorImageHolder"} style={{"backgroundImage": "url(" + post.acf.author_photo.source_url + ")"}}/>
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
          <div className={"storyBodyHolder"}>
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
            <div className={"storyHolder"} dangerouslySetInnerHTML={{ __html: post.content }}/>
            <div className={"clearer"}/>
          </div>
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