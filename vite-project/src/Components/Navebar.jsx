import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import{ Router, Link } from 'react-router-dom';
import '../Style/Navebar.css'
import { auth, signOut } from '../Services/firebase'
import { ShoppingCart, Plus, Minus, Trash2, Filter, ArrowRight } from "lucide-react";
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Logo from '../assets/Logo/Logo.png'
import { useCart } from '../Context/CartContext'
import { useState, useEffect, useRef } from 'react'


const StyledWrapper = styled.div`
  .group {
   display: flex;
   line-height: 28px;
   align-items: center;
   position: relative;
  width: 590px;
  }

  .input {
   width: 100%;
   height: 40px;
   line-height: 28px;
   padding: 0 1rem;
   padding-left: 2.5rem;
   outline: none;
   border: 1px solid rgba(150, 150, 150, 0.4);  /* soft silver border */
  border-radius: 8px;
    background: rgba(255, 255, 255, 0.6); 
     outline: none;
  color: #333;
  font-size: 15px;
  transition: all 0.3s ease;
  }

  .input::placeholder {
   color: rgba(80, 80, 80, 0.7);
  }

  .input:focus, input:hover {
   border-color: #3A506B;      /* matches your button color */
  box-shadow: 0 0 6px rgba(58, 80, 107, 0.4);
  background: rgba(255, 255, 255, 0.9);
  }

  .icon {
   position: absolute;
   left: 1rem;
   fill: #9e9ea7;
   width: 1rem;
   height: 1rem;
  }`;


function NavScrollExample() {
  const { items, getTotalItems, getTotalPrice, updateQuantity, removeFromCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const cartRef = useRef(null);

  // Debug logging
  console.log('Navbar - Cart items:', items);
  console.log('Navbar - Total items:', getTotalItems());

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter items by category
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  // Get unique categories from cart items
  const categories = ['all', ...new Set(items.map(item => item.category))];

     const logoutUser = () => {
      signOut(auth).then(() => {
        console.log('User logout')
  }).catch((error) => {
    // An error happened.
  });
    }
  

  return (
    <Navbar expand="lg" className="my-navebar">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="#" className='logo' ><img src={Logo} alt="Logo" /></Navbar.Brand>

        <div >
         <StyledWrapper>
      <div className="group">
        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" /></g></svg>
        <input placeholder="Search" type="search" className="input" />
      </div>
    </StyledWrapper>
        </div>

        <Nav className="d-flex align-items-center"style={{gap: '40px'}} navbarScroll>
          {/* <Link to="/home" style={{color: 'black', textDecoration: 'none', fontSize: '16px', color: '#eeeeee'}} >Home</Link> */}
          
          {/* Shopping Cart Dropdown */}
          <div ref={cartRef} style={{ position: 'relative' }}>
            <Button 
              variant="link" 
              onClick={() => setShowCart(!showCart)}
              style={{ position: 'relative', padding: '8px' }}
            >
              <ShoppingCart style={{color: '#333333'}} size={30} />
              {getTotalItems() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  backgroundColor: '#ff4444',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getTotalItems()}
                </span>
              )}
            </Button>
            
            {/* Cart Dropdown */}
            {showCart && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                minWidth: '350px',
                maxHeight: '400px',
                overflowY: 'auto',
                zIndex: 1000,
                marginTop: '8px'
              }}>
                <div style={{ padding: '16px' }}>
                  <h6 style={{ marginBottom: '16px', fontWeight: 'bold' }}>Shopping Cart</h6>
                  
                  {filteredItems.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666', margin: '20px 0' }}>
                      {items.length === 0 ? 'Your cart is empty' : 'No items in this category'}
                    </p>
                  ) : (
                    <>
                      {/* Category Filter */}
                      {categories.length > 1 && (
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Filter size={16} />
                            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Filter by Category:</span>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {categories.map((category) => (
                              <Button
                                key={category}
                                size="sm"
                                variant={selectedCategory === category ? 'primary' : 'outline-secondary'}
                                onClick={() => setSelectedCategory(category)}
                                style={{ 
                                  fontSize: '12px',
                                  textTransform: 'capitalize',
                                  backgroundColor: selectedCategory === category ? '#3A506B' : 'transparent',
                                  borderColor: selectedCategory === category ? '#3A506B' : '#ddd'
                                }}
                              >
                                {category === 'all' ? 'All' : category.replace("'s clothing", "")}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {filteredItems.map((item) => (
                        <div key={item.id} style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px 0',
                          borderBottom: '1px solid #eee'
                        }}>
                          <img 
                            src={item.image} 
                            alt={item.title}
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                              borderRadius: '4px',
                              marginRight: '12px'
                            }}
                          />
                          <div style={{ flex: 1, marginRight: '12px' }}>
                            <h6 style={{ fontSize: '14px', margin: '0 0 4px 0', fontWeight: 'bold' }}>
                              {item.title.length > 30 ? item.title.substring(0, 30) + '...' : item.title}
                            </h6>
                            <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>
                              ${item.price}
                            </p>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              style={{ padding: '2px 6px' }}
                            >
                              <Minus size={12} />
                            </Button>
                            <span style={{ minWidth: '20px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              style={{ padding: '2px 6px' }}
                            >
                              <Plus size={12} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => removeFromCart(item.id)}
                              style={{ padding: '2px 6px', marginLeft: '4px' }}
                            >
                              <Trash2 size={12} />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {/* Cart Total */}
                      <div style={{
                        borderTop: '2px solid #3A506B',
                        paddingTop: '12px',
                        marginTop: '12px'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontWeight: 'bold',
                          fontSize: '16px',
                          marginBottom: '12px'
                        }}>
                          <span>Total: ${getTotalPrice().toFixed(2)}</span>
                          <span>({getTotalItems()} items)</span>
                        </div>
                        
                        {/* Navigation Buttons */}
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          {items.some(item => item.category === "men's clothing") && (
                            <Link to="/men" style={{ textDecoration: 'none' }}>
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => setShowCart(false)}
                                style={{ 
                                  fontSize: '12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                Men's Items
                                <ArrowRight size={12} />
                              </Button>
                            </Link>
                          )}
                          {items.some(item => item.category === "women's clothing") && (
                            <Link to="/women" style={{ textDecoration: 'none' }}>
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => setShowCart(false)}
                                style={{ 
                                  fontSize: '12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                Women's Items
                                <ArrowRight size={12} />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <NavDropdown style={{fontSize: '16px', color: 'black'}} title={<UserOutlined style={{ fontSize: 24, color: '#333333' }} />} id="navbarScrollingDropdown">
            <NavDropdown.Item  style={{textAlign: 'center'}}>  <Link to='/profile' style={{color: 'black', textDecoration: 'none',}} >Your Profile</Link></NavDropdown.Item>
            <NavDropdown.Item href="#action3"><Button onClick={logoutUser} style={{width: '100%', background: 'transparent', color: 'black', border: 'none'}} >Logout</Button></NavDropdown.Item>
            <NavDropdown.Divider />

          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
