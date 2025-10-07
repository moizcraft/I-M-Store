
export async function menAPI(){

    try{
        const res = await fetch("https://fakestoreapi.com/products/category/men's clothing");
        const data = await res.json()
        console.log(data) 
        return data
    }
    catch(err){
        console.log("APi Error ===> " + err)
    }
  
}


export async function womenAPI(){

    try{
        const res = await fetch("https://fakestoreapi.com/products/category/women's clothing");
        const data = await res.json()
        console.log(data) 
        return data
    }
    catch(err){
        console.log("APi Error ===> " + err)
    }
  
}


