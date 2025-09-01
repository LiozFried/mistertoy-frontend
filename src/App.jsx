import './assets/style/main.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { HomePage } from './pages/HomePage'
import { About } from './pages/About'
import { ToyIndex } from './pages/ToyIndex'
import { ToyEdit } from './pages/ToyEdit'
import { ToyDetails } from './pages/ToyDetails'
import { UserMsg } from './cmps/UserMsg'
import { ToyDashboard } from './pages/ToyDashboard'

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
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path='/about' element={<About />} />
              <Route path='/dashboard' element={<ToyDashboard />} />
              <Route path='/toy' element={<ToyIndex />} />
              <Route path='/toy/edit/:toyId?' element={<ToyEdit />} />
              <Route path='/toy/:toyId' element={<ToyDetails />} />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
      <UserMsg />
    </Provider>
  )
}