import { Node, mergeAttributes } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    iframeEmbed: {
      /**
       * Adds an iframe embed to the editor.
       * @param options - Options for the iframe embed.
       * @param options.src - The URL of the iframe content (required).
       * @param options.title - The title of the iframe (optional).
       * @param options.width - The width of the iframe (default: '100%').
       * @param options.height - The height of the iframe (default: '360').
       * @param options.frameborder - The frameborder attribute (default: '0').
       * @param options.allowfullscreen - Whether to allow fullscreen mode (default: true).
       * @returns A command function that can be executed in the editor chain.
       */
      setIframeEmbed: (options: {
        src: string;
        title?: string;
        width?: string;
        height?: string;
        frameborder?: string;
        allowfullscreen?: boolean;
      }) => ReturnType;
    };
  }
}

/**
 * IframeEmbed Extension for Tiptap
 * Enables embedding iframes (e.g., videos, maps) into the editor.
 *
 * Features:
 * - Adds an `iframeEmbed` node to the editor.
 * - Supports customizable attributes like `src`, `title`, `width`, `height`, etc.
 * - Ensures proper rendering and parsing of iframe elements.
 * - Provides a command to insert an iframe embed into the editor.
 */
export const IframeEmbed = Node.create({
  name: 'iframeEmbed',

  group: 'block', // Treat the iframe as a block-level element
  selectable: true, // Allow selection of the iframe
  draggable: true, // Enable dragging and dropping of the iframe

  /**
   * Defines the attributes for the iframe embed node.
   * @returns An object specifying the default attributes and their types.
   */
  addAttributes() {
    return {
      /**
       * The source URL of the iframe content.
       * - Default: null
       * - Required: Yes
       */
      src: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute('src') || null,
        renderHTML: (attributes: Record<string, any>) => ({
          src: attributes.src || ''
        })
      },

      /**
       * The title of the iframe content.
       * - Default: null
       * - Optional: Yes
       */
      title: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute('title') || null,
        renderHTML: (attributes: Record<string, any>) => ({
          title: attributes.title || ''
        })
      },

      /**
       * The width of the iframe.
       * - Default: '100%'
       * - Optional: Yes
       */
      width: {
        default: '100%',
        parseHTML: (element: HTMLElement) => element.getAttribute('width') || '100%',
        renderHTML: (attributes: Record<string, any>) => ({
          width: attributes.width || '100%'
        })
      },

      /**
       * The height of the iframe.
       * - Default: '360'
       * - Optional: Yes
       */
      height: {
        default: '360',
        parseHTML: (element: HTMLElement) => element.getAttribute('height') || '360',
        renderHTML: (attributes: Record<string, any>) => ({
          height: attributes.height || '360'
        })
      },

      /**
       * The frameborder attribute of the iframe.
       * - Default: '0'
       * - Optional: Yes
       */
      frameborder: {
        default: '0',
        parseHTML: (element: HTMLElement) => element.getAttribute('frameborder') || '0',
        renderHTML: (attributes: Record<string, any>) => ({
          frameborder: attributes.frameborder || '0'
        })
      },

      /**
       * Whether to allow fullscreen mode for the iframe.
       * - Default: true
       * - Optional: Yes
       */
      allowfullscreen: {
        default: true,
        parseHTML: (element: HTMLElement) => element.hasAttribute('allowfullscreen'),
        renderHTML: (attributes: Record<string, any>) => ({
          allowfullscreen: attributes.allowfullscreen ? '' : undefined
        })
      }
    };
  },

  /**
   * Parses HTML to create the iframe embed node.
   * @returns An array of rules for parsing HTML.
   */
  parseHTML() {
    return [
      {
        tag: 'iframe[src]', // Match <iframe> elements with a src attribute
        getAttrs: (dom: HTMLElement) => {
          const src = dom.getAttribute('src');
          // if (!this.validateSrc(src)) {
          //   console.warn(`Invalid iframe src: "${src}". Please provide a valid URL.`);
          //   return false;
          // }

          return {
            src,
            title: dom.getAttribute('title') || '',
            width: dom.getAttribute('width') || '100%',
            height: dom.getAttribute('height') || '360',
            frameborder: dom.getAttribute('frameborder') || '0',
            allowfullscreen: dom.hasAttribute('allowfullscreen')
          };
        }
      }
    ];
  },

  /**
   * Renders the iframe embed node as HTML.
   * @param HTMLAttributes - The attributes to apply to the iframe.
   * @returns An array representing the rendered HTML structure.
   */
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      { class: 'iframe-wrapper' }, // Wrapper for responsive behavior
      ['iframe', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    ];
  },

  /**
   * Adds custom commands to the editor.
   * @returns An object containing the `setIframeEmbed` command.
   */
  addCommands() {
    return {
      /**
       * Inserts an iframe embed into the editor.
       * @param options - Options for the iframe embed.
       * @returns A command function that can be executed in the editor chain.
       */
      setIframeEmbed:
        (options: { src: string; title?: string; width?: string; height?: string }) =>
        ({ commands }) => {
          // if (!this.validateSrc(options.src)) {
          //   console.warn(`Invalid iframe src: "${options.src}". Please provide a valid URL.`);
          //   return false;
          // }

          return commands.insertContent({
            type: this.name,
            attrs: {
              src: options.src,
              title: options.title || '',
              width: options.width || '100%',
              height: options.height || '360',
              frameborder: '0',
              allowfullscreen: true
            }
          });
        }
    };
  },

  /**
   * Validates whether the provided `src` is a valid URL.
   * @param src - The URL to validate.
   * @returns True if the URL is valid, false otherwise.
   */
  validateSrc(src: string | null): boolean {
    if (!src) return false;

    try {
      new URL(src);
      return true;
    } catch (error) {
      return false;
    }
  }
});
