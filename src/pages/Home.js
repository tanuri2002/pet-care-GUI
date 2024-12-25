import React from 'react'
import Header from '../components/Header'
import HomeCards from '../components/HomeCards'
import Footer from '../components/Footer'

function Home() {
    return(
        <div>
            <Header/>
            <br></br>
            <br></br>
            <p><font face=" Inspiration"><font size="6"><font color="#ea990f"><center><b><i>Where Every Tail has a Story ...</i></b></center></font></font></font></p>
            <HomeCards/>
            <br></br>
            <br></br>
            <Footer/>
        </div>
    )
}
export default Home
