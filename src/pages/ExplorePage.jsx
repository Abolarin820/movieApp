import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Card from "../components/Card"


const ExplorePage = () => {
  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [exploreData, setExploreData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)

  const fetchData = async()=>{

    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page:pageNo
        }
      })

      setExploreData((prev)=> {
        
        return[
          ...prev,
          ...response.data.results
        ]
        
      })

      setTotalPageNo(response.data.total_pages)


    } catch (error) {
      console.log(error)
    }

  }

  const handleScroll = ()=> {
    
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
      setPageNo(prev => prev + 1)
    }
  }

  useEffect(()=>{
    fetchData()
  },[pageNo])

  useEffect(()=>{
    setPageNo(1)
    setExploreData([])
    fetchData()
  },[params.explore])

  useEffect(()=>{
    window.addEventListener('scroll',handleScroll)
  },[])


  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">Popular {params.explore} Show</h3>
        
        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 my-5 justify-center lg:justify-start">
        {
            exploreData.map((data, index)=> {
              return(
                <Card key={data.id+'explore'+index} data={data} index={index+1} media_type={params.explore}/>
              )
            })
        }
        </div>
      </div>
    </div>
  )
}

export default ExplorePage