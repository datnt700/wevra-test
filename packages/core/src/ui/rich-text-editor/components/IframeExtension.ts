import { Node } from '@tiptap/core';

/**
 * Options for the Iframe extension.
 */
export interface IframeOptions {
  /**
   * Whether to allow fullscreen mode for the iframe.
   * - Default: true
   */
  allowFullscreen?: boolean;

  /**
   * Additional HTML attributes to apply to the iframe wrapper.
   * - Example: { class: 'iframe-wrapper', style: 'border: 1px solid #ccc;' }
   */
  HTMLAttributes?: {
    [key: string]: string;
  };
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    iframe: {
      /**
       * Adds an iframe to the editor.
       * @param options - Options for the iframe.
       * @param options.src - The URL of the iframe content (required).
       * @returns A command function that can be executed in the editor chain.
       */
      setIframe: (options: { src: string }) => ReturnType;
    };
  }
}

/**
 * Iframe Extension for Tiptap
 * Enables embedding iframes (e.g., videos, maps) into the editor.
 *
 * Features:
 * - Adds an `iframe` node to the editor.
 * - Supports customizable attributes like `src`, `frameborder`, and `allowfullscreen`.
 * - Ensures proper rendering and parsing of iframe elements.
 * - Provides a command to insert an iframe into the editor.
 */
export const Iframe = Node.create<IframeOptions>({
  name: 'iframe',

  group: 'block', // Treat the iframe as a block-level element
  atom: true, // Mark the iframe as an atomic node (non-editable)

  /**
   * Defines the default options for the extension.
   * @returns An object specifying the default options.
   */
  addOptions() {
    return {
      /**
       * Whether to allow fullscreen mode for the iframe.
       * - Default: true
       */
      allowFullscreen: true,

      /**
       * Additional HTML attributes to apply to the iframe wrapper.
       * - Default: { class: 'iframe-wrapper' }
       */
      HTMLAttributes: {
        class: 'iframe-wrapper',
      },
    };
  },

  /**
   * Defines the attributes for the iframe node.
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
          src: attributes.src || '',
        }),
      },

      /**
       * The frameborder attribute of the iframe.
       * - Default: 0
       */
      frameborder: {
        default: 0,
        parseHTML: (element: HTMLElement) => element.getAttribute('frameborder') || '0',
        renderHTML: (attributes: Record<string, any>) => ({
          frameborder: attributes.frameborder || '0',
        }),
      },

      /**
       * Whether to allow fullscreen mode for the iframe.
       * - Default: this.options.allowFullscreen
       */
      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: (element: HTMLElement) => element.hasAttribute('allowfullscreen'),
        renderHTML: (attributes: Record<string, any>) => ({
          allowfullscreen: attributes.allowfullscreen ? '' : undefined,
        }),
      },
    };
  },

  /**
   * Parses HTML to create the iframe node.
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
            frameborder: dom.getAttribute('frameborder') || '0',
            allowfullscreen: dom.hasAttribute('allowfullscreen'),
          };
        },
      },
    ];
  },

  /**
   * Renders the iframe node as HTML.
   * @param HTMLAttributes - The attributes to apply to the iframe.
   * @returns An array representing the rendered HTML structure.
   */
  // renderHTML({ HTMLAttributes }) {
  //   return [
  //     'div',
  //     mergeAttributes(this.options.HTMLAttributes, { class: 'iframe-container' }), // Wrapper for responsive behavior
  //     ['iframe', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  //   ];
  // },
  renderHTML({ HTMLAttributes }) {
    return ['div', this.options.HTMLAttributes, ['iframe', HTMLAttributes]];
  },
  /**
   * Adds custom commands to the editor.
   * @returns An object containing the `setIframe` command.
   */
  addCommands() {
    return {
      /**
       * Inserts an iframe into the editor.
       * @param options - Options for the iframe.
       * @returns A command function that can be executed in the editor chain.
       */
      setIframe:
        (options: { src: string }) =>
        ({ tr, dispatch }) => {
          // if (!this.validateSrc(options.src)) {
          //   console.warn(`Invalid iframe src: "${options.src}". Please provide a valid URL.`);
          //   return false;
          // }

          const { selection } = tr;
          const node = this.type.create({
            src: options.src,
            frameborder: '0',
            allowfullscreen: this.options.allowFullscreen,
          });

          if (dispatch) {
            tr.replaceRangeWith(selection.from, selection.to, node);
          }

          return true;
        },
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
    } catch {
      return false;
    }
  },
});
