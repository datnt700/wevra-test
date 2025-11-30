import React from 'react';
import { Styled } from './TextArea.styles';
import { TextAreaProps } from '..';

/**
 * A reusable TextArea component designed for multi-line text input with optional error handling.
 *
 * Features:
 * - Supports dynamic error states based on validation.
 * - Provides accessibility support with proper ARIA attributes and semantic HTML structure.
 * - Includes styled components for consistent styling of the wrapper, textarea, and error message.
 * - Styled using Emotion's `styled` API for modularity and reusability.
 * - Grouped styles under a `Styled` object for better organization and maintainability.
 *
 * Props:
 * - `id`: Unique identifier for the textarea (required for accessibility).
 * - `name`: Name attribute for the textarea (used in form submissions).
 * - `className`: Optional class name for additional styling.
 * - `placeholder`: Placeholder text displayed when the textarea is empty.
 * - `validate`: Validation state ('error' indicates an error).
 * - `value`: Controlled value of the textarea.
 * - `onChange`: Callback function triggered on input change.
 * - `errorMessage`: Error message to display below the textarea when validation fails.
 */
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      name,
      className,
      placeholder,
      validate,
      value,
      onChange,
      errorMessage,
      ariaDescribedBy,
      readOnly,
      disabled,
      ...other
    },
    ref
  ) => {
    // Automatically set error state if errorMessage is provided
    const hasError = validate === 'error' || !!errorMessage;

    return (
      <Styled.Wrapper $hasError={hasError} className={className}>
        <Styled.TextArea
          id={id}
          name={name}
          placeholder={placeholder}
          data-testid="textarea"
          value={value}
          onChange={onChange}
          $hasError={hasError}
          aria-describedby={ariaDescribedBy}
          readOnly={readOnly}
          disabled={disabled}
          ref={ref}
          {...other}
        />
        {errorMessage && <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>}
      </Styled.Wrapper>
    );
  }
);

TextArea.displayName = 'TextArea';
