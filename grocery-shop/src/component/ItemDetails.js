import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
// import Image from 'next/image'


function ItemDetails({ searchTerm }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/shop_items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredData = items.filter(item => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.weight.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.price.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div style={{ backgroundColor: "#F4F6FB", marginRight: '50px', marginLeft: '50px', marginTop: "10px" }}>
      <Grid container spacing={2}>
        {filteredData.map(item => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                  <img src={item.image}
                    alt="Item"
                    style={{ maxWidth: '70%', maxHeight: '100%', width: '100%', height: 'auto', height: 'auto' }}
                  />
                </div>

                <Typography variant="h6" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</Typography>
                <Typography variant="body2" color="textSecondary" >Weight: {item.weight}</Typography>

                <Grid sx={{ marginTop: "8px" }}>
                  <Grid container alignItems='center'>
                    <Grid item xs={9}>
                      <Typography variant="body2">Price: {item.price}</Typography>
                    </Grid>
                    <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button variant="outlined">
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ItemDetails;

