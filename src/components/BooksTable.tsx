import { HttpConnection, LocationService, Prefix } from '@tmtsoftware/esw-ts'
import { Table } from 'antd'
import React, { useEffect, useState } from 'react'

interface Book {
  id: string
  title: string
  authorName: string
  available: boolean
}

const fetchBooksData = (baseUri: string): Promise<Book[]> => {
  const url = baseUri + 'books'
  return fetch(url).then((response) => response.json())
}

export const BooksTable = (): JSX.Element => {
  const [booksData, setBooksData] = useState<Book[]>()

  const connection = HttpConnection(new Prefix('ESW', 'library'), 'Service')

  useEffect(() => {
    // LocationService()
    //   .find(connection)
    //   .then((response) => response &&
    fetchBooksData('http://192.168.10.34:9090/').then(setBooksData)
  }, [])

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Author',
      dataIndex: 'authorName',
      key: 'authorName'
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available'
    }
  ]
  return <Table dataSource={booksData} columns={columns} />
}
