import './Home.css'

// components
import LikeContainer from "../../components/LikeContainer/LikeContainer"
import PhotoItem from "../../components/PhotoItem/PhotoItem"
import { Link } from 'react-router-dom'

// hooks
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage"

// redux
import { like, getAllPhotos } from '../../slices/photoSlice'
const Home = () => {

  const dispatch = useDispatch()
  const resetMessage = useResetComponentMessage(dispatch)

  const { user } = useSelector((state) => state.auth)
  const { photos, loading } = useSelector((state) => state.photo)

  useEffect(() => {
    dispatch(getAllPhotos())
  }, [dispatch])


  const handleLike = (photo) => {
    dispatch(like(photo._id))

    resetMessage()
  }

  if (loading) {
    <p>Carregando</p>
  }
  return (
    <div id='home'>
      {photos && photos.map((photo) => (
        <div key={photo._id}>
          <PhotoItem photo={photo} />
          <LikeContainer handleLike={handleLike} photo={photo} user={user} />
          <Link className='btn' to={`/photos/${photo._id}`}>Ver mais</Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <h2 className='no-photos'>
          Ainda não há fotos publicadas, <Link to={`/users/${user._id}`}>Clique Aqui</Link>
        </h2>
      )}
    </div>
  )
}

export default Home