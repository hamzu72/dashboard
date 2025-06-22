/**
 * Main application component with routing configuration
 */
import { HashRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import StocksPage from './pages/StocksPage'
import StockDetailPage from './pages/StockDetailPage'
import PortfolioPage from './pages/PortfolioPage'
import TradingPage from './pages/TradingPage'
import LearningPage from './pages/LearningPage'
import { AppProvider } from './context/AppContext'

/**
 * The main App component that sets up routing and context providers
 */
export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stocks" element={<StocksPage />} />
          <Route path="/stocks/:symbol" element={<StockDetailPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/trading" element={<TradingPage />} />
          <Route path="/learn" element={<LearningPage />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  )
}
