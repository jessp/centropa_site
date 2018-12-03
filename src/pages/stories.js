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

      return (
        <Layout pageName={""}>
          <div className={"bgShapes bgShapeOne"}/>
          <div className={"twelveXWrapper"}>
            <div className={"twelveXIntro"}>
              <p>
                In the <span style={{"fontWeight": "bold"}}>12x project</span>, we bring together a roster of twelve Norwegian authors and encourage them to write about the food culture of a given country. We, in turn, are inspired by their writing to create a special sandwich as part of our rotating sandwich menu. We change one of our authors every few weeks, and change our sandwich feature to match. We hope their wisdom inspires you too.
              </p>
            </div>
            <div className={"authorPhoto"} 
                  style={{"backgroundImage": "url('" + featuredAuthor.acf.author_photo.source_url + "')"}}>
                <div className = {"mobileStoryInfo storyInfo"}>
                  <h3>{featuredAuthor.acf.author_name}</h3>
                  <h2>{featuredAuthor.title}</h2>
                  <h4>{"Inspired by " + featuredAuthor.acf.country_name}</h4>
                  <p>
                    {"“" + featuredAuthor.acf.story_excerpt + "”"}
                  </p>
                  <div className={"underlineLink readMoreButton"}>
                    <Link to={"/" + featuredAuthor.slug}>
                      <span>{"Read More"}</span>
                    </Link>
                  </div>
                </div>
            </div>
            <div className={"storyInfo nonMobileStoryInfo"}>
              <h3>{featuredAuthor.acf.author_name}</h3>
              <h2>{featuredAuthor.title}</h2>
              <h4>{"Inspired by " + featuredAuthor.acf.country_name}</h4>
              <p>
                {"“" + featuredAuthor.acf.story_excerpt + "”"}
              </p>
              <div className={"underlineLink readMoreButton"}>
                <Link to={"/" + featuredAuthor.slug}>
                  <span>{"Read More"}</span>
                </Link>
              </div>
            </div>
            <div className={"authorGrid"}>
              <AuthorGrid authors={gridAuthors} setAuthor={this.setActiveAuthor} featuredAuthor={featuredAuthor.acf.author_name}/>
            </div>
            <div className={"scrollIndicator"}>
              <img src={ScrollDown}/>
            </div>
          </div>
          <AuthorArchive 
            allAuthors={this.props.data.allContributors.edges} 
            setAuthor={this.setActiveAuthor}
            featuredAuthor={featuredAuthor.acf.author_name} />
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
      }
      
`