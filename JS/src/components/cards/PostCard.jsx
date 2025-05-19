import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  DropdownDivider,
  Modal,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  BsHeart,
  BsHeartFill,
  BsChatFill,
  BsReplyFill,
  BsBookmark,
  BsEnvelope,
  BsLink,
  BsShare,
  BsSend,
} from "react-icons/bs";
import { Link } from "react-router-dom";

/**
 * PostCard – tek bir sosyal gönderi kartı
 * - Yorum ikonuna tıklandığında Modal açılır
 * - Mevcut yorumlar getirildikten sonra listelenir
 * - Kullanıcı yeni yorum ekleyebilir
 */
const PostCard = ({
  post_id,
  title,
  desc,
  image,
  name,
  date,
  likesCount: initialLikes,
  commentsCount: initialComments,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [commentList, setCommentList] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);

  /** Like işlemi */
  const toggleLike = async () => {
    setLiked(!liked);
    setLikes((prev) => prev + (liked ? -1 : 1));
    try {
      await fetch(`/api/posts/${post_id}/like`, {
        method: "POST",
        body: JSON.stringify({ like: !liked }),
        headers: { "Content-Type": "application/json" },
      });
    } catch {
      // geri al
      setLiked(liked);
      setLikes((prev) => prev + (liked ? 1 : -1));
    }
  };

  /** Yorumları getir */
  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/posts/${post_id}/comments`);
      const data = await res.json();
      setCommentList(data);
      setComments(data.length);
    } catch (_) {
      /* hata yok say */
    }
  };

  /** modal aç – önce yorumları getir */
  const openComments = () => {
    fetchComments();
    setShowComments(true);
  };

  /** yeni yorum ekle */
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setSending(true);
    try {
      const res = await fetch(`/api/posts/${post_id}/comments`, {
        method: "POST",
        body: JSON.stringify({ text: newComment }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setCommentList((c) => [...c, saved]);
      setComments((c) => c + 1);
      setNewComment("");
      alert("Yorum başarıyla gönderildi ✔️");
    } catch (_) {
      alert("Yorum gönderilirken hata oluştu ❌");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Ana kart */}
      <Card className="mb-4">
        <CardHeader className="d-flex align-items-center border-0 pb-0">
          <img
            src={image}
            alt="avatar"
            className="avatar-img rounded-circle me-2"
            style={{ width: 40, height: 40 }}
          />
          <div className="flex-grow-1">
            <h6 className="mb-0">{name}</h6>
            <small className="text-muted">
              {new Date(date).toLocaleString()}
            </small>
          </div>
          <Dropdown>
            <DropdownToggle
              as="a"
              className="text-secondary btn btn-secondary-soft-hover py-1 px-2 content-none"
            >
              <BsReplyFill />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem>
                <BsBookmark size={18} className="pe-2" /> Kaydet
              </DropdownItem>
              <DropdownItem>
                <BsEnvelope size={18} className="pe-2" /> Mesaj Gönder
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem>
                <BsLink size={18} className="pe-2" /> Bağlantıyı kopyala
              </DropdownItem>
              <DropdownItem>
                <BsShare size={18} className="pe-2" /> Paylaş…
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>

        <CardBody>
          <h5>{title}</h5>
          <p>{desc}</p>
        </CardBody>

        <CardFooter className="d-flex gap-4">
          <button
            onClick={toggleLike}
            className="btn btn-link p-0 d-flex align-items-center"
          >
            {liked ? <BsHeartFill size={18} /> : <BsHeart size={18} />}
            <span className="ms-1">{likes}</span>
          </button>

          <button
            onClick={openComments}
            className="btn btn-link p-0 d-flex align-items-center"
          >
            <BsChatFill size={18} />
            <span className="ms-1">{comments}</span>
          </button>
        </CardFooter>
      </Card>

      {/* Yorum Modal */}
      <Modal show={showComments} onHide={() => setShowComments(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Yorumlar</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {commentList.length === 0 ? (
            <p className="text-muted">Henüz yorum yok</p>
          ) : (
            commentList.map((c) => (
              <div key={c.id} className="mb-3">
                <strong>{c.author_name}</strong>
                <p className="mb-0">{c.text}</p>
                <small className="text-muted">
                  {new Date(c.created_at).toLocaleString()}
                </small>
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Yorum yaz…"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={sending}
            />
            <Button variant="primary" onClick={handleAddComment} disabled={sending || !newComment.trim()}>
              <BsSend />
            </Button>
          </InputGroup>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostCard;
