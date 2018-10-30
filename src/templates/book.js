import React, { Component } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Layout from '../layouts/Layout'
import '../css/BookLayout.css'


class PostTemplate extends Component {

  constructor(props){
    super(props);

    this.scrollBehaviour = this.scrollBehaviour.bind(this);

    this.state = {
      pageNum: 0
    }
  }

  componentDidMount(){
    console.log(this.refs.bookHolder.scrollWidth);
    console.log(this.refs.bookHolder.offsetWidth);
  }

  componentDidUpdate(){
    //take into account column gap
      let theLeft = this.refs.bookHolder.getBoundingClientRect().width * this.state.pageNum;
      // console.log(theLeft);
      this.refs.bookHolder.scrollLeft = theLeft;
  }

  scrollBehaviour(){
    this.setState({pageNum: (this.state.pageNum + 1)})
    // this.setState({"scrollOffset": (this.state.scrollOffset += this.refs.bookHolder.offsetWidth)})
    console.log(this.refs.bookHolder.getBoundingClientRect().width, this.refs.bookHolder.offsetWidth);
  }

  render() {
    const post = this.props.data.wordpressPost

    return (
      <Layout>
        <div>
          <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
          <div className={"bookHolder"} 
               ref={"bookHolder"} 
               onClick={() => this.scrollBehaviour()}
               >
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </Layout>
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
    }
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`