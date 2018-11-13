import React from 'react'
import "./../css/BookShelf.css"


class BookShelf extends React.Component {

  render() {
  	return(
  		<div className={"shelf"}>
  			<div className={"innerShelf"}>
        		{this.props.children}
        	</div>
  		</div>
  	)

  }
}

export default BookShelf