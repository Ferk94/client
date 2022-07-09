import React, { useEffect, useRef } from "react";

export const FilesInput = ({ value, id, type, onChange }) => {
  const inputRef = useRef();
  
  useEffect(() => {
    if (value === []) {
      inputRef.current.value = [];
    } else {
      inputRef.current.files = value;
    }
  }, [value]);
  
  return <input type={type} multiple name='file' id={id} ref={inputRef} onChange={onChange} />;
};
