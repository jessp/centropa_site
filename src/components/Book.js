import React from 'react'
import "./../css/Book.css"


class Book extends React.Component {

  render() {
  	console.log(this.props);
  	return(
  		<div className={"bookHolder"}>
  			<div className={"book"}
  			style={{"backgroundImage": "url(\"" + this.props.photo + "\")"}}>
  				<div className={"bookBand"}>
  					<h1>{this.props.title}</h1>
  					<h2>{this.props.author}</h2>
  					<h3>{"(" + this.props.country + ")"}</h3>
  				</div>
  			</div>
  		</div>
  	)

  }
}

export default Book