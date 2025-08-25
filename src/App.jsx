import './assets/style/main.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { HomePage } from './pages/HomePage'

import { store } from './store/store'
import { loadToyLabels } from './store/actions/toy.action'

import { useEffect } from 'react'

export default function App() {

  useEffect(() => {
    loadToyLabels()
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}