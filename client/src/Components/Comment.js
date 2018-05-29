import React, { Component } from "react";

class Comment extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            editedText: '',
            editing: false,
            id: '',
            colorScheme: [],
            render: true
        }
    }

    /*
            EXAMPLES OF ALL LIFE CYCLE EVENTS IN REACT!!
     ( all examples are listed in order from willMount to willUnmount except render )
     */

    //mounting hooks
    componentWillMount(){
        /*
        we can insert custom logic into hooks to alter their behavior..
        in this case setting the state for our component before the component
        is mounted to the dom
         */
        /*
        when calling setState if the key in state does not exist react will create it
        react does not replace the entire state object with setState it is smart enough
        to look at the keys in setState and either edit the value if the key exists or
        create a new key. It will only update values for keys in setState. It will not remove
        any keys in the state object
         */

        this.setState({
            text: this.props.text || 'no message provided',
            id: this.props.id,
            editing: this.props.editing,
            colorScheme: this.props.colorScheme
        });

        console.log("Creating Comment... component will mount");
    }

    componentDidMount(){
        /*
        this hook will fire once the component is mounted to the dom
         */
        console.log("comment was created... component did mount", this.state)
    }

    //updating hooks
    componentWillReceiveProps(newProps){
        /*
        this hook will fire as soon as the component's props change values
        this hook allows us to insert a parameter that react will then inject
        the new props into as an argument.
        This makes it as easy to set the new state from the new props as in
        the code below!
         */
        this.setState(newProps);
        console.log("Component will receive props: changing color scheme or asking permission to change..")
    }

    shouldComponentUpdate(props, state) {
        /*
        It reads as a question because that is it's behavior! shouldComponentUpdate
        returns a boolean ( true will allow component to update and false will not)
        p.s. there are two parameters we can set for react to inject values into
        props and state
         */
        console.log("To update or not update? That is the question..");
        return true
    }

    componentWillUpdate(props, state){
        /*
        this hook will fire right before a component updates
        p.s. there are two parameters we can set for react to inject values into
        props and state
         */
        console.log('updating comment...', state)
    }

    componentDidUpdate(props, state){
        /*
        this hook will fire once a component updates
        there are two parameters we can set for react to inject values into
        props and state
         */
        console.log('component did update');
    }

    //unmounting hook
    componentWillUnmount(){
        /*
        this will fire right before the component is removed from the dom
         */
        console.log("Component will unmount: Removing Comment.. ")
    };

    turnOnEditing = event => {
        event.preventDefault();
        return this.setState({
            editing: true
        })
    };

    handleEditing = event => {
        event.preventDefault();
        return this.setState({
            editedText: event.target.value
        })
    };

    cancelEditing = event => {
        event.preventDefault();
        return this.setState({
            editing: false,
            editedText: ''
        })
    };

    saveChanges = event => {
        event.preventDefault();
        console.log(this.state.id);
        return this.props.edit(this.state.id, this.state.editedText)
    };

    destroy = event => {
        event.preventDefault();
        return this.props.destroy(this.state.id);
    };

    renderNormal = () => {
        return (
            <form style={
                {backgroundColor: this.state.colorScheme[0], border: `10px solid ${this.state.colorScheme[1]}`, width: '300px', margin: '30px', borderRadius: '15px'}}>
                <h2 style={{color: this.state.colorScheme[2]}}>{this.state.text}</h2>
                <button style={{margin: '5px'}} onClick={this.turnOnEditing} className="btn btn-info">Edit</button>
                <button style={{margin: '5px'}} onClick={this.destroy} className="btn btn-danger">Destroy</button>
            </form>
        )
    };

    renderEditing = () => {
        return (
            <form style={{backgroundColor: this.state.colorScheme[0], border: `10px solid ${this.state.colorScheme[1]}`, width: '300px', margin: '30px', borderRadius: '15px'}}>
                <textarea style={{marginTop: '5px'}} onChange={this.handleEditing} type="text" placeholder={this.state.text}/>
                <br/>
                <button style={{margin: '5px'}} onClick={this.saveChanges} className="btn btn-success">Save</button>
                <button style={{margin: '5px'}} onClick={this.cancelEditing} className="btn btn-danger">Cancel</button>
            </form>
        )
    };

    render(){
        console.log("rendering");
        return (
            <div>
                {this.state.editing ? this.renderEditing() : this.renderNormal()}
            </div>
        )
    }
}

export default Comment