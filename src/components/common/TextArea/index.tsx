import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import classes from './textArea.module.css';

interface TextAreaProps {
  value: string;
  onChange: (newValue: string) => void;
  readOnly?: boolean;
}

function TextArea({ value, onChange, readOnly }: TextAreaProps) {
  const [isReadOnly] = useState(readOnly ? true : false);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      readOnly={isReadOnly}
      style={{ height: '100%' }}
      className={classes.textArea}
    />
  )
}

export default TextArea;