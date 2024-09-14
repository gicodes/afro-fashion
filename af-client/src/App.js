import Mobile from "./components/routes/App/mobile.component";
import PC from "./components/routes/App/lg.component";
import { useTheme, useMediaQuery } from '@mui/material';

const App = () => {
  const theme = useTheme()
  const isTabAndBelow = useMediaQuery(theme.breakpoints.down('md'))
  
  return isTabAndBelow ? <Mobile /> : <PC />
}

export default App;