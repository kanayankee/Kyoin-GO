import { useState } from 'react'
import './App.css'
import { AdminCoords } from './components/AdminCoords'
import { MapView } from './components/MapView'
import { TabBar, type Tab } from './components/TabBar'
import { Zukan } from './components/Zukan'
import { GameStoreProvider } from './store/GameStore'

function App() {
  const [tab, setTab] = useState<Tab>('map')

  return (
    <GameStoreProvider>
      <div className="app">
        <div className="app__screen" style={{ display: tab === 'map' ? 'block' : 'none' }}>
          <MapView active={tab === 'map'} />
        </div>
        {tab === 'zukan' && <Zukan />}
        {tab === 'admin' && <AdminCoords />}
        <TabBar active={tab} onChange={setTab} />
      </div>
    </GameStoreProvider>
  )
}

export default App
