# react-file-uploader

A customised file uploader component for make your life easier with file upload in a React project.

### Installation

Add react-file-uploader to your project by executing `npm install react-file-uploader` or `yarn add react-file-uploader`.

### Usage

```
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
```