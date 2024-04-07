
import { AuthProvider } from './context/authenticate'
import { RoutesReference } from './routes/Routes'
import './global.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TableDataProvider } from './context/tableData';

const queryClient = new QueryClient();

function App() {


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <TableDataProvider>
              <RoutesReference />
            </TableDataProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
