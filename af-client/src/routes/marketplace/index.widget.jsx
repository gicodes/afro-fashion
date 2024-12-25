import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";

const FilterWidget = ({ setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };  

  return (
    <Box>
      <Grid2 position={"fixed"} width={"100%"} zIndex={999}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 16px",
            backgroundColor: "#f5f5f5",
            borderBottom: "1px solid #ddd",
          }}
        >
          <Typography variant="body2" color={"#505050"}>
            &nbsp; Welcome to Marketplace
          </Typography>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="filter-label">Sort By </InputLabel>
            <Select  sx={{ fontSize: "smaller"}}
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
              <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
              <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
              <MenuItem value="Popularity">Popularity</MenuItem>
              <MenuItem value="Newest">Newest</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid2>
    </Box>
  )
}

export default FilterWidget;