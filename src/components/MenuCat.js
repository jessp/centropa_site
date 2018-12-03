import React from 'react'
import {capitalizeFirstLetter} from "../utils/helpers"
import he from "he"
import MenuEntry from '../components/MenuEntry'
import ScrollableAnchor from 'react-scrollable-anchor'
import { configureAnchors } from 'react-scrollable-anchor'




class MenuCat extends React.Component {

  constructor(props){
    super(props);

    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      "isInView": false
    }

    configureAnchors({keepLastAnchorHash: true})

  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);

    if ((this.refs.thisSection.offsetTop - 10) < (window.scrollY + window.innerHeight) && (this.refs.thisSection.offsetTop + 75)  > window.scrollY){
      this.props.setActiveCat(this.props.cat_name);
      this.setState({"isInView": true});
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

  render(){
    let cat_name = this.props.cat_name;
    let items = this.props.menu_items;
    let contribs = this.props.authors;

    return (
        <div className={"menuSection"} ref={"thisSection"}>
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
                      accompanyingText = {item.node.acf.accompanying_text}
                      slug={item.node.acf.country ? contribs[item.node.acf.country] : null}
                    />
                  )
                })
              }
            </div>
        </div>
    )

  }

}

export default MenuCat