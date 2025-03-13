import { useSelector } from "react-redux"
import BannerHome from "../components/BannerHome"
import HorizontalScrollCard from "../components/HorizontalScrollCard"
import useFetch from "../hooks/useFetch"


const Home = () => {
  const trendingData = useSelector(state => state.movieoData.bannerData)
  const {data:nowPlaying} = useFetch('/movie/now_playing')
  const {data:topRatedData} = useFetch('/movie/top_rated')
  const {data:popularTvData} = useFetch('/tv/popular')
  const {data:onTheAirSHowData} = useFetch('/tv/on_the_air')



  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading={'Trending Movies'}  trending={true} />
      <HorizontalScrollCard data={nowPlaying} heading={'Now Playing'} media_type={'movie'}/>
      <HorizontalScrollCard data={topRatedData} heading={'Top Rated Movies'} media_type={'movie'}/>
      <HorizontalScrollCard data={popularTvData} heading={'Popular TV SHow'} media_type={'tv'}/>
      <HorizontalScrollCard data={onTheAirSHowData} heading={'On The Air'} media_type={'tv'}/>
    </div>
  )
}


export default Home