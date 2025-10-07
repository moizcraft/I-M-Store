import React from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { useCart } from '../Context/CartContext';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

function AdtoCart() {
  const { items, getTotalItems, getTotalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Container style={{ marginTop: '100px', textAlign: 'center' }}>
        <ShoppingBag size={80} style={{ color: '#ccc', marginBottom: '20px' }} />
        <h3 style={{ color: '#666', marginBottom: '20px' }}>Your Cart is Empty</h3>
        <p style={{ color: '#999' }}>Add some products to get started!</p>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '100px', marginBottom: '50px' }}>
      <Row>
        <Col>
          <h2 style={{ marginBottom: '30px', color: '#3A506B' }}>Shopping Cart</h2>
          
          <Card>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: '60px',
                              height: '60px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              marginRight: '15px'
                            }}
                          />
                          <div>
                            <h6 style={{ margin: '0', fontSize: '16px' }}>{item.title}</h6>
                            <small style={{ color: '#666' }}>Category: {item.category}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                          ${item.price}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </Button>
                          <span style={{ 
                            minWidth: '30px', 
                            textAlign: 'center',
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }}>
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#3A506B' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </td>
                      <td>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Cart Summary */}
          <Card style={{ marginTop: '20px' }}>
            <Card.Body>
              <Row>
                <Col md={8}>
                  <h5>Cart Summary</h5>
                  <p style={{ margin: '0' }}>
                    Total Items: <strong>{getTotalItems()}</strong>
                  </p>
                </Col>
                <Col md={4} style={{ textAlign: 'right' }}>
                  <h4 style={{ color: '#3A506B', marginBottom: '20px' }}>
                    Total: ${getTotalPrice().toFixed(2)}
                  </h4>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outline-danger"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                    <Button
                      style={{ backgroundColor: '#3A506B', border: 'none' }}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdtoCart;
