import React from 'react'
import "../css/AuthorArchive.css"

class AuthorArchive extends React.Component {

	constructor(props){
	    super(props);

	    this.state = {
	    	"activeSort": "Alphabetical"
	    }

	    this.setActive = this.setActive.bind(this);
	}

	setActive(val){
		this.setState({"activeSort": val});
	}

	render(){

		let sorting = ["Alphabetical", "Country", "Year"];
		let active = this.state.activeSort;
		let setAct = this.setActive;
		let setAuthor = this.props.setAuthor;
		let activeAuthor = this.props.featuredAuthor;
		let cats;

		if (active === "Alphabetical"){
			cats = this.props.allAuthors.reduce((cats, name) => {
				let lastName = name.node.acf.author_name.split(" ")[name.node.acf.author_name.split(" ").length-1][0];
			 	if (lastName in cats){
			 		cats[lastName].push(name);
			 	} 
			  	else {
			  		cats[lastName] = [name];
			  	}   
			 	return cats;
			}, {});
		} else if (active === "Country"){

		} else if (active === "Year"){

		}

		return (
			<div className={"authorListHolder"}>
				<div className={"authorSorting headerContainer"} style={{"position": "relative", "width": "100%"}}>
					{
						sorting.map(function(sort, idx){
							return (
								<a key={idx} className={sort === active ? "activeHeaderLink" : ""}
									onClick={() => setAct(sort)}>
									<span>{sort}</span>
								</a>
							)
						})
					}
				</div>
				<h2>{"Archive of All Authors"}</h2>
					<div className={"authorColumns"}>
						{
							this.state.activeSort === "Alphabetical" &&
							<div>
								{
									Object.keys(cats).sort().map(function(cat){
										return (
											<div key={cat}>
												<h3>
													{cat}
												</h3>
												<ul>
													{cats[cat].sort().map(function(author, idx){
														return (
															<li key={author.node.acf.author_name}
																onClick={() => setAuthor(author.node)}>
																<span className={author.node.acf.author_name === activeAuthor ? "activeAuthorSpan" : ""}>
																	{author.node.acf.author_name}
																</span>
															</li>
														)
													})}
												</ul>
											</div>
										)
									})
								}
							</div>
						}
						{
							this.state.activeSort === "Country" &&
							<div>
								{"country"}
							</div>
						}
						{
							this.state.activeSort === "Year" &&
							<div>
								{"year"}
							</div>
						}
					</div>


			</div>
		)
	}


}

export default AuthorArchive;