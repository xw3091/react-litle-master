import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class D extends Component {
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        const { PayIncrease, PayDecrease } = this.props
        return (
            <div className="App">
                <h2>当前薪资为: {this.props.target}</h2>
                <h3>{this.props.text}</h3>
                <button onClick={PayIncrease}>升职加薪</button>
                <button onClick={PayDecrease}>迟到罚款</button>
                <div>
                    <Link to='/'>go a</Link>
                </div>
            </div>
        )
    }
}
//需要渲染什么数据
function mapStateToProps(state) {
    return {
        target: state[0].target,
        text: state[0].text
    }
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
    return {
        PayIncrease: () => dispatch({ type: '涨工资', text: '涨工资: 买买买' }),
        PayDecrease: () => dispatch({ type: '扣工资', text: '扣工资: 省省省' })
    }
}

export default D = connect(mapStateToProps, mapDispatchToProps)(D)

