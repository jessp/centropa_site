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
            let tag_names = [];
            if (book.node.tags){
              tag_names = book.node.tags.map(node => node.name);
            }
            return (
                <Book key={idx}
                  title={book.node.title}
                  author={book.node.acf.author_name}
                  country={book.node.acf.country_name}
                  photo={book.node.acf.location_photo.source_url}
                  slug={book.node.slug}
                  special_guest={tag_names.indexOf("limited feature") > -1}
                />
            )
          })
        }
      </BookShelf>
    )
  }

  render() {
      let contributors = this.props.data.allWordpressPost.edges;

      return (
        <Layout pageName={"Books"}>
          <div className = {"wrapper"}>
            <div style={{"height": "100%", "position": "relative"}}>
              {this.render_shelf(contributors.slice(0,4))}
              {this.render_shelf(contributors.slice(4,8))}
              {this.render_shelf(contributors.slice(8,13))}
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