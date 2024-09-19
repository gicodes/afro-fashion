import Mobile from "./App/mobile.component";
import PC from "./App/lg.component";
import { useTheme, useMediaQuery } from '@mui/material';
 
const App = () => {
  const theme = useTheme()
  const isTabAndBelow = useMediaQuery(theme.breakpoints.down('md'))
  
  return isTabAndBelow ? <Mobile /> : <PC />
}

export default App;