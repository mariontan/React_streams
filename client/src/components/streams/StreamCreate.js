import React from 'react';
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form';
import component from 'react-redux';
import {createStream} from '../../actions'

class StreamCreate extends React.Component{
	renderError({error,touched}){
		if(touched && error){
			return(
				<div className-="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}
	renderInput=({input,label, meta})=>{
		const className= `filed${meta.error && meta.touched ? 'error':''}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off"/>
				{this.renderError(meta)}
			</div>
		);
	}
	onSubmit=(formValues)=>{
		this.props.createStream(formValues);
	}
	render(){
		return(
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name ="title" component={this.renderInput} label="Enter Titile"/>
				<Field name ="description"component={this.renderInput} label="Enter Description"/>
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}
//gets called each time the user interacts with the form
const validate =(formValues)=>{
	const errors ={};

	if(!formValues.title){
		errors.title = 'You must enter a title';
	}
	if(!formValues.description){
		errors.description='enter description'
	}
	return errors;
};


const formWrapped =  reduxForm({
	form: 'StreamCreate',
	validate: validate
})(StreamCreate);

export default connect(null,{createStream})(formWrapped);