import React, { useState } from 'react'
import Navebar from '../Components/Navebar'
import Products from '../Components/Products'
import MyCarousel from '../Components/MyCarousel'
import Footer from '../Components/Footer'



const Home = () => {

  const [category, setCategory] = useState('All')



  return (
    <div>

      
      {/* navebar  */}
      <Navebar />
      

  
        <MyCarousel setCategory={setCategory} />
        <Products category={category} />
  
      
      <footer>
        <Footer />
      </footer>

      
      
    </div>
  )
}

export default Home
