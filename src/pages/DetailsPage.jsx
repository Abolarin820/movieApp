import {useParams} from 'react-router-dom'
import useFetchDetails from '../hooks/useFetchDetails';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import Divider from '../components/Divider';
import useFetch from '../hooks/useFetch';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import { useState } from 'react';
import VideoPlay from '../components/VideoPlay';


const DetailsPage = () => {
  const params = useParams()
  const {data} = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const {data:castData} = useFetchDetails(`/${params?.explore}/${params?.id}/credits`)
  const {data:similarData} = useFetch(`/${params?.explore}/${params?.id}/similar`)
  const {data:recomendationData} = useFetch(`/${params?.explore}/${params?.id}/recommendations`)

  const [playVideo,setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState("")

  const imageURL = useSelector(state=> state.movieoData.imageURL)


  const duration = Number(data?.runtime/60)?.toFixed(1)?.split('.')
  const writer = castData?.crew?.filter(el => el.job === 'Writer')?.map(el => el?.name)?.join(", ")

  console.log('dataDetails',data)
  console.log('castDetails',castData)

  const handlePlayVideo = (data)=> {
    setPlayVideoId(data)
    setPlayVideo(true)
  }

  return (
    <div className='mb-10'>

      <div className='w-full h-[300px] relative hidden lg:block'>
        <div className='w-full h-full'>
          <img src={imageURL+data?.backdrop_path} alt="" className='w-full h-full object-cover'/>
        </div>
        <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div> 
      </div>

      <div className='container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10'>
        
        <div className='relative lg:-mt-28 mx-auto lg:mx-0 w-fit'>
          <img src={imageURL+data?.poster_path} alt="" className='w-80 h-60 object-cover rounded'/>
          <button onClick={()=>handlePlayVideo(data)} className='mt-3 w-full py-2 px-4 bg-white text-center text-black rounded font-bold text-lg hover:bg-slate-400 hover:scale-105 hover:text-white transition-all'>Play Now</button>
        </div>

        <div> 
          <h2 className='text-2xl lg:text-4xl font-bold text-white'>{data?.title || data?.name}</h2>
          <p className='text-neutral-300'>{data?.tagline}</p>

          <Divider />

          <div className='flex items-center gap-3'>
            <p className=''>
              Rating: {Number(data?.vote_average).toFixed(1)}+
            </p>
            <span>|</span>
            <p>View: {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>Duration: {duration[0]}h {duration[1]}m </p>
          </div>

          <Divider />

          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p className='text-justify'>{data?.overview}</p>
            
            <Divider />

            <div className='flex items-center gap-3 text-center'>
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>Release Date: {moment(data?.release_date).format('MMMM Do YYYY')}</p>
              <span>|</span>
              <p>Revenue: {Number(data?.revenue) || 'Not Available'}</p>
            </div>

            <Divider />
          </div>

          <div>
            <p ><span className='text-white'>Director: </span> {castData?.crew[0]?.name || 'Not Available'}</p>
            <Divider />
            <p><span className='text-white'>Writer: </span>{writer || data?.type}</p>
          </div>

          <Divider />
          <div>
            <h2 className='text-lg font-bold mb-2'>Star Cast</h2>
            <div className='grid grid-cols-[repeat(auto-fit,80px)] gap-5'>
              {
                castData?.cast?.filter(el=> el?.profile_path).map((starCast,index)=>{
                  return(
                    <div key={starCast.id+"cast"+index}>
                      <div>
                        <img src={imageURL+starCast?.profile_path} alt="" className='w-20 h-20 rounded-full object-cover'/>
                      </div>
                      <p className='font-bold text-center text-sm text-neutral-400'>{starCast?.name}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

      </div>

      <div>
        <HorizontalScrollCard data={similarData} heading={"Similar "+params?.explore} media_type={params?.explore} />
        <HorizontalScrollCard data={recomendationData} heading={"Recommended "+params?.explore} media_type={params?.explore} />
      </div>
      {
        playVideo && (

          <VideoPlay data={playVideoId} close={()=>setPlayVideo(false)} media_type={params?.explore}/>
        )
      }

    </div>
  )
}

export default DetailsPage