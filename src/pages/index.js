import React from 'react'
import { Link, graphql } from "gatsby"
import PostIcons from "../components/PostIcons"
import Layout from '../layouts/layout'

import '../css/index.css'


class IndexPage extends React.Component {

  render() {
  	const data = this.props.data;
    console.log(data);
  	return(
	  <Layout home={true}>
      <div className={"container"}>
  	     <div className={"image_clip"}>
         </div>
      </div>
	  </Layout>
	)
  }

}

export default IndexPage


export const featuredQuery = graphql`
  query {
          wordpressPost(
            tags:
              {elemMatch: 
                {name:
                  {eq: "limited feature"}
                }
              }
            ) {
          content
        }
      }
`
