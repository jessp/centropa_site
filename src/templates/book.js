import React, { Component } from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import Layout from '../layouts/Layout'
import Header from '../components/header';
import '../css/BookLayout.css'
import PageTurner from '../components/PageTurner'

class PostTemplate extends Component {

  constructor(props){
    super(props);

    this.scrollBehaviour = this.scrollBehaviour.bind(this);

    this.state = {
      pageNum: 0,
      totalPages: 0
    }

    this.columnGap = 45;
  }

  componentDidMount(){
    let totalPages = Math.ceil(this.refs.spreadHolder.scrollWidth/(this.refs.spreadHolder.getBoundingClientRect().width + this.columnGap)) * 2;
    this.setState({"totalPages": totalPages});
  }

  componentDidUpdate(prevProps, prevState){
    //take into account column gap
    let theLeft = (this.refs.spreadHolder.getBoundingClientRect().width + this.columnGap) * this.state.pageNum;
    this.refs.spreadHolder.scrollLeft = theLeft;
    let totalPages = Math.ceil(this.refs.spreadHolder.scrollWidth/(this.refs.spreadHolder.getBoundingClientRect().width + this.columnGap)) * 2;
    
    if (totalPages !== prevState.totalPages){
          this.setState({"totalPages": totalPages});
    }

  }


  scrollBehaviour(isForward){
    if (isForward){
      if (((this.state.pageNum + 1) * 2) < this.state.totalPages) {
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
        <div style={{"width": "100%", "height": "100%", "position": "relative"}}>
          <Header minimal={true}/>
          <div style={{"width": "100%", "height": "calc(100% - 40px)", "position": "relative", "paddingTop": "20px"}}>
            <PageTurner left={true} doClick={() => this.scrollBehaviour(false)} disabled={(this.state.pageNum <= 0)}/>
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
              <div className={"spreadHolder"} 
                   style={{"columnGap": this.columnGap}}
                   ref={"spreadHolder"} 
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
            <PageTurner doClick={() => this.scrollBehaviour(true)} disabled={((this.state.pageNum * 2 + 2) >= this.state.totalPages)}/>
          </div>
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