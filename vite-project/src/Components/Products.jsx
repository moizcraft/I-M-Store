import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { menAPI, womenAPI } from "../Services/productAPi";
import useFormItemStatus from "antd/es/form/hooks/useFormItemStatus";
import '../Style/Products.css'
import { useCart } from '../Context/CartContext'
import { auth, onAuthStateChanged } from "../Services/firebase";

function Products({ category }) {
  const [products, setProducts] = useState([]);
  const [uploadedPosts, setUploadedPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("guest");
  const { addToCart, items } = useCart();

  // Debug logging
  console.log('Products - Cart items:', items);
  console.log('Products - Category:', category);

  useEffect(() => {
    async function getData() {
      let data = [];
      if(category === "men's clothing") {
        data = await menAPI();
        setProducts(data);
      } else if(category === "women's clothing") {
        data = await womenAPI();
        setProducts(data);
      } else {
        const men = await menAPI();
        const women = await womenAPI();
        setProducts([...men, ...women]);
      }
    }
    getData();

    // Watch auth and load per-user uploaded posts
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const uid = user?.uid || "guest";
      setCurrentUserId(uid);
      const savedPosts = localStorage.getItem(`uploadedPosts_${uid}`);
      if (savedPosts) {
        const posts = JSON.parse(savedPosts);
        let filteredPosts = posts;
        
        if(category === "men's clothing") {
          filteredPosts = posts.filter(post => 
            post.category && post.category.toLowerCase().includes('men')
          );
        } else if(category === "women's clothing") {
          filteredPosts = posts.filter(post => 
            post.category && post.category.toLowerCase().includes('women')
          );
        }
        setUploadedPosts(filteredPosts);
      } else {
        setUploadedPosts([]);
      }
    });

    return () => unsubscribe();
  }, [category]);


  // Check if item is in cart
  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };

  // Get cart quantity for a product
  const getCartQuantity = (productId) => {
    const cartItem = items.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <>

<div style={{marginTop: '100px'}} ><h2 style={{textAlign: 'center'}}>Our Products</h2></div>

    {/* Cateforis  */}
    {/* <div className="container-fluid category">
        <button onClick={()=> setCategory('All')} >All</button>
        <button onClick={()=> setCategory(`men's clothing`)} >Men</button>
        <button onClick={()=> setCategory(`women's clothing`)} >Women</button>
        <button onClick={()=> setCategory('jewelery')} >Jewellery</button>
        <button onClick={()=> setCategory('electronics')} >Electronic</button>
    </div> */}

    <div className="container-fluid card-container" >
      {/* API Products */}
      {products.map((item) => {
        return (
          <Card key={`api-${item.id}`} className="Cards">
            <Card.Img style={{height: '200px', width: '200px'}} src={item.image} />
            <Card.Body>
              <Card.Title className="card-title" >{item.title}</Card.Title>
              <Card.Text style={{textAlign: 'center', fontSize: '18px'}} >${item.price}</Card.Text>
              
              {/* Cart Status Indicator */}
              {isInCart(item.id) && (
                <div style={{
                  backgroundColor: '#d4edda',
                  color: '#155724',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>
                  ✓ In Cart ({getCartQuantity(item.id)})
                </div>
              )}
              
              <Button 
                style={{
                  backgroundColor: isInCart(item.id) ? '#28a745' : '#3A506B', 
                  border: 'none', 
                  transition: 'all 0.3s ease',
                  width: '100%'
                }} 
                onClick={() => addToCart(item)}
              >
                {isInCart(item.id) ? 'Add More' : 'Add to Cart'}
              </Button>
            </Card.Body>
          </Card>
        );
      })}

      {/* Uploaded Posts */}
      {uploadedPosts.map((post) => {
        return (
          <Card key={`uploaded-${post.id}`} className="Cards">
            <Card.Img style={{height: '200px', width: '200px'}} src={post.imageUrl} />
            <Card.Body>
              <Card.Title className="card-title" >{post.title}</Card.Title>
              <Card.Text style={{textAlign: 'center', fontSize: '18px'}} >${post.price}</Card.Text>
              
              {/* Cart Status Indicator */}
              {isInCart(post.id) && (
                <div style={{
                  backgroundColor: '#d4edda',
                  color: '#155724',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginBottom: '8px',
                  fontWeight: 'bold'
                }}>
                  ✓ In Cart ({getCartQuantity(post.id)})
                </div>
              )}
              
              <Button 
                style={{
                  backgroundColor: isInCart(post.id) ? '#28a745' : '#3A506B', 
                  border: 'none', 
                  transition: 'all 0.3s ease',
                  width: '100%'
                }} 
                onClick={() => addToCart(post)}
              >
                {isInCart(post.id) ? 'Add More' : 'Add to Cart'}
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
    </>
  );
}

export default Products;
