import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import Stack from "@mui/material/Stack";
// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */
 
const Products = () => {
  
  const[ isloading,setisloading]=useState(false)
  const[products,setProduct]=useState([])
  const [debounceTime, setDebounceTimeout] = useState(0);

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  useEffect(()=>{
    performAPICall()},[]
  );
  const performAPICall = async () => {
    
    try {
      setisloading(true)
      let res= await axios.get(`${config.endpoint}/products`)
      setProduct(res.data)
      // console.log(products)
      setisloading(false)
    } catch (error) {
      setisloading(false)
      console.log(error)
    }
    

  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
      let url = `${config.endpoint}/products/`;
      console.log(text);
    try {
      setisloading(true)
      if (text !== "") { url = `${config.endpoint}/products/search?value=${text}`; }
      let res= await axios.get(url)
      console.log(res)
      setProduct(res.data)
      setisloading(false)
    } catch (error) {
      setisloading(false)
      console.log(error)
      setProduct([])
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    if (debounceTimeout !== 0) 
    { clearTimeout(debounceTimeout); } 
    const newTimeout = setTimeout( () => 
    performSearch(event.target.value), 1000 ); 
    setDebounceTimeout(newTimeout);
  };







  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField
        className="search-desktop"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(e) => { debounceSearch(e, debounceTime); }}      />

      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(e) => { debounceSearch(e, debounceTime); }}      />
       <Grid container>
         <Grid item className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
         </Grid>

         {products.length === 0 && 
( <Stack spacing={2} className="loading">
 <Box> <SentimentDissatisfied />
 </Box> 
<Box> 
<div>No products found</div> 
</Box> </Stack> )}
         {isloading && <Box>Loading Products<CircularProgress/></Box> }
          {products && products.map((prod)=>(
          <ProductCard product={prod}/>))
         
          }
       </Grid>

      <Footer />
    </div>
  );
};

export default Products;
