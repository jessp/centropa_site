import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../components/header'
import './main.css'

const Layout = ({ home, children, pageName }) => (

  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}

    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Centropa' },
            { name: 'keywords', content: 'restaurant' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <div className={"bgShapes bgShapeOne"}/>
        <div
          style={{
            margin: '0 auto',
            padding: '0px',
            marginTop: "35px",
            position: 'relative'
          }}
        >
          {children}
        </div>
        <div>
          <Header siteTitle={data.site.siteMetadata.title} pageName={pageName}/>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
