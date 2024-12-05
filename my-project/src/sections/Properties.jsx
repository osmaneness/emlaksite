import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../components/DarkModeContext';
import { FaBath, FaBed, FaMapMarkerAlt } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Properties = ({ listings }) => {
  const { darkMode } = useDarkMode();
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });

    // API çağrısını yapalım
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/listings'); // API'den ilanları al
        setProperties(response.data); // İlanları state'e kaydet
      } catch (error) {
        console.error('Error fetching properties:', error); // Hata mesajını konsola yaz
      }
    };

    fetchProperties(); // Fonksiyonu çağır
  }, []);

  const handlePropertyClick = (property) => {
    navigate(`/property-details/${property.id}`);
  };

  return (
    <div className={`${darkMode ? 'dark bg-black' : 'light bg-transparent'}`}>
      <section id='properties' className='lg:w-[90%] m-auto lg:px-20 px-6 py-20 w-full flex flex-col justify-center items-start gap-10'>
        <div className='flex flex-col justify-center items-start gap-4'>
          <h1 data-aos="zoom-in" className='text-red-500 dark:text-white'>Properties</h1>
          <h1 className='text-black text-4x1 font-semibold dark:text-white'>Explore the latest</h1>
        </div>

        <div id='grid-box' className='w-full grid lg:grid-cols-3 grid-cols-1 justify-center items-center gap-8'>
          {
            properties.map((item) => (
              <div data-aos="zoom-in" data-aos-delay="200" key={item.id} className='bg-white dark:bg-gray-800 rounded-x1 w-full cursor-pointer' onClick={() => handlePropertyClick(item)}>
                <div id='image-box' className='relative bg-cover bg-center h-[250px] rounded-x1 p-4 flex flex-col justify-between items-end'>
                  {item.mainImage && ( // mainImage varsa resmi göster
                    <img
                      src={`http://localhost:5000/${item.mainImage}`}
                      alt={item.title}
                      className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        e.target.src = 'default-image.jpg'; // Hata durumunda varsayılan resim göster
                        e.target.onerror = null; // Sonsuz döngüyü önlemek için onError'ı sıfırla
                      }}
                    />
                  )}
                  <div id='top' className='flex justify-between items-end w-full'>
                    <div><button className='px-3 py-1 bg-red-600 hover:bg-white hover:text-black text-white rounded-full text-[13px]'>Featured</button></div>
                    <div className='flex justify-between items-center gap-3'>
                      <button className='px-3 py-1 bg-red-600 hover:bg-white hover:text-black text-white rounded-full text-[13px]'>Sales</button>
                      <button className='px-3 py-1 bg-red-600 hover:bg-white hover:text-black text-white rounded-full text-[13px]'>Active</button>
                    </div>
                  </div>
                  <div id='bottom' className='flex justify-between items-end w-full'>
                    <div className='flex justify-start items-center gap-2'>
                      <FaMapMarkerAlt className='size-4 text-white' />
                      <h1 className='text-white'>{item.address}</h1>
                    </div>
                  </div>
                </div>
                <div className='px-6 py-3 flex flex-col justify-center items-start gap-2 w-full'>
                  <h1 className='text-x1 text-black font-semibold dark:text-white'>{item.title}</h1>
                  <h1 className='text-2x1 text-red-600 font-bold dark:text-white'>{item.price}</h1>
                  <p className='dark:text-white'>{item.description}</p>
                  <div id='icons' className='flex justify-center items-start gap-4'>
                    <div className='flex justify-center items-center gap-2'>
                      <FaBath className='size-5 text-red-400' />
                      <h1 className='dark:text-white'>{item.bathrooms}</h1>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                      <FaBed className='size-5 text-red-400' />
                      <h1 className='dark:text-white'>{item.bedrooms}</h1>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                      <MdSpaceDashboard className='size-5 text-red-400' />
                      <h1 className='dark:text-white'>{item.size}</h1>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </div>
  );
}

export default Properties;
