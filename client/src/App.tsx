import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { GridDetails } from './pages/GridDetails'
import { GensetDetails } from './pages/GensetDetails'
import { InverterDetails } from './pages/InverterDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/grid-details" element={<GridDetails />} />
      <Route path="/genset-details" element={<GensetDetails />} />
      <Route path="/inverters" element={<Navigate to="/inverters/inverter1" replace />} />
      <Route path="/inverters/:inverterId" element={<InverterDetails />} />
    </Routes>
  )
}

export default App;
