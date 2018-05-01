import React from 'react';
import {
	Link
  } from 'react-router-dom';	
import SearchBar from './searchMovie.js';

export default class AppHeader extends React.Component{
	render(){
		return(
			<header className="mainHeader">
				<div className="centerWrapper cfix">
			        <Link to="/React-Movie-Info" ><h1 className="logo">MovieInfo</h1></Link>
					<SearchBar />
		        </div>
		    </header>
		);
	}
	myCallback(dataFromChild){
    	this.props.onFilterChange(dataFromChild);
	}
}

