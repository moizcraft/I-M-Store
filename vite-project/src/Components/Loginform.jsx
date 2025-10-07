import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import '../Style/Login.css'
import { Link } from 'react-router-dom';

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const Loginform = ({loginUser}) => (
  <div className="login-page">
    <Form
    layout='vertical'
    className='form'
    name="basic"
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={loginUser}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <h2 style={{textAlign: 'center', fontSize: 30}}>Login</h2>

    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your Email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item label={null} className='login-btn'>
      <Button  type="primary" htmlType="submit">
        Login
      </Button>
    </Form.Item>

    <p style={{textAlign: 'center'}}>
      Don't have an account? <Link style={{fontSize: '16px', marginLeft: '10px'}} to='/signup' >Signup</Link>
    </p>
    </Form>
  </div>
);
export default Loginform;