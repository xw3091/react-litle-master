import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import store  from '../redux'
import {add, deleteItem} from '../redux/action'

class A extends Component{
    constructor(props){
        super(props)
        this.state = {
            arr: [],
            unsubscribe: ''
        }
    }

    componentDidMount(){
        this.setState({
            arr: store.getState()
        })

        let unsubscribe = store.subscribe( () => {
            // console.log(store.getState())
            this.setState({
                arr: store.getState()
            })

        } )
        this.setState({unsubscribe})
    }

    componentWillUnmount(){
        this.state.unsubscribe()
    }

    foo(){
        store.dispatch(add(this.refs.ipt.value))
        this.refs.ipt.value=''
    }
    
    del(i) {
        store.dispatch(deleteItem(i))
    }

    render() {
        return(
            <div>
                <h2>I'm a</h2>
                <Link to='/login'>去登陆</Link><br/>
                <Link to='/register'>去注册</Link><br />
                <Link to='/redux'>测试</Link><br />
                <input type='text' ref='ipt' />
                <button onClick={this.foo.bind(this)}>add</button>
                <ul>
                    {this.state.arr.map((item, i) => (<li onClick={this.del.bind(this, i)} key={i}>{item}</li>))}
                </ul>
            </div>
        )
    }
}

export default A