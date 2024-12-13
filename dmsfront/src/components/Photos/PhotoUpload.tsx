import React, { useState } from 'react';

interface PhotoUploadProps {
  title: string;
  file: File | null;
  onTitleChange: (newTitle: string) => void;
  onFileChange: (newFile: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ 
  title, 
  file, 
  onTitleChange, 
  onFileChange, 
  onSubmit 
}) => {
  return (
    <form onSubmit={onSubmit} className="upload-form">
      <div className="form-group">
        <label htmlFor="photo-title">Photo Title:</label>
        <input
          id="photo-title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter photo title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="photo-file">Select Photo:</label>
        <input
          id="photo-file"
          type="file"
          accept="image/*"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          required
        />
      </div>

      <button 
        type="submit"
        className="upload-button"
        disabled={title.trim() === '' || file === null}
      >
        Upload Photo
      </button>
    </form>
  );
};

export default PhotoUpload;
