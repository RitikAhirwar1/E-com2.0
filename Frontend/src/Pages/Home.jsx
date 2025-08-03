import React from 'react'
import Hero from '../Components/Hero'
import LatestCollections from '../Components/LatestCollections'
import BestSeller from '../Components/BestSeller'
import Policy from '../Components/Policy'
import ConnectBox from '../Components/ConnectBox'


const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollections/>
      <BestSeller/>
      <Policy/>
      <ConnectBox/>
      
    </div>
  )
}

export default Home