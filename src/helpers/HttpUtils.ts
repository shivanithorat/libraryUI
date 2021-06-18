import { message } from 'antd'
import type { Book } from '../models/Models'

export const fetchBooksData = (baseUri: string): Promise<Book[]> => {
  const url = baseUri + 'books'
  return fetch(url).then((res) => handleRes(res, (res) => res.json()))
}

const handleRes = <T>(res: Response, reader: (res: Response) => T) => {
  if (!res.ok) throw Error(res.statusText)
  return reader(res)
}

export const insertBook = (baseUri: string, body: { title: string; authorName: string }): Promise<string> => {
  const url = baseUri + 'insert'
  const headers = { 'Content-Type': 'application/json' }

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ _type: 'InsertBook', ...body }),
    headers
  }).then((res) => handleRes(res, (res) => res.text()))
}

export const showError = (prefixMsg: string, error: Error): void => {
  const err = `${prefixMsg}, reason: ${error.message}`
  console.error(err)
  message.error(err)
}
