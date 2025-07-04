export interface NoteData {
  id: string
  title: string
  content: string
  createTime: Date
  updateTime: Date
}

export const initialNotes: NoteData[] = [
  {
    id: '1',
    title: 'Title 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    id: '2',
    title: 'Title 2',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    createTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    updateTime: new Date()
  },
  {
    id: '3',
    title: 'Title 3',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    createTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updateTime: new Date()
  },
  {
    id: '4',
    title: 'Title 4',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    createTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updateTime: new Date()
  },
  {
    id: '5',
    title: 'Title 5',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    createTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updateTime: new Date()
  }
]
