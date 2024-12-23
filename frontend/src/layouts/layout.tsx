import React from 'react'
import Hero from "../components/hero"
import Footer from '../components/footer'

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }:LayoutProps) => {
    return(
        <div className="flex flex-col min-h-screen">
            <Hero   />
            <div className='container mx-auto py-10 flex-1'>
            {children}

            </div>
            <Footer/>
        </div>
    )
}

export default Layout