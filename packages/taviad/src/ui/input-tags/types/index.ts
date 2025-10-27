interface TagType {
  id: string;
  name: string;
  color?: string;
}

export interface InputTagsProps {
  id?: string;
  type?: string;
  placeholder?: string;
  status?: 'default' | 'error';
  className?: string;
  tags?: TagType[];
  tagsSuggestion?: TagType[];
  onChange?: (data: { name: string }) => void;
  removeTag?: (id: string) => void;
}
