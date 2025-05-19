import { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { BsImages } from 'react-icons/bs';
import DropzoneFormInput from '../form/DropzoneFormInput';
import { getFeedUsers, CreatePostData } from '../../app/api/ApiService';

const CreatePostCard = () => {
  const [content, setContent] = useState('');
  const [data, setData] = useState(null);
  const [showUploader, setShowUploader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFeedUsers();
        if (response) {
          setData(response);
        }
      } catch (error) {
        console.error('getFeedUsers error:', error);
      }
    };
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!content.trim()) return;
    const response = await CreatePostData(content);
    if (response) {
      setContent('');
      window.location.reload();
    } else {
      alert("Gönderi oluşturulamadı");
    }
  };

  return (
    <Card className="card-body">
      {/* Profil ve içerik */}
      <div className="d-flex mb-3">
        <div className="avatar avatar-xs me-2">
          <span role="button">
            <img
              className="avatar-img rounded-circle"
              src={`${import.meta.env.VITE_API_URL}${data?.profile_picture_url}`}
              alt="Profil"
            />
          </span>
        </div>
        <form className="w-100">
          <textarea
            className="form-control pe-4 rounded"
            rows={3}
            placeholder="What would you like to share today?"
            style={{
              backgroundColor: '#f8f9fa',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#212529',
              border: 'none',
              boxShadow: 'none',
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </form>
      </div>

      {/* Dosya yükleme bileşeni */}
      {showUploader && (
        <div className="mb-3">
          <DropzoneFormInput
            icon={BsImages}
            showPreview
            text="Fotoğraf ya da dosya yüklemek için tıklayın veya sürükleyin."
          />
        </div>
      )}

      {/* Butonlar */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button
          variant="light"
          size="sm"
          className="rounded-pill d-flex align-items-center"
          onClick={() => setShowUploader(!showUploader)}
        >
          <BsImages className="me-1 text-primary" />
          Dosya Ekle
        </Button>

        <Button
          variant="primary"
          className="rounded-pill px-4"
          onClick={handleCreate}
          disabled={!content.trim()}
        >
          Paylaş
        </Button>
      </div>
    </Card>
  );
};

export default CreatePostCard;
