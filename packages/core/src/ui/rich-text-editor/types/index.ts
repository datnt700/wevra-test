export interface RichTextEditorProps {
  defaultValue?: string;
  value?: string;
  setValue?: (value: string) => void;
  uploadImage: ({ file }: { file: File }) => Promise<string>;
}
