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
        <Layout pageName={""}>
          <div className={"twelveXWrapper"}>
            <div className={"storiesIntroWrapper"}>
              <h2>{"Centropa Stories"}</h2>
              <p>
                  <span>{"In Centropa stories, we bring together some of Norway’s brightest writers and invite them to write about food culture around the world. " +
                  "You can experience their work here online, pick up a copy of Centropa magazine at Deichman, or order something off our "}</span>
                  <Link to={"/menu#sandwiches"}>
                    <span>{"sandwich menu"}</span>
                  </Link>
                  <span>{" to see how they’ve inspired us."}</span>
              </p>
              <h3>{"Current Line-up"}</h3>
            </div>
            <div className={"authorGrid"}>
              <AuthorGrid authors={gridAuthors} setAuthor={this.setActiveAuthor} featuredAuthor={featuredAuthor.acf.author_name}/>
            </div>
          </div>
          <div className={"storiesImageWrapper"}>
            <div className= {"bgSquare1"}/>
            <div className= {"bgSquare2"}/>
            <div className = {"locationBg"} 
                style={{"backgroundImage":"url(" + featuredAuthor.acf.location_photo.source_url + ")"}}/>
            <div className= {"bgSquare3"}/>
            {
              featuredSandwichImage &&
                <div className = {"foodBg"}
                style={{"backgroundImage":"url(" + featuredSandwichImage.source_url + ")"}}/>
            }
            <div className = {"authorBox"}
              style={{"backgroundImage":"url(" + featuredAuthor.acf.author_photo.source_url + ")"}}/>

            <div className = {"inspirationBox"}>
                <p>{featuredSandwich.node.title}</p>
                <p>{"inspired by"}</p>
                <p>{featuredAuthor.acf.author_name}</p>
                <p>{"inspired by"}</p>
                <p>{featuredAuthor.acf.country_name}</p>

            </div>
            <div className = {"excerptBox"}>
              <p>
                {"“" + featuredAuthor.acf.story_excerpt + "”"}
              </p>
            </div>
            <div className = {"readNowBox underlineLink"}>
              <p>{"Read " + featuredAuthor.acf.author_name + "'s"}</p>
              <Link to={"/" + featuredAuthor.slug}>
                <span>{featuredAuthor.title}</span>
              </Link>
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