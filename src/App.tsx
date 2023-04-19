import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Product, { IProduct } from './component/Product';
import './App.css'

import itens from "./data/product.json"
import { useState } from 'react';
import Modal from './component/Modal';

function App() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<IProduct[]>([]);

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleAddProduct = (product: IProduct) => {
    setProduct((products) => {      
      const hasProduct = products.some((item) => item.id === product.id)
      if (hasProduct) {
        return products.map((item) => {
          if (item.id === product.id) {
            return {...item, quantity: item.quantity +1}
          }
        return item
        })
      }
      return [...products, product]
    })
  }

  const handleRemoveProduct = (product: IProduct) => {
    setProduct((products) => products.map((item) => {
      const hasProduct = item.id === product.id
      if (hasProduct) {
        return {...item, quantity: item.quantity -1}
        }
      return item
    }).filter(item => item.quantity))
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" width="100vw">
      <Box>
        <Box display="flex" alignItems="center" justifyContent="center" marginBottom="50px" >
        <Button variant="contained" onClick={handleOpen}>carrinho de compras</Button>
        </Box>
        <Box display="flex" gap="40px" >
          {itens.map((item) => (
            <Product key={item.id} {...item} quantity={1} onClick={(product) => {handleAddProduct(product); handleOpen()}} ></Product>
          ))}
        </Box>
      </Box>
      <Modal open={open} onClose={handleOpen} products={product} onRemove={handleRemoveProduct} onAdd={handleAddProduct} />
  </Box>
  );
}

export default App;
