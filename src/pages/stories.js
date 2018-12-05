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
    console.log(featuredAuthor);
      return (
        <Layout pageName={""} style={{"height": "100%"}}>
          <div className={"menuColumns twelveXWrapper"}>
              <div className={"controlColumn menuColumn"}>
                <h2>{"Current Issue"}</h2>
              </div>
              <div className={"menuWrapper"}  style={{"height": "100%"}}>
                <div className={"mediaColumn"} style={{"height": "100%"}}>
                  <div className={"bgLayers"} style={
                      {"height":"calc(100% + 50px)", "position": "relative", "overflow": "hidden", "marginTop": "-50px"}
                    }>
                    <div className={"redRect"}
                        style={{"left":"2vw","top":"1.2vw", "width": "4.3vw", "height": "4.2vw"}}/>
                    <div className={"redRect"}
                        style={{"left":"12.4vw","top":"6.5vw", "width": "2.3vw", "height": "2.2vw"}}/>
                     <div className={"redRect"}
                        style={{"left":"0vw", "top":"calc(50% + 15.5vw)", "width": "7.3vw", "height": "7.2vw"}}/>
                     <div className={"redRect"}
                        style={{"right":"0vw", "top":"calc(50% - 1vw)", "width": "9vw", "height": "9vw"}}/>
                    <div style={{
                      "width": "16vw", 
                      "height":"22vw", 
                      "left": "calc(50% - 15vw)", 
                      "top": "calc(35% + 4vw)", 
                      "backgroundImage":"url(" + (featuredAuthor.acf.location_photo.source_url) + ")"}}/>
                    {featuredSandwichImage &&
                      <div style={{
                      "width": "12vw", 
                      "height":"18vw", 
                      "left": "calc(50% - 1vw)", 
                      "top": "calc(35% + 15vw)", 
                      "backgroundImage":"url(" + (featuredSandwichImage.source_url) + ")"}}/>
                    }
                    <div style={{
                      "width": "16vw", 
                      "height":"19vw", 
                      "left": "calc(50% - 2vw)", 
                      "top": "calc(35% - 16vw)", 
                      "backgroundImage":"url(" + (featuredAuthor.acf.author_photo.source_url) + ")"}}/>
                    <div style={{
                      "minWidth": "20vw", 
                      "minHeight":"8vw", 
                      "left": "calc(50% - 10vw)", 
                      "top": "35%", 
                      "backgroundColor":"#0d3e32"}} className={"underlineLink readNow"}> 
                      <div style={{"top": "50%", "transform": "translateY(-50%)"}}>
                        <p style={{"fontSize":"0.85em"}}>{"Read " + featuredAuthor.acf.author_name + "'s"}</p>
                        <Link to={"/" + featuredAuthor.slug}>
                          <span>{featuredAuthor.title}</span>
                        </Link>
                      </div>

                    </div>
                    <div className={"bgExcerpts"} style={{
                      "width": "20vw", 
                      "right": "0px", 
                      "top": "calc(35% + 16vw)"}}>
                      <div style={{"width": "100%"}}>
                        <div>
                          <p>
                            {featuredAuthor.acf.story_excerpt}
                          </p>
                          </div>
                      </div>
                    </div> 
                  </div>
                </div>
                <div className={"foodColumn"} style={{"display": "flex", "flexDirection":"column", "height": "100%"}}>
                  <div>
                    <h2>{"Centropa Stories"}</h2>
                    <p>
                      <span>{"In Centropa stories, we bring together some of Norway’s brightest writers and invite them to write about food culture around the world. " +
                      "You can experience their work here online, pick up a copy of Centropa magazine at Deichman, or order something off our "}</span>
                      <Link to={"/menu#sandwiches"}>
                        <span>{"sandwich menu"}</span>
                      </Link>
                      <span>{" to see how they’ve inspired us."}</span>
                    </p>
                  </div>
                  <div>
                    <h2>{"Archive"}</h2>
                      
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