import "./LikeContainer.css"

import { BsHeart, BsHeartFill } from "react-icons/bs"
const LikeContainer = ({ photo, user, handleLike }) => {
  return (
    <div className="like">
      {photo && user && (
        <>
          {photo.likes && photo.likes.includes(user._id) ? (
            <BsHeartFill />
          ) : (
            <BsHeart onClick={() => handleLike(photo)} />
          )}
          {photo.likes && photo.likes.lenght > 0 ? <p>{photo.likes.lenght} likes(s)</p> : <p>0 likes(s)</p>}
        </>
      )}
    </div>
  )
}

export default LikeContainer