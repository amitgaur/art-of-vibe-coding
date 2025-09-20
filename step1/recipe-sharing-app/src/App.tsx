import { Hero } from './components/Hero'
import { WaitlistForm } from './components/WaitlistForm'
import { FeatureGrid } from './components/FeatureGrid'
import './App.css'

function App() {
  return (
    <div className="app">
      <Hero />

      <main className="main-content">
        <WaitlistForm />
        <FeatureGrid />
      </main>

      <footer className="footer">
        <p>&copy; 2024 RecipeShare. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
