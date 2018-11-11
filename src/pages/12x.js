import React from 'react'
import { graphql} from "gatsby"
import Layout from '../layouts/Layout'
import BookShelf from '../components/BookShelf'
import Book from '../components/Book'


class TwelveX extends React.Component {

  constructor(props){
    super(props);

    this.render_shelf = this.render_shelf.bind(this);
  }

  render_shelf(books){
    return (
      <BookShelf>
        {
          books.map(function(book, idx){
            return (
                <Book key={idx}
                  title={book.node.title}
                  author={book.node.acf.author_name}
                  country={book.node.acf.country_name}
                  photo={book.node.acf.location_photo.source_url}
                  slug={book.node.slug}
                />
            )
          })
        }
      </BookShelf>
    )
  }

  render() {
      let contributors = this.props.data.allWordpressPost.edges;

      let special_guest = contributors.filter(function(d){
        if (d.node.tags){
          let tag_names = d.node.tags.map(node => node.name);
          if (tag_names.indexOf("limited feature") > -1) {
            return true
          }
        }
        return false;
      });

      let other_contributors = contributors.filter(function(d){
        if (d.node.tags){
          let tag_names = d.node.tags.map(node => node.name);
          if (tag_names.indexOf("limited feature") > -1) {
            return false
          }
        }
        return true;
      });


      return (
        <Layout>
          <div className = {"wrapper"}>
            <h1>{"Books"}</h1>
            <div style={{"height": "calc(100% - 100px)", "position": "relative"}}>
              {this.render_shelf(other_contributors.slice(0,4))}
              {this.render_shelf(other_contributors.slice(4,8))}
              {this.render_shelf(other_contributors.slice(8,12).concat(special_guest))}
            </div>
          </div>
        </Layout>
      )
  }

}

export default TwelveX

export const contributorQuery = graphql`
  query {
          allWordpressPost(filter:{
            categories:
              {elemMatch: 
                {name:
                  {eq: "contributor"}
                }
              }
          }) {
          edges {
            node {
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
                location_photo {
                  source_url
                }
              }
            }
          }
        }
      }
`