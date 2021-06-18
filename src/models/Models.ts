export interface Book {
  id: string
  title: string
  authorName: string
  available: boolean
}

export interface InsertBookReq {
  authorName: string
  title: string
}
