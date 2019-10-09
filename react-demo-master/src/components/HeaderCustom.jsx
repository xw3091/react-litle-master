/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import screenfull from 'screenfull';
import avater from '../style/imgs/b1.jpg';
import SiderCustom from './SiderCustom';
import { Menu, Icon, Layout, Badge, Popover, Button, List } from 'antd';
// import { gitOauthToken, gitOauthInfo } from '../axios';
// import { queryString } from '../utils';
import { withRouter } from 'react-router-dom';
import { PwaInstaller } from './widget';
import { connectAlita } from 'redux-alita';
import { GMTToStr } from '../utils'
const { Header } = Layout;
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
    state = {
        user: '',
        visible: false,
        isRead: false,
        isRemove: false
    };
    componentDidMount() {
        // const QueryString = queryString();
        // const _user = JSON.parse(localStorage.getItem('user')) || '测试';
        // if (!_user && QueryString.hasOwnProperty('code')) {
        //     gitOauthToken(QueryString.code).then(res => {
        //         gitOauthInfo(res.access_token).then(info => {
        //             this.setState({
        //                 user: info
        //             });
        //             localStorage.setItem('user', JSON.stringify(info));
        //         });
        //     });
        // } else {
        //     this.setState({
        //         user: _user
        //     });
        // }
    };
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }

    };
    menuClick = e => {
        console.log(e);
        e.key === 'logout' && this.logOut();
    }
    logOut = () => {
        localStorage.removeItem('user');
        this.props.history.push('/login')
    }
    goHome = () => {
        this.props.history.push('/')
    }
    allRead = () => {
        this.setState({
            isRead: true
        })
    }
    remove = () => {
        this.setState({
            isRemove: true
        })
    }
    popoverHide = () => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };
    render() {
        const { responsive = { data: {} }, path } = this.props;
        const userCentreContent = (
            <div>
                <p style={{ cursor: 'pointer' }}><span onClick={this.goHome}>返回首页</span></p>
                <hr />
                <p style={{ cursor: 'pointer' }}><span onClick={this.logOut}>退出登录</span></p>
            </div>
        )
        const data = [
            <a style={this.state.isRead === true ? { color: 'gray' } : {}} href="/index#/app/ui/buttons">来自菜单 [UI] 的消息</a>,
            <a style={this.state.isRead === true ? { color: 'gray' } : {}} href="/index#/app/animation/basicAnimations">来自菜单 [动画] 的消息</a>,
            <a style={this.state.isRead === true ? { color: 'gray' } : {}} href="/index#/app/table/basicTable">来自菜单 [表格] 的消息</a>,
            <a style={this.state.isRead === true ? { color: 'gray' } : {}} href="/index#/app/form/basicForm">来自菜单 [表单] 的消息</a>,
            <a style={this.state.isRead === true ? { color: 'gray' } : {}} href="/index#/app/chart/echarts">来自菜单 [图表] 的消息</a>
        ]
        const newDate = new Date()
        const notificationContent = (
            <div>
                <List
                    size="small"
                    header={<div>{GMTToStr(newDate)}</div>}
                    footer={
                        <div>
                            <Button onClick={this.allRead}>全部已读</Button>
                            <Button onClick={this.remove}>清空消息</Button>
                        </div>
                    }
                    dataSource={data}
                    renderItem={item => <List.Item>{this.state.isRemove === false ? item : ''}</List.Item>}
                />
            </div>
        )
        return (
            <Header className="custom-theme header" >
                {
                    responsive.data.isMobile ? (
                        <Popover content={<SiderCustom path={path} popoverHide={this.popoverHide} />} trigger="click" placement="bottomLeft" visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
                            <Icon type="bars" className="header__trigger custom-trigger" />
                        </Popover>
                    ) : (
                        <Icon
                            className="header__trigger custom-trigger"
                            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.props.toggle}
                        />
                    )
                }
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    <Menu.Item key="pwa">
                        <PwaInstaller />
                    </Menu.Item>
                    <Menu.Item key="full" onClick={this.screenFull} >
                        <Icon type="arrows-alt" onClick={this.screenFull} />
                    </Menu.Item>
                    <Menu.Item key="notification">
                        <Popover placement="bottomRight" content={notificationContent} trigger="hover">
                            <Button style={{ background: 'black', color: 'white', border: 'none'}}>
                                <Badge dot={!this.state.isRead}>
                                    <Icon type="bell" />
                                </Badge>
                            </Button>
                        </Popover>
                    </Menu.Item>
                    <Menu.Item key="userCentre">
                        <Popover placement="bottom" content={userCentreContent} trigger="hover">
                            <span className="avatar"><img src={avater} alt="头像" /></span>
                        </Popover>
                    </Menu.Item>
                    {/* <Menu.Item key="1">
                        <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item> */}
                    {/* <SubMenu title={<span className="avatar"><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - {this.props.user.userName}</Menu.Item>
                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                            <Menu.Item key="logout"><span onClick={this.logOut}>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu> */}
                </Menu>
            </Header>
        )
    }
}

export default withRouter(connectAlita(['responsive'])(HeaderCustom));
