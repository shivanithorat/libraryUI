import { HttpConnection, Prefix } from '@tmtsoftware/esw-ts'
import { Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { fetchBooksData, showError } from '../helpers/HttpUtils'
import { useLocationService } from '../helpers/LocationServiceContext'
import type { Book } from '../models/Models'

const HeaderTitle = ({ title }: { title: string }): JSX.Element => (
  <Typography.Title level={5} style={{ marginBottom: 0 }}>
    {title}
  </Typography.Title>
)

const columns: ColumnsType<Book> = [
  {
    title: <HeaderTitle title={'Title'} />,
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: <HeaderTitle title={'Author'} />,
    dataIndex: 'author',
    key: 'author'
  },
  {
    title: <HeaderTitle title={'Available'} />,
    dataIndex: 'available',
    key: 'available',
    render: (value: boolean) => (value ? 'Yes' : 'No')
  }
]

export const BooksTable = ({ reload }: { reload: boolean }): JSX.Element => {
  const locationService = useLocationService()
  const [booksData, setBooksData] = useState<Book[]>()

  const connection = HttpConnection(Prefix.fromString('ESW.library'), 'Service')

  useEffect(() => {
    locationService
      .find(connection)
      .then((response) => response && fetchBooksData(response.uri))
      .then(setBooksData)
      .catch((e) => showError('Failed to fetch books data', e))
  }, [reload])

  return <Table rowKey={(record) => record.id} pagination={false} dataSource={booksData} columns={columns} bordered />
}
