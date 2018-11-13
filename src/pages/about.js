import React from 'react'
import { graphql } from "gatsby"
import Layout from '../layouts/Layout'

import '../css/about.css'


class AboutPage extends React.Component {



  render() {
  	console.log(this.props.data.wordpressPage.content);
  	return(
	  <Layout pageName={"About"}>
	  	<div className = {"wrapper aboutPage"} dangerouslySetInnerHTML={{__html: this.props.data.wordpressPage.content}}/>
	  </Layout>
	)
  }

}

export default AboutPage


export const featuredQuery = graphql`
	query {
		wordpressPage(title: {eq: "About"}) {
			content
		}
		
	}`