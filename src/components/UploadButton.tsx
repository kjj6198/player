import React, {
  Fragment,
  useState,
  useRef,
  useEffect,
  ChangeEvent
} from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border: 0;
  background-color: transparent;
  appearance: none;
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
      <input ref={inputRef} type="file" multiple onChange={handleChange} />
      <Button onClick={() => inputRef.current && inputRef.current.click()}>
        UPLOAD
      </Button>
    </Fragment>
  );
};

export default UploadButton;
