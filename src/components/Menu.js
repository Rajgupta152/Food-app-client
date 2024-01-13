import { Box, Button,IconButton,Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

export const Menu = (props) => {
  const [foodData, setFoodData] = useState([]);
  const [display,setDisplay] = useState("none");
  const [selctedFoodItem, setSelectedFoodItem] = useState([]);
  const [subtotal,setSubtotal] = useState('');
  // Food api
  const foodDataApi = () => {
    fetch("http://localhost:8081/api/getFoodItem")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data)
        setFoodData(data.data)
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    foodDataApi();
  }, []);

  console.log("food", foodData);

//   Add to cart pop-up
const addToCart = (id) => {
    setDisplay("block");
    console.log("index",id);
    const selctedItem = foodData.find((item) => item._id === id);
      // Check if the item is already in the cart
  const existingItem = selctedFoodItem.find((item) => item._id === id);

  if (existingItem) {
    // If the item is already in the cart, update its quantity
    const updatedItems = selctedFoodItem.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setSelectedFoodItem(updatedItems);
  } else {
    // If the item is not in the cart, add it with a quantity of 1
    setSelectedFoodItem([...selctedFoodItem, { ...selctedItem, quantity: 1 }]);
  }

    // console.log(selctedFoodItem)


    console.log(selctedItem);
}



console.log(selctedFoodItem);

const increamentQuantity = (id) => {
  const selctedItem = foodData.find((item) => item._id === id);
  // Check if the item is already in the cart
const existingItem = selctedFoodItem.find((item) => item._id === id);

if (existingItem) {
// If the item is already in the cart, update its quantity
const updatedItems = selctedFoodItem.map((item) =>
  item._id === id ? { ...item, quantity: item.quantity + 1 } : item
);
setSelectedFoodItem(updatedItems);
} else {
// If the item is not in the cart, add it with a quantity of 1
setSelectedFoodItem([...selctedFoodItem, { ...selctedItem, quantity: 1 }]);
}


}

const decrementQuantity = (id) => {
  const selctedItem = foodData.find((item) => item._id === id);
  // Check if the item is already in the cart
const existingItem = selctedFoodItem.find((item) => item._id === id);

if (existingItem) {
// If the item is already in the cart, update its quantity
const updatedItems = selctedFoodItem.map((item) =>
  item._id === id ? { ...item, quantity: item.quantity - 1 } : item
);
setSelectedFoodItem(updatedItems);
} else {
// If the item is not in the cart, add it with a quantity of 1
setSelectedFoodItem([...selctedFoodItem, { ...selctedItem, quantity: 1 }]);
}
}

// get subtotal
let total = 0;
const getSubtotal = () => {

  if(selctedFoodItem.length){
    
    for(let i=0; i<selctedFoodItem.length; i++){
      total += selctedFoodItem[i].price * selctedFoodItem[i].quantity;
    }
  }

  console.log(total);
}
getSubtotal();

 useEffect(() => {
  setSubtotal(total)
 },[total])

// Delete item form add to cart
const deleteItem = (id) => {
  const filterItem = selctedFoodItem.filter((item) => item._id !== id);
  setSelectedFoodItem(filterItem);
}


  return (
    <Box sx={{ marginTop: "100px" }}>
      {/* <Nav isValidate = {isValidate} getLoginSucess = {getLoginSucess} currentUser = {currentUser}/> */}
      <h1>Menu</h1>
      <Box className = "menu-container"
        sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px"
        }}
      >
      <Box className="menu" sx={{
        display: "flex",
        justifyContent: "center",
        gap: "30px", 
        flexWrap: "wrap",
        }}>
        {foodData.map((item) => (
          <Box key={item._id}
            sx={{
              width: "300px",
              height: "auto",
              textAlign: "left",
              border: "1px solid rgb(223, 210, 210)",
              boxShadow: "10px 20px 20px rgb(223, 210, 210)",
              borderRadius: "10px",
              paddingBottom: "20px"
            }}
            className="menu-cards"
          >
            <Box sx={{
                height: "50%",
            }} className = "food-img">
            <img
              src={item.image}
              alt="food"
              width="100%"
              height="100%"
              style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px"
              }}
            />
            </Box>
          <Box sx={{
            // marginTop: "10px",
            textAlign: "center",
            padding: "10px"
          }}>
          <Typography fontWeight="bold">{item.name}</Typography>
            <Typography fontWeight="bold" sx={{
                marginTop: "10px"
            }}>{item.price} Rs/-</Typography>
            <Typography color="grey">{item.description}</Typography>
            <Button variant="contained" onClick={() => addToCart(item._id)} sx={{
                width: "80%",
                marginTop: "10px"
            }}>Add to cart</Button>
          </Box>


          {/* add to cart pop-up */}
          </Box>
        ))}
      </Box>
      </Box>
      <Box sx={{
            width: "40%",
            height: "auto",
            background: "#fff",
            position: "absolute",
            top: "20%",
            left: "30%",
            position: "fixed",
            display: {display},
            padding: "20px",
            boxShadow: "10px 10px 10px rgb(223, 210, 210)",
            border: "1px solid rgb(223, 210, 210)"
          }}>
            <Button sx={{ float: "right"}} onClick={() => setDisplay("none")}><CloseIcon /></Button>

            <Box className = "cart-table">
              <TableContainer sx={{ maxHeight: 250 }}>
              <Table>
                <TableHead >
                  <TableRow sx={{color: "#fff"}}>
                    <TableCell>Food Item</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {selctedFoodItem.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Box sx={{display: "flex", gap: "20px"}}>
                        <img src={item.image} alt="food" width="50px" height= "50px" />
                        <Box>
                        <Typography>{item.name}</Typography>
                        <Typography>{item.price} Rs/-</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{display: "flex"}}>
                        <IconButton
                         onClick={() => increamentQuantity(item._id)}
                          ><AddIcon fontSize = "small"/></IconButton>
                        <Typography sx={{width: "20px", display: "flex", justifyContent: "center", alignItems: "center"}}>{item.quantity}</Typography>
                        <IconButton 
                        onClick={() => decrementQuantity(item._id)}
                          disabled = {item.quantity <= 1}
                          ><RemoveIcon fontSize = "small"/></IconButton>
                           <IconButton fontSize = "small" onClick={() => deleteItem(item._id)}><DeleteIcon/></IconButton>
                      </Box>
                     
                    </TableCell>
                    <TableCell>{item.price * item.quantity}</TableCell>
                  </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>Subtotal</TableCell>
                    <TableCell>{subtotal}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              </TableContainer>

              <Box sx={
                {
                  float: 'right',
                  marginTop: '20px'
                }}>
              <Button variant="contained" onClick={() => alert("Your order placed.")}>Place Order</Button>
              </Box>
            </Box>
          </Box>
    </Box>
  );
};
