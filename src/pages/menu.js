import React from 'react'
import { graphql } from "gatsby"
import {capitalizeFirstLetter} from "../utils/helpers"
import he from "he"
import Layout from '../layouts/Layout'
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
        <div className = {"menuSection"}>
          <h2>{capitalizeFirstLetter(cat_name)}</h2>
          <div className={"menuItemGroups"}>
            {
              items.map(function(item, index){
                let tags = [];
                if (item.node.tags !== null){
                  tags = item.node.tags.map(function(e){
                    return Object.values(e)[0]
                  })
                }
                return (
                  <MenuEntry
                    key = {index}
                    item_name = {he.decode(item.node.title)}
                    price = {item.node.acf.price}
                    description = {he.decode(item.node.acf.description)}
                    tags = {tags}
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
        <Layout pageName={""}>
          <div className={"controlColumn menuColumn"}/>
          <div className={"foodColumn menuColumn"}>
            {/*this.render_cat("drinks", menu_items)*/}
            {this.render_cat("snacks", menu_items)}
            {this.render_cat("sandwiches", menu_items)}
            {this.render_cat("mains", menu_items)}
            {this.render_cat("desserts", menu_items)}
            {/*this.render_cat("alcohol", menu_items)*/}
          </div>
          <div className={"mediaColumn"}>
            <div className={"mediaBg"} style={{"backgroundImage": "url(http://placekitten.com/400/600)"}}/>
          </div>
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