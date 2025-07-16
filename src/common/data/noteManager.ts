import superjson from 'superjson'

import { join } from '@tauri-apps/api/path'
import { BaseDirectory, DirEntry, exists, mkdir, readDir, readTextFile, remove, writeTextFile } from '@tauri-apps/plugin-fs'
import { NoteData } from './noteData'

export const NOTE_DIR = 'notes'

class NoteManager {
  public async loadNotes() {
    const notes: NoteData[] = []

    const processEntriesRecursively = async (parent: string, entries: DirEntry[]) => {
      for (const entry of entries) {
        if (!entry.isFile) continue

        if (entry.name.endsWith('.json')) {
          const path = await join(parent, entry.name)
          const note = await this.readNote(path)
          notes.push(note)
        }
      }
    }

    const entries = await readDir(NOTE_DIR, { baseDir: BaseDirectory.AppLocalData })
    await processEntriesRecursively(NOTE_DIR, entries)

    return notes
  }

  public async saveNote(note: NoteData) {
    if (!(await exists(NOTE_DIR, { baseDir: BaseDirectory.AppLocalData }))) {
      await mkdir(NOTE_DIR, { baseDir: BaseDirectory.AppLocalData })
    }

    writeTextFile(await join(NOTE_DIR, `${note.id}.json`), superjson.stringify(note), {
      baseDir: BaseDirectory.AppLocalData
    })
  }

  public async readNote(path: string) {
    const note = await readTextFile(path, {
      baseDir: BaseDirectory.AppLocalData
    })

    const noteData = superjson.parse<NoteData>(note)

    return noteData
  }

  public async readNoteByID(id: string) {
    const path = await join(NOTE_DIR, `${id}.json`)
    return this.readNote(path)
  }

  public async deleteNote(id: string) {
    const path = await join(NOTE_DIR, `${id}.json`)
    await remove(path, { baseDir: BaseDirectory.AppLocalData })
  }
}

const noteManager = new NoteManager()

export default noteManager
