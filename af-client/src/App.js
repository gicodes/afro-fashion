import Mobile from "./components/routes/index/mobile.component";
import PC from "./components/routes/index/desktop.component";
import { useTheme, useMediaQuery } from '@mui/material';

const App = () => {
  const theme = useTheme()
  const isTabAndBelow = useMediaQuery(theme.breakpoints.down('md'))
  
  return isTabAndBelow ? <Mobile /> : <PC />
}

export default App;