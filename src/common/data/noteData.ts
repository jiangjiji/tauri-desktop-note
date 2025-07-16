import { convert } from 'html-to-text'

export interface Position {
  x: number
  y: number
  width: number
  height: number
}

export interface NoteData {
  id: string
  title: string
  subtitle: string
  content: string
  createTime: Date
  updateTime: Date
  position: Position
  isShow: boolean
  isPin: boolean
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

export function getNewNote(): NoteData {
  const content = '<h1>New Note</h1><p>Start editing your note...</p>'

  const newNote = {
    id: crypto.randomUUID(),
    title: getNoteTitle(content),
    subtitle: getNoteContent(content),
    content,
    createTime: new Date(),
    updateTime: new Date(),
    position: {
      x: 100,
      y: 100,
      width: 300,
      height: 300
    },
    isShow: true,
    isPin: false
  }

  return newNote
}
