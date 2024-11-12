import React, { useState, useRef } from 'react';
import { Save, Image, Trash2, Plus } from 'lucide-react';
import { Card, CardContent } from '../ui/Card.jsx';
import axios from 'axios';

const DocumentCreationSection = () => {
  const [documentData, setDocumentData] = useState({
    title: 'Untitled',
    isDraft: true,
    pages: [
      {
        title: 'Introduction',
        content: '',
        images: []
      }
    ]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const fileInputRef = useRef(null);

  const handleDocumentTitleChange = (e) => {
    setDocumentData(prev => ({
      ...prev,
      title: e.target.value
    }));
  };

  const handlePageTitleChange = (index, value) => {
    setDocumentData(prev => ({
      ...prev,
      pages: prev.pages.map((page, i) => 
        i === index ? { ...page, title: value } : page
      )
    }));
  };

  const handlePageContentChange = (index, value) => {
    setDocumentData(prev => ({
      ...prev,
      pages: prev.pages.map((page, i) => 
        i === index ? { ...page, content: value } : page
      )
    }));
  };

  const addNewPage = () => {
    setDocumentData(prev => ({
      ...prev,
      pages: [...prev.pages, { title: `Page ${prev.pages.length + 1}`, content: '', images: [] }]
    }));
    setActivePageIndex(documentData.pages.length);
  };

  const removePage = (index) => {
    if (documentData.pages.length > 1) {
      setDocumentData(prev => ({
        ...prev,
        pages: prev.pages.filter((_, i) => i !== index)
      }));
      setActivePageIndex(Math.max(0, activePageIndex - 1));
    }
  };

  const handleImageSelection = (e, pageIndex) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setDocumentData(prev => ({
        ...prev,
        pages: prev.pages.map((page, i) => 
          i === pageIndex 
            ? { 
                ...page, 
                images: [...page.images, { 
                  file,
                  previewUrl: imageUrl,
                  caption: file.name 
                }]
              } 
            : page
        )
      }));
    }
  };

  const removeImage = (pageIndex, imageIndex) => {
    setDocumentData(prev => ({
      ...prev,
      pages: prev.pages.map((page, i) => {
        if (i === pageIndex) {
          const newImages = page.images.filter((_, imgI) => imgI !== imageIndex);
          // Revoke the object URL to prevent memory leaks
          URL.revokeObjectURL(page.images[imageIndex].previewUrl);
          return { ...page, images: newImages };
        }
        return page;
      })
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
  
      // Create the document
      const documentResponse = await axios.post('/api/v1/documents/', {
        title: documentData.title,
        isDraft: documentData.isDraft,
        pages: documentData.pages.map((page) => ({
          title: page.title,
          content: page.content,
        })),
      });
  
      // Upload images and associate them with the pages
      for (const [pageIndex, page] of documentData.pages.entries()) {
        for (const image of page.images) {
          const formData = new FormData();
          formData.append('image', image.file);
          formData.append('uploadType', 'cloudinary');
  
          const imageResponse = await axios.post('/api/v1/pages/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          documentData.pages[pageIndex].image = {
            src: imageResponse.data.data.url,
            public_id: imageResponse.data.data.public_id,
          };
        }
      }
  
      console.log('Document and pages created successfully');
    } catch (error) {
      console.error('Error creating document:', error);
      // Display a meaningful error message to the user
      // setErrorMessage('There was an error saving the document. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // The rest of the component remains the same
    <div className="document-section">
    <Card className="card">
      <CardContent className="card-content">
        <div className="document-title">
          <label className="label">Document Title</label>
          <input
            type="text"
            value={documentData.title}
            onChange={handleDocumentTitleChange}
            className="input"
            placeholder="Enter document title"
          />
        </div>

        <div className="pages-navigation">
          <div className="pages-list">
            {documentData.pages.map((page, index) => (
              <div
                key={index}
                onClick={() => setActivePageIndex(index)}
                className={`page-item ${activePageIndex === index ? 'active-page' : ''}`}
              >
                {page.title}
              </div>
            ))}
            <button onClick={addNewPage} className="add-page-button">
              <Plus size={16} /> Add Page
            </button>
          </div>

          <div className="page-content">
            <div className="page-title">
              <input
                type="text"
                value={documentData.pages[activePageIndex].title}
                onChange={(e) => handlePageTitleChange(activePageIndex, e.target.value)}
                className="input-title"
              />
              {documentData.pages.length > 1 && (
                <button
                  onClick={() => removePage(activePageIndex)}
                  className="remove-page-button"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <textarea
              value={documentData.pages[activePageIndex].content}
              onChange={(e) => handlePageContentChange(activePageIndex, e.target.value)}
              className="textarea-content"
              placeholder="Enter page content..."
            />

            <div className="image-upload">
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleImageSelection(e, activePageIndex)}
                accept="image/*"
                className="file-input"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="add-image-button"
              >
                <Image size={16} /> Add Image
              </button>

              <div className="image-preview">
                {documentData.pages[activePageIndex].images.map((image, index) => (
                  <div key={index} className="image-container">
                    <img
                      src={image.previewUrl}
                      alt={image.caption}
                      className="image"
                    />
                    <button
                      onClick={() => removeImage(activePageIndex, index)}
                      className="remove-image-button"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="save-controls">
          <label className="draft-checkbox">
            <input
              type="checkbox"
              checked={documentData.isDraft}
              onChange={(e) => setDocumentData(prev => ({ ...prev, isDraft: e.target.checked }))}
            />
            Save as draft
          </label>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`save-button ${isLoading ? 'disabled' : ''}`}
          >
            <Save size={16} />
            {isLoading ? 'Saving...' : 'Save Document'}
          </button>
        </div>
      </CardContent>
    </Card>
  </div>
  );
};

export default DocumentCreationSection;