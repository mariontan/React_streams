import _ from 'lodash'
import React from 'react';
import {connect} from 'react-redux'
import {fetchStream,editStream} from '../../actions'
import StreamForm from './StreamForm';

class StreamEdit extends React.Component{
	componentDidMount(){
		this.props.fetchStream(this.props.match.params.id)
	}
	onSubmit=(fromValues)=>{
		this.props.editStream(this.props.match.params.id, fromValues)
	}
	render(){
		//check if this.ptops.stream is null
		if(!this.props.stream){
			return <div>Loading...</div>
		}
		// redux form passes the initialValues props to StreamForm. StreamForm has the fields with the same title
		//this.props.stream has the title
		return (
			<div>
				<h3>Edit a stream</h3>
				<StreamForm initialValues={_.pick(this.props.stream,'title','description')} onSubmit={this.onSubmit}/>
			</div>
		);}
};

//ownProps is the props inside the component
const mapStateToProps=(state,ownProps)=>{
	return{stream: state.streams[ownProps.match.params.id]};
};

export default connect(mapStateToProps,{fetchStream,editStream})(StreamEdit);
