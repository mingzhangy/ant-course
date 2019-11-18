import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

class BasicLayout extends PureComponent {
  render() {
    return (
      <Layout>
        <Sider width={256} style={{minHeight: '100vh', color: 'white'}}>
          <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/helloworld">
                <Icon type="pie-chart"></Icon>
                <span>HelloWorld</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="dashboard"></Icon><span>Dashboard</span></span>}
            >
              <Menu.Item key="2">
                <Link to="/dashboard/analysis">分析页</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/dashboard/monitor">监控页</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/dashboard/workplace">工作页</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="5">
              <Link to="/puzzlecards">
                <Icon type="pie-chart"></Icon>
                <span>Puzzlecards</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/list">
                <Icon type="pie-chart"></Icon>
                <span>List</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', textAlign: 'center', padding: 0}}>Header</Header>
          <Content style={{margin: '24px 16px 0'}}>
            <div style={{background: '#fff', padding: '24px', minHeight: 360}}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default BasicLayout;