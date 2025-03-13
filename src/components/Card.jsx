import moment from 'moment'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Card = ({data,trending,index,media_type}) => {
    const imageURL = useSelector(state=> state.movieoData.imageURL)
    const mediaType =data.media_type ?? media_type

  return (
    <Link to={'/'+mediaType+'/'+data.id} className='w-full min-w-[230px] max-w-[230px] rounded overflow-hidden block h-80 relative hover:scale-105 transition-all'>
        
        {
            data?.poster_path ? (
                <img 
                    src={imageURL+data?.poster_path}
                    alt=''
                />
            )
            :
            (
                <div className='flex justify-center items-center bg-neutral-800 h-full w-full'>
                    No image found
                </div>
            )
        }
       <div className='absolute top-4'>
       {
            trending && (
                <div className='py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden'>
                    #{index} Trending
                </div>
            ) 
        }
       </div>

       <div className='absolute bottom-0 h-14 backdrop-blur-3xl w-full bg-black/60 p-2'>
            <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data?.title || data?.name}</h2>
            <div className='text-sm text-neutral-600 flex justify-between items-center'>
                <p className='text-white text-xs'>{moment(data?.release_date).format('MMMM Do YYYY')}</p>
                
                <p className='bg-black px-1 rounded-md text-xs text-white'>Ratings: {Number(data?.vote_average).toFixed(1)}</p>
            </div>
       </div>

    </Link>
  )
}

export default Card