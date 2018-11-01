import React, { Component } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Layout from '../layouts/Layout'
import '../css/BookLayout.css'
import PageTurner from '../components/PageTurner'

class PostTemplate extends Component {

  constructor(props){
    super(props);

    this.scrollBehaviour = this.scrollBehaviour.bind(this);

    this.state = {
      pageNum: 0
    }

    this.columnGap = 45;
    this.totalPages = 0;
  }

  componentDidMount(){
    this.totalPages = Math.ceil(this.refs.bookHolder.scrollWidth/(this.refs.bookHolder.getBoundingClientRect().width + this.columnGap)) * 2;
  }

  componentDidUpdate(){
    //take into account column gap
    let theLeft = (this.refs.bookHolder.getBoundingClientRect().width + this.columnGap) * this.state.pageNum;
    this.refs.bookHolder.scrollLeft = theLeft;
  }

  scrollBehaviour(isForward){
    if (isForward){
      if (((this.state.pageNum + 1) * 2) < this.totalPages) {
        this.setState({pageNum: (this.state.pageNum + 1)})
      }
    } else {
      if (this.state.pageNum > 0) {
        this.setState({pageNum: (this.state.pageNum - 1)})
      }
    }
  }

  render() {
    const post = this.props.data.wordpressPost
    return (
      <Layout>
        <div style={{"width": "100%", "height": "100%", "position": "relative"}}>
          <PageTurner left={true} doClick={() => this.scrollBehaviour(false)}/>
          <div style={{"width":"calc(100% - 80px)", "height": "100%", "float": "left", "overflow": "hidden"}}>
            <div className={"pageHolder"} 
                  style={{"float": "left"}}>
              <h6 dangerouslySetInnerHTML={{ __html: post.title }} className={"centerText"} />
            </div>
            <div className={"pageHolder"} 
                  style={{"float": "right"}}>
              <h6 dangerouslySetInnerHTML={{ __html: post.acf.author_name }} className={"centerText"} />
            </div>
            <div className={"clearer"}/>
            <div className={"bookHolder"} 
                 style={{"columnGap": this.columnGap}}
                 ref={"bookHolder"} 
                 >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            <div className={"pageHolder"} 
                  style={{"float": "left"}}>
              <h6 dangerouslySetInnerHTML={{ __html: (this.state.pageNum * 2 + 1) }} />
            </div>
            <div className={"pageHolder"} 
                  style={{"float": "right"}}>
              <h6 dangerouslySetInnerHTML={{ __html: (this.state.pageNum * 2 + 2) }} className={"rightText"} />
            </div>
          </div>
          <PageTurner doClick={() => this.scrollBehaviour(true)}/>
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
      acf {
        author_name
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