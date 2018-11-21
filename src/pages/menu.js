import React from 'react'
import { graphql } from "gatsby"
import Layout from '../layouts/Layout'
import MenuCat from '../components/MenuCat'

class Menu extends React.Component {

  constructor(props){
    super(props);
  }

  

  render() {
      let menu_items = this.props.data.allWordpressPost.edges;

      return (
        <Layout pageName={""}>
          <div className={"controlColumn menuColumn"}/>
          <div style={{"width": "80%", "marginLeft":"20%", "position":"relative"}}>
            <MenuCat cat_name={"snacks"} menu_items={menu_items}/>
            <MenuCat cat_name={"sandwiches"} menu_items={menu_items}/>
            <MenuCat cat_name={"mains"} menu_items={menu_items}/>
            <MenuCat cat_name={"desserts"} menu_items={menu_items}/>
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
                  link
                }
              }
            }
          }
        }
      }
`