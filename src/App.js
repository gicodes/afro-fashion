import { useTheme, useMediaQuery } from '@mui/material';

import Mobile from "./components/routes/home/mobile.component";
import PC from "./components/routes/home/desktop.component";

const App = () => {

  const theme = useTheme()

  const isTabAndBelow = useMediaQuery(theme.breakpoints.down('md'))

  return isTabAndBelow ? <Mobile /> : <PC />
}

export default App;