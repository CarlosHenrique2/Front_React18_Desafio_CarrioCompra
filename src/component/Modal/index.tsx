import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

import { formatCurrency } from '../../utilities/index';
import { IProduct } from '../Product';
import { useState } from 'react';

export interface IModalProps  {
 onClose: () => void
 onRemove: (product: IProduct) => void  
 onAdd: (product: IProduct) => void
 open: boolean
 products: IProduct[]
}

const marks = [
  {
    value: 0,
    percentage: 0,
    label: "Sem"
  },
  {
    value: 50,
    percentage: 0.15,
    label: "12 meses"
  },
  {
    value: 100,
    percentage: 0.55,
    label: "24 meses"
  }
]

export const Modal = (props: IModalProps) => {
  const [garan, setGaran] = useState(0)
  const {open, onClose, onRemove, onAdd, products } = props

  const mark = marks.find((item) => item.value === garan)|| marks[0]
  const porcentage = mark.percentage +1;
  const total = products.reduce((acum, product) => {
    return acum + (product.price * porcentage) * product.quantity
  },0)

  return (
      <Dialog open={open} onClose={onClose}>
        <Box display="flex" justifyContent="space-between">
          <DialogTitle marginLeft="10px">Car: {products.length}</DialogTitle>
        </Box>
        <DialogContent>
          <Box display="flex" flexDirection="column">
                {products.map((product) => (
                  <Box key={product.id} display="flex" alignItems="center" padding="0 20px 0 20px">
              <div>
                <img style={{ width: "80px", padding: "0 5px 0 0", objectFit: "cover" }} src={product.img} />
              </div>
              <div>
                <p>{product.name}</p>
                <p>{formatCurrency(product.price)}</p>
              </div>
              <Box display="flex" padding="0 20px 0 20px">
                <Button sx={{ alignSelf: "center", padding: "0 0 0 0", margin: "0 5px 0 0" }} variant="contained" onClick={() => onAdd(product)}>+</Button>
                <p style={{ alignSelf: "center" }}>{product.quantity}</p>
                <Button sx={{ alignSelf: "center", padding: "0 0 0 0", margin: "0 0 0 5px" }} variant="contained" onClick={() => onRemove(product)}>-</Button>
              </Box>
            </Box> 
                ))}
            <Typography id="track-false-slider" gutterBottom>
              Garantia
            </Typography>
            <Slider sx={{ width: "90%" }}  defaultValue={50} max={100} step={50} marks={marks} aria-label="Default" value={garan} onChange={(event, value) => {setGaran(value as number)}} />
          </Box>
          <div>Total: R${Number(total).toFixed(2)}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Continuar Comprando</Button>
        </DialogActions>
      </Dialog>
  );
};

export default Modal;