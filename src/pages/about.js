import React from 'react'
import { graphql } from "gatsby"
import Layout from '../layouts/Layout'

import '../css/index.css'


class AboutPage extends React.Component {

  render() {
  	return(
	  <Layout pageName={"About"}>
	      <div className = {"wrapper"}>
	        <h1>{"hihihihih"}</h1>
	      </div>
	  </Layout>
	)
  }

}

export default AboutPage