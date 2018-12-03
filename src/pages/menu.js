import React from 'react'
import { graphql } from "gatsby"
import Layout from '../layouts/Layout'
import MenuCat from '../components/MenuCat'
import MenuLocation from '../components/MenuLocation'
import MediaColumn from '../components/MediaColumn'
import '../css/Menu.css'



class Menu extends React.Component {

  constructor(props){
    super(props);

    let categoryOrder = ["sandwiches", "snacks", "mains", "desserts"];

    this.filterItems = this.filterItems.bind(this);
    this.setActiveCat = this.setActiveCat.bind(this);

    this.state ={
      "activeCat": "snacks",
      "windowHeight": 0
    }

    //format author data so it's easy to pair with sandwich data
    let contribs = {};
    for (let author = 0; author < this.props.data.allContributors.edges.length; author++){
      contribs[this.props.data.allContributors.edges[author]["node"]["acf"]["country_name"]] = this.props.data.allContributors.edges[author]["node"]["slug"];
    }

    this.contribs = contribs;

    //format sandwich data so it's easy to display
    let photos = [];
    for (let item = 0; item < this.props.data.food.edges.length; item++){
      let thisItem = this.props.data.food.edges[item].node;
      if (thisItem["acf"]["food_photo"]){
        let imgObject = new Object();
        imgObject["title"] = thisItem["title"];
        imgObject["img"] = thisItem["acf"]["food_photo"]["source_url"];

        let category = "sandwiches"; //we'll send sandwiches as a default in case someone forgets to set a subcat in wp
        let allCats = thisItem["categories"].map(function(node){
            return Object.values(node)[0];
          });

        for (var cat = 0; cat < categoryOrder.length; cat++){
          if (allCats.find(function(el) { return el === categoryOrder[cat] }) !== undefined){
            category = categoryOrder[cat];
            break;
          }
        } 
        imgObject["category"] = category;
        photos.push(imgObject);

      }
    }

    //sort based on how the sections are currently ordered
    photos = photos.sort(function(a, b){
      return categoryOrder[b["category"]] - categoryOrder[a["category"]];
    });

    this.photos = photos;
  }


  componentDidMount(){
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  filterItems(menu_items, cat_name){
    return menu_items.filter(function(d){
        let item_exists = d.node.categories.filter(function(e){
          return e.name === cat_name;
        })
        return item_exists.length > 0;
      });
  }

  setActiveCat(cat){
    this.setState({"activeCat": cat});
  }

  updateWindowDimensions() {
    this.setState({ windowHeight: document.body.scrollHeight });
  }


  render() {
      let menu_items = this.props.data.food.edges;

      return (
        <Layout pageName={""}>

          <div className={"menuColumns"}>
            <div className={"controlColumn menuColumn"}>
              <MenuLocation categories={["sandwiches", "snacks", "mains", "desserts"]} active={this.state.activeCat}/>
              {/*<FilterPanel/>*/}
            </div>
            <div className={"menuWrapper"}>
              <div className={"foodColumn"}>
                <MenuCat cat_name={"sandwiches"} menu_items={this.filterItems(menu_items, "sandwiches")} setActiveCat={this.setActiveCat} authors={this.contribs}/>
                <MenuCat cat_name={"snacks"} menu_items={this.filterItems(menu_items, "snacks")} setActiveCat={this.setActiveCat}/>
                <MenuCat cat_name={"mains"} menu_items={this.filterItems(menu_items, "mains")} setActiveCat={this.setActiveCat}/>
                <MenuCat cat_name={"desserts"} menu_items={this.filterItems(menu_items, "desserts")} setActiveCat={this.setActiveCat}/>
              </div>
              <div className={"mediaColumn"}>
                <MediaColumn photos={this.photos} windowHeight={this.state.windowHeight}/>
              </div>
            </div>
          </div>

        </Layout>
      )
  }

}

export default Menu

export const menuQuery = graphql`
query {
        food:  allWordpressPost(filter:{
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
                accompanying_text
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
              slug
              acf{
                country_name
              }
            }
          }
        }
      }
`