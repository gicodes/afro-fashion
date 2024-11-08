import Mobile from "./breakpoints/mobile.component";
import PC from "./breakpoints/lg.component";
import { useTheme, useMediaQuery } from '@mui/material';
 
const App = () => {
  const theme = useTheme()
  const isTabAndBelow = useMediaQuery(theme.breakpoints.down('md'))
  
  return isTabAndBelow ? <Mobile /> : <PC />
}

export default App;