import React, {PureComponent} from 'react'
import style from './style.css'
import {Tabs} from 'antd'
import LoginForm from './loginForm'
import RegisterForm from "./registerForm"
const TabPane = Tabs.TabPane
 class Login extends PureComponent {
    constructor(props) {
        super(props);
    }


    render() {
        const {login,register} = this.props;
        return (
            <Tabs defaultActiveKey="1"  className={style.container}>
                <TabPane tab="登录" key="1">
                    <LoginForm login={login}/>
                </TabPane>
                <TabPane tab="注册" key="2">
                    <RegisterForm register={register}/>
                </TabPane>
            </Tabs>
        )
    }
}

export default Login
