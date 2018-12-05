import React from 'react'
import { graphql, Link} from "gatsby"
import Layout from '../layouts/Layout'
import AuthorGrid from '../components/AuthorGrid'
import AuthorArchive from '../components/AuthorArchive'
import "./../css/12x.css"
import ScrollDown from "../images/scroll_down.svg";




class Stories extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      "featuredAuthor": this.props.data.featured.edges[0].node
    }

    this.setActiveAuthor = this.setActiveAuthor.bind(this);

  }

  setActiveAuthor(authorNode){
    this.setState({"featuredAuthor": authorNode});
  }

  render() {
    let featuredAuthor = this.state.featuredAuthor;
    let gridAuthors = [this.props.data.featured.edges[0]].concat(this.props.data.nonFeatured.edges);
    let featuredSandwich = this.props.data.food.edges.find(function(node){
      return node.node.title === featuredAuthor.title;
    });
    let featuredSandwichImage = featuredSandwich["node"]["acf"]["food_photo"];
      return (
        <Layout pageName={""} style={{"height": "100%"}}>
          <div className={"menuColumns twelveXWrapper"}>
              <div className={"controlColumn menuColumn"}>
                <h2>{"Current Issue"}</h2>
              </div>
              <div className={"menuWrapper"}  style={{"height": "100%"}}>
                <div className={"mediaColumn"} style={{"height": "100%"}}>
                  <div className={"bgLayers"}>
                    <div style={{"width": "20vw", "height":"6vw", "left": "calc(50%)", "backgroundColor":"#aaa"}}>
                      
                    </div>
                  </div>
                </div>
                <div className={"foodColumn"}>
                  <h2>{"Centropa Stories"}</h2>
                </div>
              </div>
            </div>
        </Layout>
      )
  }

}

export default Stories

export const contributorQuery = graphql`
  query {
          allContributors: allWordpressPost(filter:{
            categories:
              {elemMatch: 
                {name:
                  {eq: "contributor"}
                }
              }
          } sort: { fields: [date], order: ASC }) {
          edges {
            node {
              date
              categories {
                name
              }
              tags {
                name
              }
              title
              slug
              acf{
                author_name,
                country_name,
                story_excerpt,
                author_thumbnail {
                  source_url
                },
                author_photo {
                  source_url
                },
                location_photo {
                  source_url
                }
              }
            }
          }
        }
          nonFeatured: allWordpressPost(filter:{
            categories:
              {elemMatch: 
                {name:
                  {eq: "contributor"}
                }
              }
            tags: {elemMatch: 
                {name:
                  {nin: "limited feature"}
                }
            }
          } sort: { fields: [date], order: ASC }
          limit: 11) {
          edges {
            node {
              date
              categories {
                name
              }
              tags {
                name
              }
              title
              slug
              acf{
                author_name,
                country_name,
                story_excerpt,
                author_thumbnail {
                  source_url
                },
                author_photo {
                  source_url
                },
                location_photo {
                  source_url
                }
              }
            }
          }
        }
        featured: allWordpressPost(filter:{
            categories:
              {elemMatch: 
                {name:
                  {eq: "contributor"}
                }
              }
            tags: {elemMatch: 
                {name:
                  {eq: "limited feature"}
                }
            }
          } sort: { fields: [date], order: ASC }) {
          edges {
            node {
              date
              categories {
                name
              }
              tags {
                name
              }
              title
              slug
              acf{
                author_name,
                country_name,
                story_excerpt,
                author_thumbnail {
                  source_url
                },
                author_photo {
                  source_url
                },
                location_photo {
                  source_url
                }
              }
            }
          }
        }
        food:  allWordpressPost(filter:{
            categories:
              {elemMatch: 
                {name:
                  {eq: "sandwiches"}
                }
              }
          }) {
          edges {
            node {
              title
              acf{
                food_photo {
                  source_url
                }
              }
            }
          }
        }
      }
      
`