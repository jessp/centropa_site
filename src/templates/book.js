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

    this.columnGap = 45;
  }

  componentDidMount(){
    console.log(this.refs.bookHolder.scrollWidth);
    console.log(this.refs.bookHolder.offsetWidth);
  }

  componentDidUpdate(){
    //take into account column gap
      let theLeft = (this.refs.bookHolder.getBoundingClientRect().width + this.columnGap) * this.state.pageNum;
      this.refs.bookHolder.scrollLeft = theLeft;
  }

  scrollBehaviour(){
    this.setState({pageNum: (this.state.pageNum + 1)})
  }

  render() {
    const post = this.props.data.wordpressPost

    return (
      <Layout>
        <div>
          <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
          <div className={"bookHolder"} 
               style={{"columnGap": this.columnGap}}
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