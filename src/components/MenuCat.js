import React from 'react'
import {capitalizeFirstLetter} from "../utils/helpers"
import he from "he"
import MenuEntry from '../components/MenuEntry'


class MenuCat extends React.Component {

  constructor(props){
    super(props);

    this.changeImg = this.changeImg.bind(this);

    let start_image = this.props.menu_items.find(function(element) {
      return element.node.acf.food_photo;
    });

    if (start_image){
      start_image = {"title": start_image.node.title, "img": start_image.node.acf.food_photo.source_url}
    }

    this.state = {
      "currentImage": start_image
    }
  }

  changeImg(item){
    this.setState({"currentImage": item});
  }

  render(){
    let cat_name = this.props.cat_name;
    let items = this.props.menu_items;
    let changeImg = this.changeImg;
    let currentImage = this.state.currentImage;

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
                      image = {item.node.acf.food_photo ? item.node.acf.food_photo.source_url : null}
                      changeImg = {changeImg}
                      isActive = {currentImage ? currentImage.title == he.decode(item.node.title) : false}
                    />
                  )
                })
              }
            </div>
            
          </div>
            {this.state.currentImage &&
            <div className={"mediaColumn"}>
              <div className={"mediaBg"} style={{"backgroundImage": "url(" + this.state.currentImage.img + ")"}}/>
            </div>
            }
            <div className={"clearer"}/>
        </div>
    )

  }

}

export default MenuCat