
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'

const SearchPage = () => {
  const location = useLocation()
  const [data,setData] = useState([])
  const [pageNo, setPageNo] =  useState(1)
  const navigate = useNavigate()

  const query = location?.search?.slice(3)


  const fetchData = async()=>{

    try {
      const response = await axios.get(`/search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page: pageNo
        }
      })

      console.log(response.data.results)
      console.log('Location',location)

      console.log('location/search',location.search)
      console.log('slice 0, 3',location.search.slice(3))

      setData((prev)=> {
        
        return[
          ...prev,
          ...response.data.results
        ]
        
      })


    } catch (error) {
      console.log(error)
    }

  }

   useEffect(()=>{
      if(query){
        setPageNo(1)
        setData([])
        fetchData()
      }
    },[location?.search])


    const handleScroll = ()=> {
    
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        setPageNo(prev => prev + 1)
      }
    }

    useEffect(()=>{
      if(query){
        fetchData()
      }
    },[pageNo])

    useEffect(()=>{
      window.addEventListener('scroll',handleScroll)
    },[])

  return (
    <div className='py-16 my-2 mx-1 sticky top-[70px] z-30'>
      
      {/*****Mobile search*** */}
      <div className='lg:hidden'>
        <input type="text" placeholder="Search Here..." 
          onChange={(e)=> navigate(`/search?q=${e.target.value}`)} value={query?.split("%20")?.join(" ")}
          className='px-4 py-1 w-full text-md bg-white rounded-full text-neutral-900 border-none'
        />
      </div>


      <div className='container mx-auto'>
      <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">Search Results</h3>
      <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 my-5 justify-center lg:justify-start">
        {
            data.map((searchData, index)=> {
              return(
                <Card key={searchData.id+'search'+index} data={searchData} index={index+1} media_type={searchData.media_type}/>
              )
            })
        }
        </div>
      </div>
    </div>
  )
}

export default SearchPage