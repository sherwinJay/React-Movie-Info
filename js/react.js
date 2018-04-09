//SearchBar Child
class Result extends React.Component{
	constructor(props){
		super(props);
		this.state={
			movieInfo: []
		}
	}
	render(){
		return(
			<a href="#" 
			className="suggestedList"
			onClick={this.alertClick.bind(this)}>
					{this.props.title}</a>
			);
	}
	alertClick(e){
			let title = this.props.passMovieList.title;
			let body = this.props.passMovieList.overview;
			let id = this.props.passMovieList.id;
			let background = this.props.passMovieList.backdrop_path;
			let poster = this.props.passMovieList.poster_path;
			this.props.onSubmit(title, body, id, background, poster);
			//console.log(this.props.passMovieList);
			//document.getElementById("form").submit();
			e.preventDefault();
	}
}
class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.state={
			movies: '',
			showSuggestion: false
		}
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.setIgnoreBlur = this.setIgnoreBlur.bind(this);
    	this.clearIgnoreBlur = this.clearIgnoreBlur.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleFilterChange(e){
    	this.props.onFilterChange(e.target.value);
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
    handleSubmit(e){
    	alert("submit");
    	e.preventDefault();

    }
	render(){
		console.log(this.state.movies)
		const movieLists = this.props.movieList;
		//console.log(movieLists.length);
		//console.log(movieLists);
		const rows = [];
		let displaySuggestion;
		if(movieLists.length < 1){
			displaySuggestion = {
				display: 'none'
			}
		}
		movieLists.slice(0,7).forEach((movie, index) => {
			rows.push(
					<li data-index={index}>
						<Result title={movie.title} 
								key={movie.id}
								passMovieList={movie}
								onSubmit={this.props.onSubmit}
						/>
					</li>
				);
		});
		return(
			<div className="searchSeaction">
				<form className="searchBox" id="form"
						onBlur={this.onBlur}
						onMouseDown={this.setIgnoreBlur} 
						onMouseUp={this.clearIgnoreBlur} 
						onMouseOut={this.clearIgnoreBlur} 
						>
					<input className="searchBar"
					type="text"
					placeholder="Search Movie.." 
					//value={this.props.searchMovie} 
					onChange={this.handleFilterChange} 
					onFocus={this.onFocus}
					/>
					<span className="suggestBox" 
							style={displaySuggestion}>
						<ul>{this.state.showSuggestion && rows}</ul>
					</span>
				</form>
			</div>
			);
	}

}

//MovieCategory Child
class Movies extends React.Component{
	render(){
		let bodyText = this.props.overview.substr(0, 120);
		bodyText = bodyText.substr(0, bodyText.lastIndexOf(" ")).concat("...");
		
		return(
				<div className="movieBoxInfo">
					<div className="infoWrapper">
						<p className="boxTitle">{this.props.title}</p>
						<p className="boxRating">Rating: {this.props.rating}</p>
						<p className="boxOverview">{bodyText}</p>
					</div>
				</div>
			);
	}
}

class MovieCategory extends React.Component{
constructor(props){
		super(props);
		this.state={
			movieList: []
		}
	}
  componentWillMount(){
		this.ajaxCall();
	}
	render(){
		let resultLink = this.state.movieList.slice(0,5);
		const upcomingMovieList = resultLink.map((movies) => {
			const backgroundImage = {
				backgroundImage: `url(http://image.tmdb.org/t/p/w300/${movies.backdrop_path})`,
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				width: "220px",
				height: "220px"	
			};
			return(
			<li className="movieCategoryList">
				<a href="#" className="moviesBox" style={backgroundImage} >
				<Movies 
					title={movies.title}
					overview={movies.overview}
					rating={movies.vote_average} />

				</a>
			</li>
			);
		});
		return(
				<div>
					<ul className="cfix">{upcomingMovieList}</ul>
				</div>
			);
	}
  
