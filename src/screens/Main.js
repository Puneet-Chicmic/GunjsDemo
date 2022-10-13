import React from 'react'
import Home from './Home'
import Auth from './Auth'
import { useAuth } from '../contexts'
export default function Main () {
  const user = useAuth()
  return !user.password ? <Auth /> : <Home />
}