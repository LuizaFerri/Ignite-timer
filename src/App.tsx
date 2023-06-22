import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../src/components/styles/themes/default";
import { GlobalStyle } from "../src/components/styles/global";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { CyclesProvider } from "./contexts/CyclesContext";
function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesProvider>
          <Router />
        </CyclesProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
