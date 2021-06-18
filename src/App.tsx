import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { BooksTable } from './components/BooksTable'
import { InsertBook } from './components/InsertBook'
import { LocationServiceProvider } from './helpers/LocationServiceContext'

const App = (): JSX.Element => {
  const [reload, setReload] = useState<boolean>(false)
  return (
    <LocationServiceProvider>
      <InsertBook reload={reload} setReload={setReload} />
      <BooksTable reload={reload} />
    </LocationServiceProvider>
  )
}

export default App
