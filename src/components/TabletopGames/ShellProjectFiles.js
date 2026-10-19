import React, { useState } from 'react';
import { shellMaterials } from './shellOrHighWaters';
import './ShellProjectFiles.css';

export default function ShellProjectFiles() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { rulebook, components, photos } = shellMaterials;

  return <>
    <section className="game-rules-section" id="shell-rulebook">
      <h3 className="game-subtitle">Game Rules</h3>
      <div className="protected-pdf-viewer shell-document-preview" role="region" aria-label="Rulebook preview" tabIndex={0}>
        {rulebook.pages.map((page, index) => <img key={page.src} src={page.src}
          alt={'Rulebook page ' + (index + 1) + ': ' + page.caption} width={page.width} height={page.height} loading="lazy" />)}
      </div>
      <div className="rules-actions">
        <a href={rulebook.original} className="btn-game" target="_blank" rel="noopener noreferrer">View Rules</a>
        <a href={rulebook.original} className="btn-game" download>Download</a>
      </div>
    </section>

    <section className="game-files-section shell-materials">
      <h3 className="game-subtitle">Game Materials</h3>
      <div className="game-files-grid">
        {components.map(file => <button type="button" key={file.title}
          className={'game-file-card' + (selectedFile === file ? ' active' : '')}
          aria-pressed={selectedFile === file} onClick={() => setSelectedFile(file)}>
          <span className="file-icon" aria-hidden="true">{file.format === 'PNG' ? 'IMG' : 'PDF'}</span>
          <span className="file-info">
            <span className="file-name">{file.title}</span>
            <span className="file-description">{file.description}</span>
          </span>
        </button>)}
      </div>
      {selectedFile && <div className="shell-material-preview">
        <h3 className="game-subtitle">Preview</h3>
        <div key={selectedFile.original} className="protected-pdf-viewer shell-document-preview" role="region" aria-label={selectedFile.title + ' preview'} tabIndex={0}>
          <img key={selectedFile.src} src={selectedFile.src} alt={selectedFile.caption} width={selectedFile.width} height={selectedFile.height} />
        </div>
        <div className="rules-actions">
          <a href={selectedFile.original} className="btn-game" target="_blank" rel="noopener noreferrer">View File</a>
          <a href={selectedFile.original} className="btn-game" download>Download</a>
        </div>
      </div>}
    </section>

    <section className="game-preview-section shell-gameplay-photos">
      <h3 className="game-subtitle">Gameplay Photos</h3>
      <div className="concept-art-gallery">
        <img className="concept-art-featured-image" src={photos[photoIndex].src} alt={photos[photoIndex].caption}
          width={photos[photoIndex].width} height={photos[photoIndex].height} loading="lazy" />
        <div className="concept-art-thumbnails" role="group" aria-label="Gameplay photos">
          {photos.map((photo, index) => <button type="button" key={photo.src}
            className={'concept-art-thumbnail' + (photoIndex === index ? ' active' : '')}
            aria-label={'View gameplay photo ' + (index + 1)} aria-pressed={photoIndex === index} onClick={() => setPhotoIndex(index)}>
            <img src={photo.src} alt="" width={photo.width} height={photo.height} loading="lazy" />
          </button>)}
        </div>
      </div>
    </section>
  </>;
}
