import React from 'react'
import { Link} from "gatsby"
import "./../css/Book.css"




class Book extends React.Component {

  render() {
  	return(
  		<div className={"bookHolder " + (this.props.special_guest ? "spGuestBook" : "")}>
  		    <Link to={"/" + this.props.slug}>
	  			<div className={"book"}
	  			style={{"backgroundImage": "url(\"" + this.props.photo + "\")"}}>
	  				<div className={"bookBand"}>
	  					<h1>{this.props.title}</h1>
	  					<h2>{this.props.author}</h2>
	  					{this.props.special_guest &&
	  						<h2 className={"spGuTag"}>{"Special Guest"}</h2>
	  					}
	  					<h3>{"(" + this.props.country + ")"}</h3>
	  				</div>
	  			</div>
	  		</Link>
  		</div>
  	)

  }
}

export default Book