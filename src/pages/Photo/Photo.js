import "./Photo.css"
import { uploads } from "../../utils/config"

// components
import Message from "../../components/Message/Message"
import { Link } from "react-router-dom"
import PhotoItem from "../../components/PhotoItem/PhotoItem"
//hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage"
// redux
import { getPhoto, like, comment } from "../../slices/photoSlice";
import LikeContainer from "../../components/LikeContainer/LikeContainer"
const Photo = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage(dispatch)
  const { user } = useSelector((state) => state.auth)
  const { photo, loading, error, message } = useSelector((state) => state.photo)


  const [commentText, setCommentText] = useState("")

  // carregar os dados da foto
  useEffect(() => {
    dispatch(getPhoto(id))
  }, [dispatch, id])


  const handleLike = () => {
    dispatch(like(photo._id));
    resetMessage();
  };

  const handleComment = (e) => {
    e.preventDefault()

    const commentData = {
      comment: commentText,
      id: photo._id,
    }

    dispatch(comment(commentData))

    setCommentText("")
    resetMessage()
  }

  // like e comentario
  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type={"error"} />}
        {message && <Message msg={message} type="success" />}
      </div>
      <div className="comments">
        {photo.comments && (
          <>
            <h3>Comentários ({photo.comments.length}):</h3>
            <form onSubmit={handleComment}>
              <input type="text" placeholder="insira o seu comentário" onChange={(e) => setCommentText(e.target.value)} value={commentText || ""} />
              <input type="submit" value="Enviar" />
            </form>
            {photo.comments.length === 0 && <p>Não há comentarios...</p>}
            {photo.comments.map((comment) => (
              <div className="comment" key={comment.comment}>
                <div className="author">
                  {comment.userImage && (
                    <img src={`${uploads}/users/${comment.userImage}`} alt={comment.username} />
                  )}
                  <Link to={`/users/${comment.userId}`}>
                    <p>{comment.username}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  )
}

export default Photo