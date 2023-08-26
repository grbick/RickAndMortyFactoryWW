import React from 'react'
import Header from '../../components/Header/Header'
import './favoritesPage.scss'
import FavoritesWrapper from './components/FavoritesWrapper/FavoritesWrapper'

const FavoritesPage = () => {
  return (
    <div className='favoritesPage'>
      <Header/>
      <FavoritesWrapper/>
    </div>
  )
}

export default FavoritesPage