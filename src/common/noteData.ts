export interface Note {
  id: string
  title: string
  content: string
  date: Date
}

export const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    date: new Date()
  },
  {
    id: '2',
    title: 'Title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    title: 'Title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: '4',
    title: 'Title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: '5',
    title: 'Title',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  }
]
