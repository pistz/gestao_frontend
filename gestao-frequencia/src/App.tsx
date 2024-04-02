
import { AuthProvider } from './context/authenticate'
import { RoutesReference } from './routes/Routes'
import './global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <RoutesReference />
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
