import React from 'react'
import {capitalizeFirstLetter} from "../utils/helpers"
import he from "he"
import MenuEntry from '../components/MenuEntry'
import ScrollableAnchor from 'react-scrollable-anchor'
import { configureAnchors } from 'react-scrollable-anchor'




class MenuCat extends React.Component {

  constructor(props){
    super(props);

    this.changeImg = this.changeImg.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    //start image is the initial image shown on section load.
    //it's set from the first element in the section with an associated element
    let start_image = this.props.menu_items.find(function(element) {
      return element.node.acf.food_photo;
    });

    if (start_image){
      start_image = {"title": start_image.node.title, "img": start_image.node.acf.food_photo.source_url}
    }

    this.state = {
      "currentImage": start_image,
      "isInView": false,
      "windowHeight": 0
    }

    configureAnchors({keepLastAnchorHash: true})

  }

  componentDidMount(){
    this.updateWindowDimensions();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.updateWindowDimensions);

    if ((this.refs.thisSection.offsetTop - 10) < (window.scrollY + window.innerHeight) && (this.refs.thisSection.offsetTop + 75)  > window.scrollY){
      this.props.setActiveCat(this.props.cat_name);
      this.setState({"isInView": true});
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  handleScroll(event) {

    if ((this.refs.thisSection.offsetTop - 10) < (window.scrollY + window.innerHeight) &&
       (this.refs.thisSection.offsetTop + 75)  > window.scrollY) {
      if (this.state.isInView === false) {
        this.props.setActiveCat(this.props.cat_name);
        this.setState({"isInView": true});
      }
    } else {
      if (this.state.isInView === true) {
        this.setState({"isInView": false});
      }
    }
  }

  changeImg(item){
    this.setState({"currentImage": item});
  }

  updateWindowDimensions() {
    this.setState({ windowHeight: window.innerHeight });
  }

  render(){
    let cat_name = this.props.cat_name;
    let items = this.props.menu_items;
    let changeImg = this.changeImg;
    let currentImage = this.state.currentImage;
    let contribs = this.props.authors;

    return (
        <div className={"menuSection"} ref={"thisSection"}>
          {this.state.currentImage &&
            <div className={"mediaColumn"}>
              <div className={"mediaBg"} style={{"backgroundImage": "url(" + this.state.currentImage.img + ")"}}/>
            </div>
          }
          <div  className = {"foodColumn"}> 
            <ScrollableAnchor id={cat_name}>
              <h2>{capitalizeFirstLetter(cat_name)}</h2>
            </ScrollableAnchor>
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
                      isActive = {currentImage ? currentImage.title === he.decode(item.node.title) : false}
                      accompanyingText = {item.node.acf.accompanying_text}
                      slug={item.node.acf.country ? contribs[item.node.acf.country] : null}
                    />
                  )
                })
              }
            </div>
            
          </div>
            <div className={"clearer"}/>
        </div>
    )

  }

}

export default MenuCat