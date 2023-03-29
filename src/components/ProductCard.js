import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";
import {  Stack } from "@mui/material";


const ProductCard = ({ product, handleAddToCart,products, items }) => {
  //console.log(product)
  
  return (
    
    <Card className='card' >
      {/* <CardMedia
        sx={{ height: 140 }}
        alt={product.name}
        image={product.image}
      /> */}
      <img src={product.image} alt={product.name}/>
      <CardContent>
        <Stack>
        <Typography gutterBottom variant="h5" component="div">
        {product.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        ${product.cost}
        </Typography>
        <Rating name="stars" value={product.rating}  readOnly/>
        <CardActions className="card-actions">
           <Button className="card-button" variant="contained" sx={{width:"100%"}} onClick={()=>handleAddToCart(localStorage.getItem("token"),items, products, product._id, 1, {preventDuplicate: true})}
            startIcon={<AddShoppingCartOutlined />}> ADD TO CART </Button> 
         </CardActions> 
        </Stack>
</CardContent>
    </Card>
  );
};

export default ProductCard;
