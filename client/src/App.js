import React, { Component } from 'react';
import Projects from './Components/projects'
import './App.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            projects: []
        }
    }

    componentWillMount(){
        this.setState({projects: [
            {
                title: 'Business Website',
                category: 'web design',
            },
            {
                title: 'Social app',
                category: 'mobile Development',
            },
            {
                title: 'E-commerce shopping cart',
                category: 'web development',
            }
        ]});
    }

    render() {
        return (
        <div className="App">
            My App
            <Projects projects={this.state.projects}/>
        </div>
        );
    }
}

export default App;
