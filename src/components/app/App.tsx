import { Routing } from ".";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { IconContext } from "react-icons";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <IconContext.Provider value={{ className: "icon", size: "18px" }}>
          <Routing />
          <ReactQueryDevtools initialIsOpen={false} />
        </IconContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
