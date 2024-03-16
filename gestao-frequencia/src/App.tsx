
import { AuthProvider } from './components/context/authenticate'
import './global.css'
import { RoutesReference } from './routes/Routes'

function App() {


  return (
    <>
    <AuthProvider>
        <RoutesReference />
    </AuthProvider>
    </>
  )
}

export default App
