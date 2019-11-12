import React from 'react';

class GoogleAuth extends React.Component{

	state = { isSignedIn: null};

	componentDidMount(){
		window.gapi.load('client:auth2',()=>{
			window.gapi.client.init({
				clientId:'408823570863-pn99bn2vc46t3sltr787lhp0pfubntrb.apps.googleusercontent.com',
				scope:'email'
			}).then(()=>{
				this.auth=window.gapi.auth2.getAuthInstance();
				this.setState({isSignedIn: this.auth.isSignedIn.get()})
				this.auth.isSignedIn.listen(this.onAuthChange);
			});
		});
	}
	onAuthChange=()=>{
		this.setState({isSignedIn: this.authisSignedIn.get()});
	}
	onSignInClick=()=>{
		this.auth.signIn();
	};
	onSignOutClick=()=>{
		this.auth.signOut();
	};
	renderAuthButton(){
		if(this.state.isSignedIn === null){
			return null;
		}else if(this.state.isSignedIn){
			return(
				<button onClick={this.onSignOutClick} className="ui red google button">
					<i className="google icon"/>
					Sign Out
				</button>
			);
		}else{
			return(
				<button onClick={this.onSignInClick} className="ui red google button">
					<i className ="goole icon"/>
					Sign In with Google
				</button>
			);
		}
	}
	render(){
		return(
			<div>{this.renderAuthButton()}</div>
		);
	};
};

export default GoogleAuth;