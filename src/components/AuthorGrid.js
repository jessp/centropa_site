import React from 'react'
import "../css/AuthorGrid.css"

class AuthorGrid extends React.Component {

	render(){
		let switchAuthor = this.props.setAuthor;
		let featuredAuthor = this.props.featuredAuthor;
		return (
			<div className={"authorGridContainer"}>
				{
					this.props.authors.map(function(node, idx){
						return (
							<div key={idx} className={"authorButton " + (node.node.acf.author_name === featuredAuthor ? "featuredButton" : "")}
								onClick={() => switchAuthor(node.node)}>
								<div className={"authorThumbnail"}
								style={{"backgroundImage": "url('" + node.node.acf.author_thumbnail.source_url + "')"}}/>
								<p>{node.node.acf.author_name}</p>
							</div>
						)
					})
				}
			</div>
		)
	}
}

export default AuthorGrid