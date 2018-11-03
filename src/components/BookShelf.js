import React from 'react'
import "./../css/BookShelf.css"


class BookShelf extends React.Component {

  render() {
  	return(
  		<div className={"shelf"}>
        {this.props.children}
  		</div>
  	)

  }
}

export default BookShelf