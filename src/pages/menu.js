import React from 'react'
import { graphql } from "gatsby"
import {capitalizeFirstLetter} from "../utils/helpers"
import Layout from '../layouts/layout'
import MenuEntry from '../components/MenuEntry'


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
                <MenuEntry
                  key = {index}
                  item_name = {item.node.title}
                  price = {item.node.acf.price}
                  description = {item.node.acf.description}
                />
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
        <Layout>
          <h1>{"Menu"}</h1>
          <div style ={{"width": "100%", padding:"0px", margin: "0px"}}>
            {this.render_cat("drinks", menu_items)}
          </div>
          {this.render_cat("sandwiches", menu_items)}
        </Layout>
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