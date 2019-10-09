/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Form, Icon, Input, Button } from 'antd'; // Checkbox
import { PwaInstaller } from '../widget';
import { connectAlita } from 'redux-alita';

const FormItem = Form.Item;

class Login extends React.Component {
    componentDidMount() {
        const { setAlitaState } = this.props;
        setAlitaState({ stateName: 'auth', data: null });
        if (localStorage) {
            // setFieldsValue方法动态设置input值
            this.props.form.setFieldsValue({ userName: localStorage.getItem('userName') })
            this.props.form.setFieldsValue({ password: localStorage.getItem('password') })
        }
    }
    componentDidUpdate(prevProps) { // React 16.3+弃用componentWillReceiveProps
        const { auth: nextAuth = {}, history } = this.props;
        // const { history } = this.props;
        if (nextAuth.data && nextAuth.data.uid) { // 判断是否登陆
            localStorage.setItem('user', JSON.stringify(nextAuth.data));
            history.push('/');
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        if (value) {
            callback()
        } else {
            callback('请输入密码')
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) { 
                const { setAlitaState } = this.props;
                if (values.userName === 'admin' && values.password === '123456') {
                    setAlitaState({ funcName: 'admin', stateName: 'auth' })
                    localStorage.setItem('userName', 'admin')
                    localStorage.setItem('password', '123456')
                }
                if (values.userName === 'guest' && values.password === '123456') {
                    setAlitaState({ funcName: 'guest', stateName: 'auth' })
                    localStorage.setItem('userName', 'guest')
                    localStorage.setItem('password', '123456')
                }
            }
        });
    };
    // gitHub = () => {
    //     window.location.href = 'https://github.com/login/oauth/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin';
    // };
    render() {
        const { getFieldDecorator } = this.props.form;
        console.log(getFieldDecorator)
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>后台管理系统</span>
                        <PwaInstaller />
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="管理员admin, 游客guest" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ validator: this.validateToNextPassword }]
                            })(
                                <Input.Password prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="密码, 123456" />
                            )}
                        </FormItem>
                        <FormItem>
                            {/* {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )} */}
                            {/* <span className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</span> */}
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            {/* <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span >或 现在就去注册!</span>
                                <span onClick={this.gitHub} ><Icon type="github" />(第三方登录)</span>
                            </p> */}
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default connectAlita(['auth'])(Form.create()(Login));