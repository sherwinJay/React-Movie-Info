
/**	class TestBox extends React.Component{
				
				constructor(props) {
					super(props);

					this.state = {
						showComments: false,
						comments: []
					};

				}
				componentWillMount(){
					this._fetchComments();
				}

				render() {

					const comments = this._getComments();
					let commentNodes;
					let buttonText = "Show Comments";

					if( this.state.showComments ){
						buttonText = "Hide Comments";
					
						commentNodes = <div className="comment-list">{comments}</div>
					}

					return(
						<div className="comment-box">
								<h2>Join the Discussion</h2>
							<CommentForm addComment={this._addComment.bind(this)} />
							
							<button onClick={this._handleClick.bind(this)}>{buttonText}</button>
							<h4>{this._getCommentTitle(comments.length)}</h4>
							{commentNodes}

						</div>
					);
				}
				_getComments() {
				    return this.state.comments.map((comment) => {
				      return <Comment
				               id={comment.id}
				               author={comment.author}
				               body={comment.body}
				               key={comment.id} />
				    });
				  }

				_getCommentTitle(commentNum){
					if(commentNum === 0){
						return 'No Comments';
					}else if(commentNum === 1){
						return '1 Comment';
					}else{
					return `${commentNum} Comments`;
					}
				} 

				_handleClick(){

					this.setState({
						showComments: !this.state.showComments
					});

				}
				
				_addComment(author, body){
					const comment = {
						id: this.state.comments.length + 1,
						author: author,
						body: body
					};
					this.setState({ comments: this.state.comments.concat([comment]) });
				}
				_fetchComments(){

					$.ajax({
						method: 'GET',
						url: 'comments.json',
						success: (comments) => {
							this.setState({comments})
						}

					});
				}
			}

					

			
			class CommentForm extends React.Component{
				render(){
					return(
						<form onSubmit={this._handleSubmit.bind(this)}>
							<div className="formFields">
								<input placeholder="Name" ref={(input) => this._author = input} required />
								<textarea placeholder="Comments" ref={(textarea) => this._body = textarea} required></textarea>
							</div>
							<div className="formAction"> 
								<button type="submit">Post Comment</button>
							</div>
						</form>
						
					);


				}

				_handleSubmit(e){
					e.preventDefault();

					let author = this._author;
					let body = this._body;

					this.props.addComment(author.value, body.value);
				}

			}

			class Comments extends React.Component{
				render(){
					return(
					<div className="comment">
					<p className="name"> {this.props.author} </p>
					<p className="body"> {this.props.body} </p>
					</div>
					);
				}
			}	


			ReactDOM.render(<TestBox />, document.getElementById("main"));**/




//COPY
			class TestBox extends React.Component{
				
				constructor() {
					super();

					this.state = {
						showComments: false,
						comments: []
					};

				}
				componentWillMount(){
					this._fetchComments();
				}

				render() {

					const comments = this._getComments();
					let commentNodes;
					let buttonText = "Show Comments";

					if( this.state.showComments ){
						buttonText = "Hide Comments";
					
						commentNodes = <div className="comment-list">{comments}</div>
					}

					return(
						<div className="comment-box">
							<CommentForm addComment={this._addComment.bind(this)} />
							<h2>Join the Discussion</h2>
							<button onClick={this._handleClick.bind(this)}>{buttonText}</button>
							<h4>{this._getCommentTitle(comments.length)}</h4>
							{commentNodes}

						</div>
					);
				}
				_getComments(){
						
					return this.state.comments.map( (comment) => {
						return( 
						<Comments 
						author={comment.author} 
						body={comment.body} 
						key={comment.id} />

						);
					});
				}

				_getCommentTitle(commentNum){
					if(commentNum === 0){
						return 'No Comments';
					}else if(commentNum === 1){
						return '1 Comment';
					}else{
					return `${commentNum} Comments`;
					}
				} 

				_handleClick(){

					this.setState({
						showComments: !this.state.showComments
					});

				}
				_fetchComments(){

					$.ajax({
						method: 'GET',
						url: 'comments.json',
						header: {"Access-Control-Request-Method" : "*"},
						success: (comments) => {
							this.setState({comments})
						}

					});
				}
				
				/**_addComment(author, body){
					const comment = {
						id: this.state.comments.length + 1,
						author,
						body
					};
					this.setState({ comments: this.state.comments.concat([comment])}, function(){ console.log(this.state.comments); }));
				}**/
				_addComment(author, body){
					const comment = {
						author,
						body
					};
					$.ajax({
						method: 'POST',
						url: '/api/comments',
						data: comment,
						header: {"Access-Control-Request-Method" : "*"},
						success: (newComment) => {
							this.setState({ comments: this.state.comments.concat([newComment])},  function(){ console.log(this.state.comments); })
						}

					});
					/**$.post( 'comments.json', {comment} ).success( newComment => {
							this.setState({ comments: this.state.comments.concat([newComment])},  function(){ console.log(this.state.comments); });
						});**/
				}
				
			}


						

			
			class CommentForm extends React.Component{
				render(){
					return(
						<form onSubmit={this._handleSubmit.bind(this)}>
							<div className="formFields">
								<input placeholder="Name" ref={(input) => this._author = input} required />
								<textarea placeholder="Comments" ref={(textarea) => this._body = textarea} required></textarea>
							</div>
							<div className="formAction"> 
								<button type="submit">Post Comment</button>
							</div>
						</form>
						
					);


				}

				_handleSubmit(e){
					e.preventDefault();

					let author = this._author;
					let body = this._body;

					this.props.addComment(author.value, body.value);
				}

			}

			class Comments extends React.Component{
				render(){
					return(
					<div className="comment">
					<p className="name"> {this.props.author} </p>
					<p className="body"> {this.props.body} </p>
					</div>
					);
				}
			}


			ReactDOM.render(<TestBox />, document.getElementById("main"));

