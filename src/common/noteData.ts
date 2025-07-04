import { convert } from 'html-to-text'

export interface NoteData {
  id: string
  title: string
  subtitle: string
  content: string
  createTime: Date
  updateTime: Date
}

export const initialNotes: NoteData[] = [
  {
    id: '1',
    title: '',
    subtitle: '',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    createTime: new Date(),
    updateTime: new Date()
  },
  {
    id: '2',
    title: '',
    subtitle: '',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    createTime: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    updateTime: new Date()
  },
  {
    id: '3',
    title: '',
    subtitle: '',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    createTime: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updateTime: new Date()
  },
  {
    id: '4',
    title: '',
    subtitle: '',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    createTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updateTime: new Date()
  },
  {
    id: '5',
    title: '',
    subtitle: '',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin',
    createTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updateTime: new Date()
  }
]

for (const note of initialNotes) {
  note.title = getNoteTitle(note.content)
  note.subtitle = getNoteContent(note.content)
}

export function getNoteTitle(content: string) {
  return getNoteContent(content, 100, true)
}

export function getNoteContent(content: string, maxLength = 500, isTitle = false) {
  // 移除HTML标签
  const cleanContent = content.substring(0, maxLength)

  const text = convert(cleanContent, {
    wordwrap: false,
    selectors: [
      {
        selector: 'h1',
        options: {
          uppercase: false
        }
      },
      {
        selector: 'h2',
        options: {
          uppercase: false
        }
      },
      {
        selector: 'h3',
        options: {
          uppercase: false
        }
      },
      {
        selector: 'h4',
        options: {
          uppercase: false
        }
      },
      {
        selector: 'h5',
        options: {
          uppercase: false
        }
      },
      {
        selector: 'h6',
        options: {
          uppercase: false
        }
      }
    ]
  })
  const lines = text.split('\n').filter((line) => line.trim() !== '')

  if (isTitle) return lines[0] || ''
  else if (lines.length === 1) return lines[0]
  else return lines.slice(1).join('\n')
}
