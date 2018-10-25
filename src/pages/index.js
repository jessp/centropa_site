import React from 'react'
import { graphql } from "gatsby"

import Layout from '../components/layout'

class IndexPage extends React.Component {

  render() {
  	const data = this.props.data;
  	return(
	  <Layout>
	    <div>
	      <h1>My WordPress Blog</h1>
	      <h4>Posts</h4>
	      {data.allWordpressPost.edges.map(({ node }) => (
	        <div key={node.id}>
	          <p>{node.title}</p>
	          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
	        </div>
	      ))}
	    </div>
	  </Layout>
	)
  }

}

export default IndexPage


export const pageQuery = graphql`
  query {
    allWordpressPost(sort: { fields: [date] }) {
      edges {
        node {
        	id
          	title
          	excerpt
          	slug
        }
      }
    }
  }
`
