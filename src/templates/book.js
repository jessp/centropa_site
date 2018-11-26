import React, { Component } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Layout from '../layouts/Layout'
import Header from '../components/header';
import '../css/BookLayout.css'
import GreenScrollDown from "./../images/green_scroll_down.svg";


class PostTemplate extends Component {

  constructor(props){
    super(props);
  }


  render() {
    const post = this.props.data.wordpressPost
    return (
        <div style={{"width": "100%", "height": "100%", "position": "relative"}}>
          <Header/>
          <div className={"storyHeaderHolder"}>
            <div className={"storyLocationImageHolder"} style={{"backgroundImage": "url(" + post.acf.location_photo.source_url + ")"}}/>
            <div className={"storyAuthorImageHolder"} style={{"backgroundImage": "url(" + post.acf.author_photo.source_url + ")"}}/>
            <div className={"storyNameHolder"}>
              <div className={"storyMetaText"}>
                <h1>{post.title}</h1>
                <h2>{"Inspired by " + post.acf.country_name}</h2>
                <p>{"“It will not happen. She’ll continue the game, the same approach, the indifference when she meets him in public, in the café they both like to go to after work.”"}</p>
              </div>
            </div>
            <div className={"authorBio"}>
              <h1>{post.acf.author_name}</h1>
              <p>
                {"This author is great. This is his bio. He wrote some great books. Really solid stuff. Won awards, so good."}
              </p>
            </div>
          </div>
          <div className={"greenScrollIndicator"}>
              <img src={GreenScrollDown}/>
          </div>
          <div className={"storyHolder"} dangerouslySetInnerHTML={{ __html: post.content }}/>
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