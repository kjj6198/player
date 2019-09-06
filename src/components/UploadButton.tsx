import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  ChangeEvent
} from 'react';
import styled from 'styled-components';

const FileInput = styled.input.attrs<{ onChange: (e: ChangeEvent<HTMLInputElement>) => void}>(props => ({
  type: 'file',
  multiple: true,
  onChange: props.onChange,
}))`
  width: 0;
  height: 0;
  visibility: hidden;
  font-size: 0;
  appearance: none;
`;

const Button = styled.button`
  font-size: 4rem;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  padding: 15px;
  border: 1px solid #27cc95;
  color: #000;
  border-radius: 4px;
`;

type Props = {
  onFilesChanged: (fileList: FileList | null) => void;
};

const UploadButton: React.FC<Props> = ({ onFilesChanged }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFile] = useState<FileList | null>(null);

  useEffect(() => {
    onFilesChanged(files);
  }, [files]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files);

  return (
    <Fragment>
      <FileInput ref={inputRef} onChange={handleChange} />
      <Button onClick={() => inputRef.current && inputRef.current.click()}>
        UPLOAD
      </Button>
    </Fragment>
  );
};

export default UploadButton;
