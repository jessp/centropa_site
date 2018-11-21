import React from 'react'
import {capitalizeFirstLetter} from "../utils/helpers"
import he from "he"
import MenuEntry from '../components/MenuEntry'





class MenuCat extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    let cat_name = this.props.cat_name;
    let menu_items = this.props.menu_items;

    let items = menu_items.filter(function(d){
        let item_exists = d.node.categories.filter(function(e){
          return e.name === cat_name;
        })
        return item_exists.length > 0;
      });

    return (
        <div className={"menuSection"}>
          <div  className = {"foodColumn"}> 
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
            <div className={"mediaColumn"}>
              <img className={"mediaBg"} src={"http://placekitten.com/400/600"}/>
            </div>
            <div className={"clearer"}/>
        </div>
    )

  }

}

export default MenuCat