  ajaxCall(){
  		const categoryLink = this.props.url; 
  		const apiKey = "ff9d34ddaaebff2b1a6100d54346c1a7";
		let movieLink = "https://api.themoviedb.org/3/movie/" 
						+ categoryLink + "?api_key=" + apiKey + "&language=en-US&page=1";
		console.log(movieLink);
		fetch(movieLink).
		then((Response) => Response.json()).
		then((findmovie) => {
			this.setState({movieList: findmovie.results});
		});
	}
  
}

/*******************************************
*******************TESTING******************
*******************************************/
class ShowInfo extends React.Component{
	render(){
		return(
			<div className='movieInfoWrapper cfix'>
			<img className="moviePoster" src={`http://image.tmdb.org/t/p/w342/${this.props.poster}` } />
			<div>
				<h2>{this.props.title}</h2>
				<p>{this.props.body}</p>
			</div>
			</div>
		);
	}
}
class MovieInfo extends React.Component{
	render(){
		const movieItems = this.props.movieList.map((movie) => {
				const backgroundImage = {
				backgroundImage: `url(http://image.tmdb.org/t/p/original/${movie.background})`,
				backgroundSize: 'cover',
				opacity: "0.5" 
			};
				return(
			//put comment here
			<div comment-list style={backgroundImage}>
				<ShowInfo
					title={movie.title}
            		body={movie.body}
            		poster={movie.poster}/>
			</div>
			);
		});
		return(
			<div>
				{movieItems}
			</div>
		);
	}

}
/*******************************************
********************************************
*******************************************/


class MovieApp extends React.Component{
	constructor(props){
		super(props);
		this.state={
			query: '',
			movieList: [],
			movieInformation: []
		}
		this.handleFilter = this.handleFilter.bind(this);
	}
	componentWillMount(){
		this.fetchData();
	}
	render(){
		//console.log(this.state.query);
		let movieLists = this.state.movieList;
		console.log(movieLists);
		console.log(this.state.movieInformation);
		return(
			<div>
				<header className="mainHeader">
					<div className="centerWrapper cfix">
				        <h1 className="logo">MovieInfo</h1>
				        <SearchBar 
				          onFilterChange={this.handleFilter} 
				          searchMovie={this.state.query}
				          movieList={this.state.movieList}
				          onSubmit={this.getMovie.bind(this)}
				        />
			        </div>
		        </header>
		        <div className="centerWrapper">
					<h2>Upcoming</h2>
				    <MovieCategory url="upcoming"  />
					<h2>Popular</h2>
					<MovieCategory url="popular"  />		
					<h2>Top Rated</h2>
					<MovieCategory url="top_rated"  />
				</div>
				<MovieInfo movieList={this.state.movieInformation}  />
          	</div>
          
			);
	}

	getMovie(title, body, id, background, poster){
		const movie = {
			title: title,
			body: body,
			id: id,
			background: background,
			poster: poster 
		}
		console.log(id);
		if(this.state.movieInformation.length < 1){
			this.setState((state) => ({
				movieInformation: state.movieInformation.concat([movie])
			}));
		}else{
			const updateMovieInformation = this.state.movieInformation.map((obj, index) => {
				return obj.id === movie.id ? obj : movie;
			});
			this.setState({movieInformation: updateMovieInformation});
		}		
	}

	fetchData(){
		const apiKey = "ff9d34ddaaebff2b1a6100d54346c1a7";
		let movieLink = "https://api.themoviedb.org/3/search/movie?api_key=" + 
						apiKey + "&language=en-US&query=" + 
						this.state.query + "&page=1&include_adult=false";
		$.ajax({
			method: 'GET',
			url: movieLink,
			success: (movieList) => {
				this.setState({movieList: movieList.results});
			}
		});
		/**fetch(movieLink).
		then((Response) => Response.json()).
		then((findmovie) => {
			this.setState({movieList: findmovie.results});
		});**/
	}
	handleFilter(query){
		this.setState({
			query: query
		}, () => {
	    if (this.state.query.length > 0) {
	        return  this.fetchData();
	    }else if(!this.state.query){
	      	return;
	    }
    });
	
	}
}
ReactDOM.render(<MovieApp  />, document.getElementById("main"), console.timeEnd("app"));
