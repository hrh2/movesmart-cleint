import React from 'react'
import Feedback from '../../components/forms/FeedBack'
import { GrSend } from 'react-icons/gr';
import { FaHome,FaBell, FaRegUserCircle} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { BsInstagram, BsTwitter,BsFillArrowRightCircleFill } from 'react-icons/bs';


export default function ContactUs() {
  return (
    <div className='w-full bg-blue-950 text-white min-h-screen'>
      <div className=' h-16 bg-blue-950 w-5/6 mx-auto p-2 relative'>
          <a href='/'><FaHome size={30} className=' aspect-square w-12' /></a>
          <div className='grid grid-cols-2 gap-2  text-white  w-24 absolute right-4 top-3'>
              <FaBell size={30} />
          </div>
      </div>
      <div className='w-10/12 mx-auto'>
        <h1 className='border-l-4 px-1 md:text-sm sm:text-xs text-[.6em] font-extrabold'>GOT ANY QUESTION</h1>
      </div>
      <div className='w-5/6 mx-auto'>
        <h1 className='px-2 float-end border-r-4 md:text-sm sm:text-xs text-[.6em] font-extrabold'>Our Chatbot is ready to help</h1>
      </div>
      <div className='w-5/6 mx-auto' style={{ position: 'relative' }}>
        <form className="was-validated my-5">
          <span className=''><FaRegUserCircle size="2.5em" /> <span className='fw-bold'>User</span></span>
          <div className="my-1" style={{ position: 'relative' }}>
            <label htmlFor="validationTextarea" className="form-label"></label>
            <div style={{ position: 'relative' }}>
              <input 
                className="form-control message-input" 
              id="validationTextarea" 
              placeholder="Type the message" 
              required>
              </input>
              <button 
              type="submit" 
              className='p-2 border-0 bg-white bg-opacity-10' 
              style={{ position: 'absolute', bottom: '1em', right: '1em' }}>
              <GrSend 
              size="2.2em" 
              />
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* <Questions/> */}
      <div className='w-5/6 mx-auto'>
      <h1 className='border-l-4 px-1 md:text-sm sm:text-xs text-[.6em] font-extrabold'>Frequently asked questions(FAQs)</h1>
            <p className='p-1 flex gap-2 md:text-xs sm:text-[.7em] text-[.55em]'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste magnam laborum dolorum vitae <span><BsFillArrowRightCircleFill size="2em" /></span></p>
            <p className='p-1 flex gap-2 md:text-xs sm:text-[.7em] text-[.55em]'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste magnam laborum dolorum vitae <span><BsFillArrowRightCircleFill size="2em" /></span></p>
            <p className='p-1 flex gap-2 md:text-xs sm:text-[.7em] text-[.55em]'> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste magnam laborum dolorum vitae <span><BsFillArrowRightCircleFill size="2em" /></span></p>
      </div> 
      <Feedback/>
      {/* <Footer/> */}
      <div className='md:w-5/6 sm:w-5/6 md:px-0 sm:px-0 w-full mx-auto px-6'>
          <h1 className='border-l-4 px-1 md:text-sm sm:text-xs text-[.6em] font-extrabold'>Reach out to us via our PlatForms</h1>
          <div className='w-full items-center text-center fw-bold py-3 grid md:grid-cols-3 grid-flow-col gap-2 md:text-base sm:text-sm text-[.6em]'>
              <div className=''>
                  <a href='-' className='flex gap-2 text-decoration-none'><MdEmail size={20} /> movesmart@gmail.com</a>
              </div>
              <div className=''>
                  <a href='-' className='flex gap-2 text-decoration-none'><BsTwitter size={20} />moveSmart_Rwanda</a>
              </div>
              <div className=''>
                  <a href='-' className='flex gap-2 text-decoration-none'><BsInstagram size={20} />move_smart</a>
              </div>
          </div>
      </div>
    </div>
  )
}

