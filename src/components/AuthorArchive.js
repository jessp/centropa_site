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

		let sorting = ["Alphabetical", "Country", "Date"];
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
			cats = this.props.allAuthors.reduce((cats, name) => {
				let country = name.node.acf.country_name;
			 	if (country in cats){
			 		cats[country].push(name);
			 	} 
			  	else {
			  		cats[country] = [name];
			  	}   
			 	return cats;
			}, {});
		} else if (active === "Date"){
			cats = this.props.allAuthors.reduce((cats, name) => {
				let time = new Date(new Date(name.node.date).getFullYear(), new Date(name.node.date).getMonth());
			 	if (time in cats){
			 		cats[time].push(name);
			 	} 
			  	else {
			  		cats[time] = [name];
			  	}   
			 	return cats;
			}, {});
		}

		let months = 
		["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		

		return (
			<div className={"authorListHolder"}>
				<div className={"authorSorting underlineLink"} style={{"position": "relative", "width": "100%"}}>
				<p><span style={{"float": "left", "paddingTop": "5px", "display": "inline-block"}}>{"Sort by: "}</span>
					{
						sorting.map(function(sort, idx){
							return (
								<a key={idx} className={sort === active ? "activeUnderlineLink" : ""}
									style={{"cursor": "pointer"}}
									onClick={() => setAct(sort)}>
									<span>{sort}</span>
								</a>
							)
						})
					}
					</p>
				</div>
					<div className={"authorColumns"}>

							<div>
								{active === "Date" &&
									Object.keys(cats).sort().map(function(cat){
										return (
											<div key={cat}>
												<h3>
													{months[new Date(cat).getMonth()] + " " + new Date(cat).getFullYear()}
												</h3>
												<ul>
													{cats[cat].sort(function(a, b){
														return new Date(b.node.date) - new Date(a.node.date);
													}).map(function(author, idx){
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
								{active !== "Date" &&
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
					</div>


			</div>
		)
	}


}

export default AuthorArchive;