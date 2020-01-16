import React, { useState } from 'react';

import './App.css';
import { FileUploadButton } from './components/react-file-uploader/react-file-uploader';

const App = () => {
  let [ files, onUploadFiles ] = useState ( [] );
  let [ uploadError, onUploadError ] = useState ( null );

  return (
    <div>
      <FileUploadButton 
        label="Upload PDF file (Max size: 5MB)"
        maxSizeMB={5}
        onChange={onUploadFiles}
        onError={onUploadError}
        accept={'.pdf'}
        multiple={true}
      />
      {uploadError && 
      <p>{uploadError}</p>}
      <br />
      {files && files.map ( ( file, index ) => {
        return ( 
          <p key={index}>File {index} - {file.name}</p>
        );
      } )}
    </div>
  );
}

export default App;
