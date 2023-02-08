import Canvas from '@/components/Canvas';
import { AppContextProvider } from '@/contexts/AppContext';

const Home = () => {
  return (
    <AppContextProvider>
      <Canvas />
    </AppContextProvider>
  )
}

export default Home;