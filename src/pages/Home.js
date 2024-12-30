import React from 'react'
import Header from '../components/Header'
import HomeCards from '../components/HomeCards'
import Footer from '../components/Footer'

function Home() {
    return(
        <div>
            <Header/>
            <br></br>            
            <p><font face=" Inspiration"><font size="6"><font color="#e1b136"><center><b><i>Where Every Tail has a Story ...</i></b></center></font></font></font></p>
            <HomeCards/>
            <Footer/>
        </div>
    )
}
export default Home
