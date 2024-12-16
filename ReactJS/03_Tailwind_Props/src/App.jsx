import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-3xl font-bold bg-green-500 p-3 text-gray-800'>Vite with React and Tailwind CSS</h1>
      <Card username='Saad Khan' />
      <Card username='Sergio Ramos' post='Manager'/>
      <Card />
    </>
  )
}

export default App
