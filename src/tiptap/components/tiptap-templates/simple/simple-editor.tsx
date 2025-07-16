import { EditorContent, EditorContext, useEditor } from '@tiptap/react'
import * as React from 'react'

// --- Tiptap Core Extensions ---
import { Highlight } from '@tiptap/extension-highlight'
import { Image } from '@tiptap/extension-image'
import { Subscript } from '@tiptap/extension-subscript'
import { Superscript } from '@tiptap/extension-superscript'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import { TextAlign } from '@tiptap/extension-text-align'
import { Typography } from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import { StarterKit } from '@tiptap/starter-kit'

// --- Custom Extensions ---
import { Link } from '@/tiptap/components/tiptap-extension/link-extension'
import { Selection } from '@/tiptap/components/tiptap-extension/selection-extension'
import { TrailingNode } from '@/tiptap/components/tiptap-extension/trailing-node-extension'

// --- UI Primitives ---
import { Button } from '@/tiptap/components/tiptap-ui-primitive/button'
import { Spacer } from '@/tiptap/components/tiptap-ui-primitive/spacer'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/tiptap/components/tiptap-ui-primitive/toolbar'

// --- Tiptap Node ---
import '@/tiptap/components/tiptap-node/code-block-node/code-block-node.scss'
import '@/tiptap/components/tiptap-node/image-node/image-node.scss'
import { ImageUploadNode } from '@/tiptap/components/tiptap-node/image-upload-node/image-upload-node-extension'
import '@/tiptap/components/tiptap-node/list-node/list-node.scss'
import '@/tiptap/components/tiptap-node/paragraph-node/paragraph-node.scss'

// --- Tiptap UI ---
import { BlockquoteButton } from '@/tiptap/components/tiptap-ui/blockquote-button'
import { CodeBlockButton } from '@/tiptap/components/tiptap-ui/code-block-button'
import {
  ColorHighlightPopover,
  ColorHighlightPopoverButton,
  ColorHighlightPopoverContent
} from '@/tiptap/components/tiptap-ui/color-highlight-popover'
import { HeadingDropdownMenu } from '@/tiptap/components/tiptap-ui/heading-dropdown-menu'
import { ImageUploadButton } from '@/tiptap/components/tiptap-ui/image-upload-button'
import { LinkButton, LinkContent, LinkPopover } from '@/tiptap/components/tiptap-ui/link-popover'
import { ListDropdownMenu } from '@/tiptap/components/tiptap-ui/list-dropdown-menu'
import { MarkButton } from '@/tiptap/components/tiptap-ui/mark-button'
import { TextAlignButton } from '@/tiptap/components/tiptap-ui/text-align-button'
import { UndoRedoButton } from '@/tiptap/components/tiptap-ui/undo-redo-button'

// --- Icons ---
import { ArrowLeftIcon } from '@/tiptap/components/tiptap-icons/arrow-left-icon'
import { HighlighterIcon } from '@/tiptap/components/tiptap-icons/highlighter-icon'
import { LinkIcon } from '@/tiptap/components/tiptap-icons/link-icon'

// --- Hooks ---
import { useCursorVisibility } from '@/tiptap/hooks/use-cursor-visibility'
import { useWindowSize } from '@/tiptap/hooks/use-window-size'

// --- Components ---

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from '@/tiptap/lib/tiptap-utils'

// --- Styles ---
import '@/tiptap/components/tiptap-templates/simple/simple-editor.scss'

import '@/tiptap/styles/_keyframe-animations.scss'
import '@/tiptap/styles/_variables.scss'

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
}) => {
  return (
    <>
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={['bulletList', 'orderedList', 'taskList']} />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? <ColorHighlightPopover /> : <ColorHighlightPopoverButton onClick={onHighlighterClick} />}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}
    </>
  )
}

const MobileToolbarContent = ({ type, onBack }: { type: 'highlighter' | 'link'; onBack: () => void }) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === 'highlighter' ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === 'highlighter' ? <ColorHighlightPopoverContent /> : <LinkContent />}
  </>
)

export function SimpleEditor({
  isWidget,
  value,
  onChange
}: {
  isWidget: boolean
  value: string
  onChange: (value: string) => void
}) {
  const windowSize = useWindowSize()
  const [mobileView, setMobileView] = React.useState<'main' | 'highlighter' | 'link'>('main')
  const toolbarRef = React.useRef<HTMLDivElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        'aria-label': 'Main content area, start typing to enter text.'
      }
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,

      Selection,
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error('Upload failed:', error)
      }),
      TrailingNode,
      Link.configure({ openOnClick: false })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  const bodyRect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0
  })

  React.useEffect(() => {
    // if (!isWidget && mobileView !== 'main') {
    //   setMobileView('main')
    // }
  }, [isWidget, mobileView])

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false)
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <EditorContext.Provider value={{ editor }}>
      <Toolbar ref={toolbarRef} variant={isWidget ? 'fixed-widget' : 'fixed'}>
        {mobileView === 'main' ? (
          <MainToolbarContent
            onHighlighterClick={() => setMobileView('highlighter')}
            onLinkClick={() => setMobileView('link')}
            isMobile={false}
          />
        ) : (
          <MobileToolbarContent
            type={mobileView === 'highlighter' ? 'highlighter' : 'link'}
            onBack={() => setMobileView('main')}
          />
        )}
      </Toolbar>
      <div className="content-wrapper">
        <EditorContent editor={editor} role="presentation" className="simple-editor-content" />
      </div>
    </EditorContext.Provider>
  )
}
