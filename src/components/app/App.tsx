import { Routing } from ".";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { useGoogleAnalytics } from "../../hooks";

function App() {
  const queryClient = new QueryClient();

  useGoogleAnalytics();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routing />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
