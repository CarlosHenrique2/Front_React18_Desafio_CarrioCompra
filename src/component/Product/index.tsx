import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea, CardActions } from '@mui/material';
import { formatCurrency } from '../../utilities/index'

export interface IProductProps extends IProduct {
  onClick: (product: IProduct) => void
}

export interface IProduct {
  id: number
  name: string
  price: number
  img: string
  quantity: number
}

export const Product: React.FC<IProductProps> = ({  onClick, ...product }) => {
 const { 
  name,
  price,
  img,  
} = product

  return (
    <div>
      <Card sx={{ Width: "500px" }}>
        <CardActionArea component="a">
          <CardMedia
            component="img"
            height="200"
            src={img}
            alt="phone"
            style={{ objectFit: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              {formatCurrency(price)}
            </Typography>
            <CardActions>
              <Button variant="contained" onClick={() => onClick(product)}>Buy</Button>
            </CardActions>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Product;