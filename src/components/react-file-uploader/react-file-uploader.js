import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import async from 'async';

import './style.css';

export const FileUploadButton = ( {
  className = 'fileUploaderButton',
  style,
  label = 'Upload File',
  accept = '.png, .jpeg, .gif, .jpg',
  multiple = false,
  maxSizeMB, // number
  onChange,
  onError
} ) => {
  let inputRef = useRef ( null );
  return ( 
    <div>
      <FileUploader 
        inputRef={inputRef}
        accept={accept}
        multiple={multiple}
        maxSizeMB={maxSizeMB}
        onChange={onChange}
        onError={onError}
        isHidden={true}
      />
      <button 
        className={className}
        style={style}
        onClick={() => inputRef.current.click ()}
      >
        {label}
      </button>
    </div>
  );
}

export const FileUploader = ( {
  inputRef,
  accept = '.png, .jpeg, .gif, .jpg',
  multiple = false,
  readAsBinary = false,
  maxSizeMB, // number
  onChange,
  onError,
  isHidden = false
} ) => {
  const onFileUpload = ( { target: { files }} ) => {
    if ( !files || files.length <= 0 )
      return;

    let uploadedFiles = [];
    async.each ( files, ( file, callback ) => {
      if ( maxSizeMB 
        && file.size > maxSizeMB * 1000000 ) {
        return callback ( `'${file.name}' is too large, file must be ${maxSizeMB} Mb or below.` );
      }

      let reader = new FileReader ();
      if ( readAsBinary )
        reader.readAsBinaryString ( file );
      else
        reader.readAsDataURL ( file );
      reader.onerror = err => {
        return callback ( err );
      }
      reader.onloadend = ( e ) => {
        if ( readAsBinary )
          uploadedFiles.push ( e.target.result );
        else
          uploadedFiles.push ( file );
        callback ();
      }
    }, ( err ) => {
      if ( err ) {
        if ( onError )
          onError ( err );
      }
      else {
        onChange ( uploadedFiles );
      }
    } );
  }

  return ( 
    <input
      type="file"
      style={{
        display: isHidden ? 'none' : 'block'
      }}
      ref={inputRef}
      onChange={onFileUpload}
      accept={accept}
      multiple={multiple}
    />
  );
}

FileUploadButton.propTypes = {
  label: PropTypes.oneOfType ( [
    PropTypes.string,
    PropTypes.element
  ] ),
  accept: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  maxSizeMB: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func,
  isHidden: PropTypes.bool
}

FileUploader.propTypes = {
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  readAsBinary: PropTypes.bool,
  maxSizeMB: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onError: PropTypes.func,
  isHidden: PropTypes.bool
}