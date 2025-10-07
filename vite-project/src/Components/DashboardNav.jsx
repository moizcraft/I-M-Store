import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const DashboardNav = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);

  const Navigate = useNavigate()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{height: '100vh'}} >
        <div className="demo-logo-vertical"  />
        <Menu
        onClick={(data)=> Navigate(data.key)}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '/profile',
              icon: <UserOutlined />,
              label: 'Your Profile',
            },
            
            {
              key: '/upload',
              icon: <UploadOutlined />,
              label: 'Upload',
            },

            {
              key: '/viewpost',
              icon: <VideoCameraOutlined />,
              label: 'View Post',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
                <Link to='/home' style={{textDecoration: 'none', fontSize: '20px', color: 'black', marginLeft: '450px'}}>Continue Shopping</Link>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashboardNav;