import React, { Component } from 'react';
import RequestService from "./Utils/RequestService";
import logo from './logo.svg';

import './App.css';

import Comment from "./Components/Comment";
import ColorScheme from "./Components/ColorScheme";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            newComment: '',
            colorScheme: ['#222222', '#5ED2F2', '#FFF']
        };

    }

    componentWillMount(){
        return this.getComments()
    }

    getComments = async () => {
        const comments = await RequestService.get();
        return await this.setState({ comments: comments});
    };

    createComment = async () => {
        const comment = await RequestService.create(this.state.newComment);
        return await this.setState({
            comments: this.state.comments.concat(comment)
        })
    };

    editComment = async (id, text) => {
        await RequestService.update(id, text);
        return await this.setState({
            comments: this.state.comments.map( comment => {
                if (comment._id === id){
                    comment.message = text;
                    return comment
                }
                return comment
            })
        });
    };

    destroyComment = async id => {
        await this.setState({
            comments: this.state.comments.filter( comment => comment._id !== id)
        });
        return await RequestService.destroy(id);
    };

    handleNewCommentChange = event => {
        return this.setState({
            newComment: event.target.value
        })
    };

    selectNewColorScheme = newColorScheme => {
        return this.setState({
            colorScheme: newColorScheme
        })
    };

    eachComment = (comment, i) => {
        return (
            <Comment
                key={i}
                text={comment.message}
                id={comment._id}
                editing={false}
                colorScheme={this.state.colorScheme}
                destroy={this.destroyComment}
                edit={this.editComment}
            />
        )
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Let's Talk About STATE, PROPS & LIFE CYCLES</h1>
                </header>

                <h3 style={{textAlign: 'right', marginRight: '200px'}}>Select A Color Scheme!</h3>
                <ColorScheme colors={['#222222', '#5ED2F2', '#FFF']} onSelected={this.selectNewColorScheme}/>
                <ColorScheme colors={['#05396B', '#5CDB94', '#EDF5E0']} onSelected={this.selectNewColorScheme}/>
                <ColorScheme colors={['#7395AE', '#B0A295', '#5D5C61']} onSelected={this.selectNewColorScheme}/>
                <ColorScheme colors={['#4F1B1D', '#ADADAD', '#FFFFFF']} onSelected={this.selectNewColorScheme}/>

                <div className="input-group mb-3" style={{width: '40%', margin: '30px'}}>

                    <div className="input-group-prepend">
                        <button onClick={this.createComment} className="btn btn-outline-secondary" type="button">Add a new Comment</button>
                    </div>

                    <input onChange={this.handleNewCommentChange} type="text" className="form-control" />

                </div>
                {this.state.comments.map(this.eachComment)}
            </div>
        );
    }
}

export default App;
