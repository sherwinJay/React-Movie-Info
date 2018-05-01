import React from 'react';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import {
	Link
  } from 'react-router-dom';	

export default class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.state={
			query: '',
			movieList: [],
			showSuggestion: false
		}
	//	this.handleFilterChange = this.handleFilterChange.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.setIgnoreBlur = this.setIgnoreBlur.bind(this);
    	this.clearIgnoreBlur = this.clearIgnoreBlur.bind(this);
	}
	componentDidMount(){
		this.fetchMovie();
	}
    setIgnoreBlur() {
    	this.ignoreBlur = true;
 	}
  
	clearIgnoreBlur() {
	    this.ignoreBlur = false;
	}
    onFocus(){
    	this.setState({
    		showSuggestion: true
    	});	
    } 
    onBlur(){
    	if (this.ignoreBlur) return;
    	this.setState({
    		showSuggestion: false
    	});	
    }
	fetchMovie(){
		const apiKey = "ff9d34ddaaebff2b1a6100d54346c1a7";
						
		let movieLink = "https://api.themoviedb.org/3/search/movie?api_key=" + 
						apiKey + "&language=en-US&query=" + 
						this.state.query + "&page=1&include_adult=false";
		console.log(movieLink);
		$.ajax({
			method: 'GET',
			url: movieLink,
			success: (movieList) => {
				//create new movie link here
				this.setState({movieList: movieList.results});
			}
		});
	}

	handleFilter(e){
		this.setState({
			query: e.target.value
		}, () => {
		    if (this.state.query && this.state.query.length > 0) {
		        return  this.fetchMovie();
		    }else if(!this.state.query){
		      	
		    }
    	});
	}

	render(){
		const movieLists = this.state.movieList;
		const rows = [];
		let displaySuggestion;
		movieLists.slice(0,7).forEach((movie) => {
			rows.push(
				<li className="suggestedList">
					<Link to={`/movie/${movie.id}`}>{movie.title} </Link>
				</li>
			);
		});
		return(
			<div className="searchSeaction">
				<form className="searchBox" 
				id="form"
				onBlur={this.onBlur}
				onMouseDown={this.setIgnoreBlur} 
				onMouseUp={this.clearIgnoreBlur} 
				onMouseOut={this.clearIgnoreBlur} >
					<input className="searchBar"
					type="text"
					placeholder="Search Movie.." 
					//value={this.props.searchMovie} 
					onChange={this.handleFilter} 
					onFocus={this.onFocus}/>
					<span 
					className="suggestBox" 
					style={displaySuggestion}>
						<ul>{this.state.showSuggestion && rows}</ul>
					</span>
				</form>
			</div>
		);
	}

}