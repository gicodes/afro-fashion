import React from "react";
import PC from './breakpoints/lg.component.tsx';
import Mobile from './breakpoints/mobile.component.tsx';
import { useTheme, useMediaQuery } from '@mui/material';
 
const App = () => {
  const theme = useTheme()
  const isTabAndBelow = useMediaQuery(theme.breakpoints.down('md'))
  
  return isTabAndBelow ? <Mobile /> : <PC />
}

export default App;