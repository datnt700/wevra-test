/**
 * @fileoverview RichTextEditor component built with TipTap
 * Provides WYSIWYG editing with formatting, images, videos, and iframe embeds
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useEditor } from '@tiptap/react';
import Heading from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { FontSize } from './FontSizeExtension';
import TextAlign from '@tiptap/extension-text-align';
import { Iframe } from './IframeExtension';
import { IframeEmbed } from './IframeEmbedExtension';
import { Styled } from './RichTextEditor.styles';
import { RichTextEditorProps } from '..';
import { AddVideoEmbedModal } from './AddVideoEmbedModal';
import { AddIframeEmbedModal } from './AddIframeEmbedModal';
import { Icon } from '../../icon';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Undo,
  Redo,
  Quote,
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Image,
  Video,
  Type,
} from 'lucide-react';

/**
 * RichTextEditor - WYSIWYG editor with rich formatting and media embedding
 *
 * @description
 * A feature-rich text editor built on TipTap that provides:
 * - Text formatting (bold, italic, headings, alignment)
 * - Lists (bullet, numbered)
 * - Block elements (blockquotes, code blocks)
 * - Media embedding (images, videos, iframes)
 * - Custom font sizes
 * - Undo/redo functionality
 * - Controlled or uncontrolled modes
 *
 * The editor integrates with TipTap extensions for maximum flexibility and includes
 * custom extensions for font size, iframe embedding, and video embeds.
 *
 * @example
 * // Basic uncontrolled editor
 * ```tsx
 * <RichTextEditor
 *   defaultValue="<p>Hello world!</p>"
 *   setValue={(html) => console.log(html)}
 * />
 * ```
 *
 * @example
 * // Controlled editor with image upload
 * ```tsx
 * const [content, setContent] = useState('<p>Initial content</p>');
 *
 * <RichTextEditor
 *   value={content}
 *   setValue={setContent}
 *   uploadImage={async ({ file }) => {
 *     const formData = new FormData();
 *     formData.append('file', file);
 *     const response = await fetch('/api/upload', {
 *       method: 'POST',
 *       body: formData,
 *     });
 *     const { url } = await response.json();
 *     return url;
 *   }}
 * />
 * ```
 *
 * @example
 * // Blog post editor with default content
 * ```tsx
 * const [blogContent, setBlogContent] = useState('');
 *
 * <RichTextEditor
 *   defaultValue="<h1>My Blog Post</h1><p>Start writing...</p>"
 *   value={blogContent}
 *   setValue={setBlogContent}
 *   uploadImage={uploadToCloudinary}
 * />
 * ```
 *
 * @example
 * // Rich text field in a form
 * ```tsx
 * <form onSubmit={handleSubmit}>
 *   <label>Description</label>
 *   <RichTextEditor
 *     value={formData.description}
 *     setValue={(html) => setFormData({ ...formData, description: html })}
 *     uploadImage={uploadImage}
 *   />
 *   <button type="submit">Save</button>
 * </form>
 * ```
 */
