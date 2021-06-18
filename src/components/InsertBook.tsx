import { HttpConnection, Prefix } from '@tmtsoftware/esw-ts'
import { Button, Form, FormInstance, Input } from 'antd'
import React, { createRef } from 'react'
import { insertBook, showError } from '../helpers/HttpUtils'
import { useLocationService } from '../helpers/LocationServiceContext'
import type { InsertBookReq } from '../models/Models'

export const InsertBook = ({
  reload,
  setReload
}: {
  reload: boolean
  setReload: (s: boolean) => void
}): JSX.Element => {
  const locationService = useLocationService()
  const ref = createRef<FormInstance>()
  const connection = HttpConnection(Prefix.fromString('ESW.library'), 'Service')

  const onFinish = (values: InsertBookReq) => {
    locationService
      .find(connection)
      .then((res) => {
        res && insertBook(res.uri, values).then(() => setReload(!reload))
        ref.current?.resetFields()
      })
      .catch((e) => showError(`Failed to insert the book data for the ${values.title}`, e))
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return (
    <Form {...layout} ref={ref} onFinish={onFinish} style={{ width: '30rem' }}>
      <Form.Item label={'Title'} name={'title'}>
        <Input role={'Title'} />
      </Form.Item>
      <Form.Item label={'Author Name'} name={'authorName'}>
        <Input role={'AuthorName'} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit' role={'Submit'}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
