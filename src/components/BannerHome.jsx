import { useEffect, useState } from 'react'
import { BsPlayBtn } from 'react-icons/bs'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BannerHome = () => {
    const bannerData = useSelector(state=> state.movieoData.bannerData)
    const imageURL = useSelector(state=> state.movieoData.imageURL)


    const [currentImage,setCurrentImage] = useState(0)

    const handleNext =()=>{
      if(currentImage < bannerData.length -1){
        setCurrentImage(prev => prev + 1)
      }
    }

    const handlePrevious =()=>{
      if(currentImage > 0){
        setCurrentImage(prev => prev - 1)
      }
    }

    useEffect(()=>{
      const interval = setInterval(()=>{
        
        if(currentImage < bannerData.length -1){
          handleNext()
        }else{
          setCurrentImage(0)
        }

      },5000)

      return ()=> clearInterval(interval)

    },[bannerData, imageURL,currentImage])



  return (
    <section className='w-full h-full mb-5'>
        <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
          {
            bannerData.map((data,index)=>{
              return(
                <div key={data.id+'BannerHome'+index} className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative transition-all group' style={{transform: `translateX(-${currentImage * 100}%)`}}>
                  
                  <div className="w-full h-full">
                    <img src={imageURL+data.backdrop_path} alt='' className='h-full w-full object-cover' />
                  </div>

                  {/******Button next and previous image*** */}
                  <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex'>
                    <button onClick={handlePrevious} className='bg-white p-1 rounded-full text-2xl z-10 text-black'>
                      <FaAngleLeft />
                    </button>
                    <button onClick={handleNext} className='bg-white p-1 rounded-full text-2xl z-10 text-black'>
                      <FaAngleRight />
                    </button>
                  </div>

                  <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent '>
                  </div>

                  <div className="container mx-auto">

                    <div className=' absolute bottom-0 max-w-md px-3'>
                      <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>{data?.title || data?.name}</h2>
                      <p className='text-ellipsis line-clamp-3 my-2 text-justify'>{data.overview}</p>
                      <div className='flex items-center gap-4'>
                        <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                        <span>|</span>
                        <p>View: {Number(data.popularity).toFixed(0)}</p>
                      </div>
                      <Link to={'/'+data?.media_type+'/'+data.id}>
                        <button className="flex items-center gap-2 bg-white px-4 py-2 text-black font-bold rounded mt-3 border hover:bg-black hover:border-white hover:text-white transition-all hover:scale-105">Play Now <span><BsPlayBtn /></span></button >
                      </Link>
                    </div>

                  </div>


                </div>
              )
            })
          }
        </div>
    </section>
  )
}

export default BannerHome