import React from 'react'
import Header from '../components/Header'
import HomeCards from '../components/HomeCards'
import Footer from '../components/Footer'
import './Home.css'

function Home() {
    return(
        <div className="home-page">
            <Header/>
            <div className="home-hero">Where Every Tail has a Story ...</div>
            <HomeCards/>
            <Footer/>
        </div>
    )
}
export default Home
