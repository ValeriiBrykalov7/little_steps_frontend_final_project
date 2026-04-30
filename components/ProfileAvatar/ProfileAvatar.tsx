import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { updateAvatar } from '@/lib/api/clientApi';

const ProfileAvatar=()=>{
  const onDrop = useCallback((acceptedFiles: File[]) => {
  const file = acceptedFiles[0];
  if (file) {
    updateAvatar(file);
  }
}, []);
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag and drop some files here, or click to select files</p>
      }
    </div>
  )
}
export default ProfileAvatar;