import React from 'react'
import { graphql } from "gatsby"
import {capitalizeFirstLetter} from "../utils/helpers"


class Menu extends React.Component {

  constructor(props){
    super(props);

    this.render_cat = this.render_cat.bind(this);

  }

  render_cat(cat_name, menu_items){
    let items = menu_items.filter(function(d){
        let item_exists = d.node.categories.filter(function(e){
          return e.name === cat_name;
        })
        return item_exists.length > 0;
      });

    return (
      <div>
        <h2>{capitalizeFirstLetter(cat_name)}</h2>
        <div>
          {
            items.map(function(item, index){
              return (
                <div key = {index}>
                  <h3>{item.node.title + " " + item.node.acf.price}</h3>
                  <p>{item.node.acf.description}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )

  }

  render() {
      let menu_items = this.props.data.allWordpressPost.edges;

      return (
        <div>
          <h1>{"Menu"}</h1>
          {this.render_cat("drinks", menu_items)}
          {this.render_cat("sandwiches", menu_items)}
        </div>
      )
  }

}

export default Menu

export const menuQuery = graphql`
  query {
          allWordpressPost(filter:{
            categories:
              {elemMatch: 
                {name:
                  {eq: "menu"}
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
              acf{
                price
                description
                country
              }
            }
          }
        }
      }
`