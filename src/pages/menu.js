import React from 'react'
import { graphql } from "gatsby"
import Layout from '../layouts/Layout'
import MenuCat from '../components/MenuCat'

class Menu extends React.Component {

  constructor(props){
    super(props);

    this.filterItems = this.filterItems.bind(this);
  }

  filterItems(menu_items, cat_name){
    return menu_items.filter(function(d){
        let item_exists = d.node.categories.filter(function(e){
          return e.name === cat_name;
        })
        return item_exists.length > 0;
      });
  }

  

  render() {
      let menu_items = this.props.data.allWordpressPost.edges;

      return (
        <Layout pageName={""}>
          <div className={"controlColumn menuColumn"}/>
          <div style={{"width": "80%", "marginLeft":"20%", "position":"relative"}}>
            <MenuCat cat_name={"snacks"} menu_items={this.filterItems(menu_items, "snacks")}/>
            <MenuCat cat_name={"sandwiches"} menu_items={this.filterItems(menu_items, "sandwiches")}/>
            <MenuCat cat_name={"mains"} menu_items={this.filterItems(menu_items, "mains")}/>
            <MenuCat cat_name={"desserts"} menu_items={this.filterItems(menu_items, "desserts")}/>
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
                food_photo {
                  source_url
                }
              }
            }
          }
        }
      }
`