import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const FilterWidget = ({ setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };  

  return (
    <div className="h50">
      <Box className="filter-widget">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            justifyContent: 'space-between',
            padding: { xs: '12px 24px', sm: '10px 25px', lg: '20px 50px' }
          }}
        >
          <Typography variant="body2" color={"#505050"}>
            &nbsp; Welcome to Marketplace
          </Typography>

          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="filter-label">Sort By </InputLabel>

            <Select sx={{ fontSize: "smaller"}} defaultValue={"Random"}
              labelId="filter-label"
              onChange={handleChange}
              label="Options"
              MenuProps={{
                PaperProps: {
                  sx: {
                    '& .MuiMenuItem-root': {
                      fontSize: '0.75rem', 
                    },
                  },
                },
              }}
            >
              <MenuItem value="Random">Random</MenuItem>
              <MenuItem value="Quantity">Quantity</MenuItem>
              <MenuItem value="Newest">Recently Added</MenuItem>
              <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
              <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </div>
  )
}

export default FilterWidget;
