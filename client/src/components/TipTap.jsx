import './TipTap.css'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Youtube from '@tiptap/extension-youtube'
import Link from '@tiptap/extension-link'
import {FaBold, FaItalic, FaUnderline, FaStrikethrough, FaCode, FaHeading, FaList, FaListOl, FaCodepen, FaListUl, FaQuoteLeft, FaYoutube, FaLink, FaUnlink, FaRedo, FaUndo} from 'react-icons/fa'
import { useEffect, useRef, useCallback } from 'react';

const MenuBar = ({ editor }) => {

  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    editor.commands.setYoutubeVideo({
      src: url,
    })
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className='menuButton pb-1.5 flex items-center justify-between border-b-2'>
      <div className='flex items-center justify-between'>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleBold().run()}
            title='Bold'
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={`${editor.isActive('bold') ? 'is-active' : ''}`}
        >
            <FaBold/>
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Italic"
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={editor.isActive('italic') ? 'is-active' : ''}
        >
            <FaItalic />
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Underline"
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleUnderline()
                .run()
            }
            className={editor.isActive('underline') ? 'is-active' : ''}
        >
            <FaUnderline />
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title='Strikethrough'
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={editor.isActive('strike') ? 'is-active' : ''}
        >
            <FaStrikethrough />
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleCode().run()}
            title="Code"
            disabled={
            !editor.can()
                .chain()
                .focus()
                .toggleCode()
                .run()
            }
            className={editor.isActive('code') ? 'is-active' : ''}
        >
            <FaCode />
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            title="Codepen"
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
            <FaCodepen />
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            title="Heading"
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
            <FaHeading />
        </button>
        {/* 
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
            h2
        </button>
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
            h3
        </button>
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        >
            h4
        </button>
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        >
            h5
        </button>
        <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        >
            h6
        </button> */}
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Bulleted List"
            className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
            <FaList />
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Numbered List"
            className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
            <FaListOl />
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Block Quote"
            className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
            <FaQuoteLeft />
        </button>
        <button 
            id="add" 
            title='Youtube'
            onClick={addYoutubeVideo}
            className=""
            >
            <FaYoutube />
        </button>
        <button 
            onClick={setLink}
            title="Link"
            className={editor.isActive('link') ? 'is-active' : ''}
            >
            <FaLink />
        </button>
        <button 
            onClick={() => editor.chain().focus().unsetLink().run()}
            title="Unlink"
            disabled={!editor.isActive('link')}
            >
            <FaUnlink />
        </button>
        {/* <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
            hard break
        </button> */}
      </div>
      <div className='flex items-center justify-between'>
        <button
            type='button'
            onClick={() => editor.chain().focus().undo().run()}
            title="Redo"
            disabled={
            !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
        >
            <FaRedo />
        </button>
        <button
            type='button'
            onClick={() => editor.chain().focus().redo().run()}
            title="Undo"
            disabled={
            !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
        >
            <FaUndo />
        </button>
      </div>
    </div>
  )
}

const TipTap = ({setDesc}) => {
  const editor = useEditor({
    extensions: [
      StarterKit, 
      Underline,
      Youtube,
      Link,
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
    ],
    content: ``,
    onUpdate: ({editor}) => {
        const html = editor.getHTML();
        setDesc(html)
        console.log(html);
    }
  })

  return (
    <div className='border-2 rounded border-gray-500 font-sans'>
      <MenuBar editor={editor} className=""/>
      <EditorContent editor={editor} className="min-h-[300px]"/>
    </div>
  )
}

export default TipTap;