export const RichTextEditor = ({
  defaultValue,
  value,
  setValue,
  uploadImage,
}: RichTextEditorProps) => {
  const extensions = [
    TextStyle,
    FontSize,
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO: Adjust based on requirements
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO: Adjust based on requirements
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Iframe,
    IframeEmbed,
    Heading.configure({
      levels: [1, 2, 3],
    }),
  ];

  const [fontSize, setFontSize] = useState('16px');
  const [isAddVideoEmbedModalOpen, setIsAddVideoEmbedModalOpen] = useState(false);
  const [isAddIframeEmbedModalOpen, setIsAddIframeEmbedModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions,
    content: value || defaultValue || '',
    onUpdate({ editor }) {
      setValue?.(editor.getHTML());
    },
    onCreate({ editor }) {
      editor.chain().focus().setFontSize(fontSize).run();
    },
  });

  useEffect(() => {
    if (editor && value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  const handleFontSizeChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedFontSize = event.target.value;
      setFontSize(selectedFontSize);
      editor
        ?.chain()
        .focus()
        .setMark('textStyle', { fontSize: `${selectedFontSize}px` })
        .run();
    },
    [editor]
  );

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && editor) {
        const uploadedImageUrl = await uploadImage?.({ file });
        if (uploadedImageUrl) {
          editor.chain().focus().setNode('image', { src: uploadedImageUrl, alt: file.name }).run();
        }
      }
    },
    [editor, uploadImage] // Dependencies array ensures this callback is recreated only when `editor` or `uploadImage` changes
  );
  const addVideoEmbed = (videoUrl: string) => {
    if (editor && videoUrl) {
      editor.chain().focus().setIframe({ src: videoUrl }).run();
    }
    setIsAddVideoEmbedModalOpen(false);
  };

  const addIframeEmbed = (iframeCode: string) => {
    if (editor && iframeCode) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(iframeCode, 'text/html');
      const iframeElement = doc.querySelector('iframe');
      if (iframeElement) {
        const src = iframeElement.getAttribute('src') || '';
        const title = iframeElement.getAttribute('title') || '';
        const width = '100%'; // Force width to 100%
        const height = '100%'; // Force height to 100%
        const frameborder = iframeElement.getAttribute('frameborder') || '0';
        const allowfullscreen = iframeElement.hasAttribute('allowfullscreen');

        editor
          ?.chain()
          .focus()
          .setIframeEmbed({
            src,
            title,
            width,
            height,
            frameborder,
            allowfullscreen,
          })
          .run();
      }
    }
    setIsAddIframeEmbedModalOpen(false);
  };

  const fontSizeOptions = ['14', '16', '18', '24', '28', '32', '36', '48'];
  //const headingLevels: 1 | 2 | 3 | 4 | 5 | 6 = [1, 2, 3, 4, 5, 6]; // Explicitly define valid heading levels

  return (
    <Styled.Wrapper>
      {/* Menu Bar */}
      <Styled.MenuBar>
        <Styled.SelectFont
          value={fontSize}
          onChange={handleFontSizeChange}
          aria-label="Font size selector"
        >
          {fontSizeOptions.map((size) => (
            <option key={size} value={`${size}px`}>
              {size}px
            </option>
          ))}
        </Styled.SelectFont>

        {/* Bold */}
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          disabled={!editor?.can().chain().focus().toggleBold().run()}
          className={editor?.isActive('bold') ? 'is-active' : ''}
          type="button"
        >
          <Icon source={<Bold />} />
        </button>

        {/* Italic */}
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          disabled={!editor?.can().chain().focus().toggleItalic().run()}
          className={editor?.isActive('italic') ? 'is-active' : ''}
          type="button"
        >
          <Icon source={<Italic />} />
        </button>

        {/* Paragraph */}
        <button
          onClick={() => editor?.chain().focus().setParagraph().run()}
          className={editor?.isActive('paragraph') ? 'is-active' : ''}
          type="button"
        >
          <Icon source={<Type />} />
        </button>

        {/* Headings */}
        <button
          onClick={() => editor!.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor!.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          type="button"
        >
          h1
        </button>

        <button
          onClick={() => editor!.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor!.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          type="button"
        >
          h2
        </button>

        <button
          onClick={() => editor!.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor!.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          type="button"
        >
          h3
        </button>

        {/* Align Left */}
        <button
          onClick={() => editor?.chain().focus().setTextAlign('left').run()}
          className={editor?.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          type="button"
        >
          <Icon source={<AlignLeft />} />
        </button>

        {/* Align Center */}
        <button
          onClick={() => editor?.chain().focus().setTextAlign('center').run()}
          className={editor?.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          type="button"
        >
          <Icon source={<AlignCenter />} />
        </button>

        {/* Align Right */}
        <button
          onClick={() => editor?.chain().focus().setTextAlign('right').run()}
          className={editor?.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          type="button"
        >
          <Icon source={<AlignRight />} />
        </button>

        {/* Bullet List */}
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={editor?.isActive('bulletList') ? 'is-active' : ''}
          type="button"
        >
          <Icon source={<List />} />
        </button>

        {/* Ordered List */}
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={editor?.isActive('orderedList') ? 'is-active' : ''}
          type="button"
        >
          <Icon source={<ListOrdered />} />
        </button>

        {/* Blockquote */}
        <button
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={editor?.isActive('blockquote') ? 'is-active' : ''}
          type="button"
        >
          <Icon source={<Quote />} />
        </button>

        {/* Undo */}
        <button
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().chain().focus().undo().run()}
          type="button"
        >
          <Icon source={<Undo />} />
        </button>

        {/* Redo */}
        <button
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().chain().focus().redo().run()}
          type="button"
        >
          <Icon source={<Redo />} />
        </button>

        {/* Add Image */}
        <button onClick={handleAddImage} type="button">
          <Icon source={<Image />} />
        </button>
        <Styled.UploadImageInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* Add Video Embed */}
        <button onClick={() => setIsAddVideoEmbedModalOpen(true)} type="button">
          <Icon source={<Video />} />
        </button>

        {/* Add Iframe Embed */}
        <button onClick={() => setIsAddIframeEmbedModalOpen(true)} type="button">
          <Icon source={<Code />} />
        </button>
      </Styled.MenuBar>

      {/* Editor Content */}
      {editor && <Styled.Editor editor={editor} />}

      {/* Modals */}
      <AddVideoEmbedModal
        isOpen={isAddVideoEmbedModalOpen}
        onClose={() => setIsAddVideoEmbedModalOpen(false)}
        addVideoEmbed={addVideoEmbed}
      />
      <AddIframeEmbedModal
        isOpen={isAddIframeEmbedModalOpen}
        onClose={() => setIsAddIframeEmbedModalOpen(false)}
        addIframeEmbed={addIframeEmbed}
      />
    </Styled.Wrapper>
  );
};

RichTextEditor.displayName = 'RichTextEditor';
