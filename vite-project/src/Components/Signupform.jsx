import React from 'react';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { Link } from 'react-router-dom';

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const Signupform = ({registerUser}) => (
    
  <Form
    name="basic"
    layout='vertical'
    className='form'
    initialValues={{ remember: true }}
    onFinish={registerUser}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >

    <h2 style={{textAlign: 'center', fontSize: 30}}>Create an Account</h2>

    <div className="name-field">
    <Form.Item
      className='item-label-fix'  
      label="First Name"
      name="firstname"
      rules={[{ required: true, message: 'Please input your First Name!' }]}
    >
      <Input   />
    </Form.Item>

    <Form.Item
      className='item-label-fix'   
      label="last name"
      name="LastName"
      rules={[{ required: true, message: 'Please input your Name!' }]}
    >
      <Input  />
    </Form.Item>
    </div>

    <Form.Item
      className='item-label-fix'  
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your Email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      className='item'  
      label="Create Password"
      name="createpassword"
      rules={[{ required: true, message: 'Please input your Create password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item className='createaccount-btn' label={null}>
      <Button type="primary" htmlType="submit">
        Create an account
      </Button>
    </Form.Item>

    <p style={{textAlign: 'center'}}>
      Already have an account? <Link style={{fontSize: '16px', marginLeft: '10px'}} to='/login' >Login</Link>
    </p>
  </Form>
);
export default Signupform;