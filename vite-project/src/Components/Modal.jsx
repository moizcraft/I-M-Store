import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, onAuthStateChanged } from "../Services/firebase";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("guest");
  const [formData, setFormData] = useState({
    file: null,
    category: "",
    title: "",
    description: "",
    price: "",
  });

  // Track auth user and load posts for that user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const uid = user?.uid || "guest";
      setCurrentUserId(uid);
      const savedPosts = localStorage.getItem(`uploadedPosts_${uid}`);
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      } else {
        setPosts([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Save posts to localStorage whenever posts change or user changes
  useEffect(() => {
    localStorage.setItem(`uploadedPosts_${currentUserId}`, JSON.stringify(posts));
  }, [posts, currentUserId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      // Convert file to base64 for localStorage storage
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, [name]: event.target.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { 
      ...formData, 
      id: Date.now(),
      imageUrl: formData.file // Store the base64 image
    };
    setPosts([...posts, newPost]);
    setFormData({ file: null, category: "", title: "", description: "", price: "" });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleEdit = (id) => {
    const editPost = posts.find((p) => p.id === id);
    setFormData(editPost);
    setShowModal(true);
    setPosts(posts.filter((p) => p.id !== id)); 
  };

  return (
    <div className="container mt-4">
      <div className="text-center">
        <button style={{backgroundColor: '#3A506B', color: '#ffff'}} className="btn" onClick={() => setShowModal(true)}>
          Upload Post
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Post</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <label className="form-label">Upload File</label>
                    <input
                      type="file"
                      name="file"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      name="category"
                      placeholder="Please select only Men / Women"
                      className="form-control"
                      value={formData.category}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-end">
                    <button type="submit" className="btn btn-success me-2">
                      Post
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POSTS */}
      <div className="row mt-4">
        {posts.map((post) => (
          <div className="col-md-4 mb-3" key={post.id}>
            <div className="card shadow-sm">
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  className="card-img-top"
                  alt="upload"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
                <p>
                  <strong>Price:</strong> ${post.price}
                </p>
                <span className="badge bg-info">{post.category} </span>
                <div className="mt-3 d-flex justify-content-between">
                  <button
                    style={{backgroundColor: 'green', color: '#fff'}} className="btn btn-sm"
                    onClick={() => handleEdit(post.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
