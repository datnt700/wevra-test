import { Extension } from '@tiptap/react';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Sets the font size on selected text.
       * @param value - The font size value (e.g., '16px', '20px').
       * @returns A command function that can be executed in the editor chain.
       */
      setFontSize: (value: string) => ReturnType;

      /**
       * Unsets the font size on selected text, reverting to the default style.
       * @returns A command function that can be executed in the editor chain.
       */
      unsetFontSize: () => ReturnType;
    };
  }
}

/**
 * FontSize Extension for Tiptap
 * Enables setting and unsetting font sizes on text.
 *
 * Features:
 * - Adds a `fontSize` attribute to the `textStyle` mark.
 * - Provides commands to set or unset the font size.
 * - Ensures proper rendering and parsing of font sizes in HTML.
 */
export const FontSize = Extension.create({
  name: 'fontSize',

  /**
   * Defines the options for the extension.
   * @returns An object specifying the types where the font size can be applied.
   */
  addOptions() {
    return {
      /**
       * Specifies the mark types where the font size can be applied.
       * Default: ['textStyle']
       */
      types: ['textStyle'] as const // Ensure type safety with `as const`
    };
  },

  /**
   * Adds global attributes to the specified mark types.
   * @returns An array of global attributes configurations.
   */
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            /**
             * The font size attribute.
             * - Default: null (no font size applied).
             * - ParseHTML: Extracts the font size from the element's inline style.
             * - RenderHTML: Applies the font size as an inline style if defined.
             */
            default: null,
            parseHTML: (element: HTMLElement) => {
              const fontSize = element.style.fontSize.replace(/['"]+/g, '');
              return fontSize ? { fontSize } : {};
            },
            renderHTML: (attributes: Record<string, any>) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize};`
              };
            }
          }
        }
      }
    ];
  },

  /**
   * Adds custom commands to the editor.
   * @returns An object containing the `setFontSize` and `unsetFontSize` commands.
   */
  addCommands() {
    return {
      /**
       * Sets the font size on the selected text.
       * @param fontSize - The font size value (e.g., '16px', '20px').
       * @returns A command function that can be executed in the editor chain.
       */
      setFontSize:
        (fontSize: string) =>
        ({ chain }) => {
          const fontSizeRegex = /^(\d*\.?\d+)(px|em|rem|%|in|cm|mm|ex|pt|pc|vw|vh|vmin|vmax)$/;

          if (!fontSizeRegex.test(fontSize)) {
            console.warn(`Invalid font size: "${fontSize}". Please provide a valid CSS font size.`);
            return false;
          }

          return chain().setMark('textStyle', { fontSize }).run();
        },

      /**
       * Unsets the font size on the selected text, reverting to the default style.
       * @returns A command function that can be executed in the editor chain.
       */
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run()
    };
  },

  /**
   * Validates whether the provided font size is a valid CSS value.
   * @param fontSize - The font size value to validate.
   * @returns True if the font size is valid, false otherwise.
   */
  validateFontSize(fontSize: string): boolean {
    // Regex to validate CSS font size values (e.g., '16px', '20em', '1.5rem')
    const fontSizeRegex = /^(\d*\.?\d+)(px|em|rem|%|in|cm|mm|ex|pt|pc|vw|vh|vmin|vmax)$/;

    return fontSizeRegex.test(fontSize);
  }
});
