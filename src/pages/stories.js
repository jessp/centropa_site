import React from 'react'
import { graphql, Link} from "gatsby"
import Layout from '../layouts/Layout'
import AuthorList from '../components/AuthorList'
import AuthorArchive from '../components/AuthorArchive'
import StoriesBg from '../components/StoriesBg'
import '../layouts/main.css'
import '../css/index.css'
import '../css/Header.css'
import '../css/Menu.css'
import "./../css/12x.css"
import ScrollDown from "../images/scroll_down.svg";






class Stories extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      "featuredAuthor": this.props.data.featured.edges[0].node,
      "origFeature": this.props.data.featured.edges[0].node
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
              <div className={"controlColumn menuColumn storiesCol"}>
                <h2>{"This Issue"}</h2>
                <AuthorList 
                  authors={gridAuthors}
                  setAuthor={this.setActiveAuthor} 
                  featuredAuthor={featuredAuthor.acf.author_name}
                  origFeature={this.state.origFeature}/>
              </div>
              <div className={"menuWrapper storiesCol"}  style={{"height": "100%"}}>
                <div className={"mediaColumn storiesCol"} style={{"height": "100%"}}>
                  <StoriesBg
                    featuredAuthor = {featuredAuthor}
                    featuredSandwich = {featuredSandwich}
                    featuredSandwichImage = {featuredSandwichImage}/>
                </div>
                <div className={"foodColumn storiesCol"} style={{"display": "flex", "flexDirection":"column", "height": "100%"}}>
                  <div>
                    <h2>{"Centropa Stories"}</h2>
                    <p className={"introPara"}>
                      <span>{"In Centropa stories, we bring together some of Norway’s brightest writers and invite them to write about food culture around the world. " +
                      "You can experience their work here online, pick up a copy of Centropa magazine at Deichman, or order something off our "}</span>
                      <Link to={"/menu#sandwiches"}>
                        <span>{"sandwich menu"}</span>
                      </Link>
                      <span>{" to see how they’ve inspired us."}</span>
                    </p>

                    <div className={"midReadNow"}>
                      <img src={featuredAuthor.acf.author_photo.source_url}/>
                      <div className={"redRect"} style={{"top":"75%", "left": "21%", "width": "4vw", "height": "4.2vw"}}/>
                      <div className={"redRect"} style={{"top":"12.5%", "left": "40%", "width": "9vw", "height": "8.7vw"}}/>
                      <div className={"redRect"} style={{"top":"55%", "left": "65%", "width": "10vw", "height": "10.8vw"}}/>
                      <div className={"redRect"} style={{"top":"2%", "left": "83%", "width": "3.4vw", "height": "3.2vw"}}/>

                      <div className={"readNow underlineLink"}>
                        <p style={{"fontSize":"0.85em"}}>{"Read " + featuredAuthor.acf.author_name + "'s"}</p>
                        <Link to={"/" + featuredAuthor.slug}>
                          <span>{featuredAuthor.title}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2>{"Archive"}</h2>
                    <AuthorArchive 
                      allAuthors={this.props.data.allContributors.edges} 
                      setAuthor={this.setActiveAuthor}
                      featuredAuthor={featuredAuthor.acf.author_name} />
                  </div>
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