import React from 'react'
import "../css/AuthorList.css"

class AuthorList extends React.Component {

	render(){
		let switchAuthor = this.props.setAuthor;
		let featuredAuthor = this.props.featuredAuthor;
		let origFeature = this.props.origFeature;

		return (
			<div className={"authorGridContainer menuLocationPanel"}>
				{
					this.props.authors.map(function(node, idx){
						let isFeatured = false;
						if (origFeature.acf.author_name === node.node.acf.author_name){
							isFeatured = true;
						}
						return (
							<div key={idx} className={"authorButton " + (node.node.acf.author_name === featuredAuthor ? "activeMenu " : " ") + (isFeatured ? "isFeaturedAuthor" : " ")}
								onClick={() => switchAuthor(node.node)}>
								<p>{node.node.acf.author_name}</p>
								<p>
									<span>{node.node.acf.country_name}</span>
									{isFeatured &&
										<span>{" (featured)"}</span>
									}
								</p>

							</div>
						)
					})
				}
			</div>
		)
	}
}

export default AuthorList