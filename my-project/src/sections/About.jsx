import React, { useEffect } from 'react'
import { useDarkMode } from '../components/DarkModeContext'
import aboutimg from '../assets/images/about.jpg'
import AOS from 'aos'
import 'aos/dist/aos.css'

const About = () => {

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
  }, [])

  const { darkMode, toogleDarkMode } = useDarkMode();


  return (
    <section id='about' className={`${darkMode ? 'dark bg-black' : 'light bg-transparent'} w-full m-auto lg:px-40 px-10 py-20 grid lg:grid-cols-2 grid-cols-1 justify-center items-center gap-10`}>
      <div>
        <img data-aos="zoom-in" src={aboutimg} alt="about image" className='rounded-2x1 lg:w-[500px] lg:h-[600px]' />
      </div>

      <div className='flex flex-col justify-center items-start gap-8'>
        <h1 data-aos="zoom-in" className='text-red-500 dark:text-white'></h1>
        <h1 data-aos="zoon-in" data-aos-delay="200" className='text-black text-[40px] font-semibold leading-10 dark:text-white'>İsrafil Doğan: 0531 667 7401</h1>
        <p data-aos="zoon-in" data-aos-delay="400" className='text-x1 text-gray-600 dark:text-white text-justify'></p>

      </div>
    </section>
  )
}

export default About