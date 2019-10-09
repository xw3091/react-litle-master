import React, {Component} from 'react';

import {Link} from 'react-router-dom';

class B extends Component{
    constructor(props){
        super(props)
        this.state = {
            str: 'react 好难'
        }
    }
    foo() {
        this.setState({
            str: this.state.str === 'react 好难' ? 'vue 简单' : 'react 好难'
        })
    }
    render(){
        return(
            <div>
                <h2>I'm b , {this.state.str}</h2>
                <button onClick={this.foo.bind(this)}>{this.state.str}</button>
                <div>
                    <Link to='/'>go a</Link>
                </div>
            </div>
        )
    }
}

export default B