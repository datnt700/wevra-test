type Type = 'column' | 'row';

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  type?: Type;
  input: React.ReactNode;
}
