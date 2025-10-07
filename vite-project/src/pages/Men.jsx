import React, { useEffect, useState } from "react";
import { menAPI } from "../Services/productAPi";
import Navebar from "../Components/Navebar";
import { Button, Row, Col, Card } from "react-bootstrap";
import { useCart } from '../Context/CartContext';
import { auth, onAuthStateChanged } from "../Services/firebase";

function Men() {
  const [men, setMen] = useState([]);
  const [uploadedPosts, setUploadedPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("guest");
  const { addToCart, items } = useCart();

  // Check if item is in cart
  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };

  // Get cart quantity for a product
  const getCartQuantity = (productId) => {
    const cartItem = items.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  useEffect(() => {
    async function getData() {
      const data = await menAPI();
      setMen(data);
    }
    getData();

    // Watch auth and load per-user uploaded posts
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const uid = user?.uid || "guest";
      setCurrentUserId(uid);
      const savedPosts = localStorage.getItem(`uploadedPosts_${uid}`);
      if (savedPosts) {
        const posts = JSON.parse(savedPosts);
        const menPosts = posts.filter(post => 
          post.category && post.category.toLowerCase().includes('men')
        );
        setUploadedPosts(menPosts);
      } else {
        setUploadedPosts([]);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navebar />

      <div className="container" style={{ marginTop: "200px" }}>
        {/* API Products */}
        {men.map((item, index) => (
          <Card key={`api-${index}`} className="mb-4 shadow-sm border-0" style={{ borderRadius: "15px" }}>
            <Row className="g-0 align-items-center">
              {/* IMAGE SIDE */}
              <Col md={4}>
                <Card.Img
                  src={item.image}
                  alt={item.title}
                  style={{
                    height: "220px",
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: "15px 0 0 15px",
                    background: "#f8f9fa",
                  }}
                />
              </Col>

              {/* CONTENT SIDE */}
              <Col md={8}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "1.3rem", fontWeight: "600" }}>
                    {item.title}
                  </Card.Title>
                  <Card.Text
                    style={{
                      color: "#555",
                      fontSize: "0.95rem",
                      minHeight: "60px",
                    }}
                  >
                    {item.description?.slice(0, 100)}...
                  </Card.Text>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h5 style={{ color: "#3A506B", margin: 0 }}>${item.price}</h5>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                      {/* Cart Status Indicator */}
                      {isInCart(item.id) && (
                        <div style={{
                          backgroundColor: '#d4edda',
                          color: '#155724',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: 'bold'
                        }}>
                          ✓ In Cart ({getCartQuantity(item.id)})
                        </div>
                      )}
                      <Button
                        style={{
                          backgroundColor: isInCart(item.id) ? "#28a745" : "#3A506B",
                          border: "none",
                          borderRadius: "10px",
                        }}
                        onClick={() => addToCart(item)}
                      >
                        {isInCart(item.id) ? 'Add More' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}

        {/* Uploaded Posts */}
        {uploadedPosts.map((post, index) => (
          <Card key={`uploaded-${post.id}`} className="mb-4 shadow-sm border-0" style={{ borderRadius: "15px" }}>
            <Row className="g-0 align-items-center">
              {/* IMAGE SIDE */}
              <Col md={4}>
                <Card.Img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{
                    height: "220px",
                    width: "100%",
                    objectFit: "contain",
                    borderRadius: "15px 0 0 15px",
                    background: "#f8f9fa",
                  }}
                />
              </Col>

              {/* CONTENT SIDE */}
              <Col md={8}>
                <Card.Body>
                  <Card.Title style={{ fontSize: "1.3rem", fontWeight: "600" }}>
                    {post.title}
                  </Card.Title>
                  <Card.Text
                    style={{
                      color: "#555",
                      fontSize: "0.95rem",
                      minHeight: "60px",
                    }}
                  >
                    {post.description?.slice(0, 100)}...
                  </Card.Text>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h5 style={{ color: "#3A506B", margin: 0 }}>${post.price}</h5>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                      {/* Cart Status Indicator */}
                      {isInCart(post.id) && (
                        <div style={{
                          backgroundColor: '#d4edda',
                          color: '#155724',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: 'bold'
                        }}>
                          ✓ In Cart ({getCartQuantity(post.id)})
                        </div>
                      )}
                      <Button
                        style={{
                          backgroundColor: isInCart(post.id) ? "#28a745" : "#3A506B",
                          border: "none",
                          borderRadius: "10px",
                        }}
                        onClick={() => addToCart(post)}
                      >
                        {isInCart(post.id) ? 'Add More' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Men;
