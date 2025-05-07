import style from './AddLinkModal.module.css'
import HomeIcon from '../svg/HomeIcon.jsx';
import { useRef, useEffect, useState } from "react";
import copyImg from '../images/CopyImg.png';
import deleteImg from '../images/deleteImg.png';
import instagram from '../images/instagram.png';
import facebook from '../images/facebook.png';
import youtube from '../images/youtube.png';
import x from '../images/x.png';
import penImg from '../images/penImage.png';

function AddLinkModal({ onClose, isSocial, setIsSocial }) {
    const modalRef = useRef();
    const [isSave, setIsSave] = useState(false);

    const [socialInput, setSocialInput] = useState({ title: "", url: "" });
    const [shopInput, setShopInput] = useState({ title: "", url: "" });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      
      if (isSocial) {
        setSocialInput({ ...socialInput, [name]: value });
      } else {
        setShopInput({ ...shopInput, [name]: value });
      }
    };

    const handleSaveToggle =()=>{
      setIsSave(!isSave);
      console.log(socialInput)

      onClose();
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, [onClose]);

    return (
      <div className={style.modalBackdrop}>
        <div className={style.modalContent} ref={modalRef}>
          <div onClick={() => setIsSocial(!isSocial)} className={style.toggleWrapper}>
            <div className={style.labels}>
              <span className={`${isSocial ? style.active : ""} ${style.spanStyle}`}>
                <HomeIcon color={isSocial ? "white" : "grey"} /> Add Link
              </span>
              <span className={`${!isSocial ? style.active : ""} ${style.spanStyle}`}>
                <HomeIcon color={!isSocial ? "white" : "grey"} /> Add Shop
              </span>
            </div>
            <div className={`${style.slider} ${isSocial ? style.left : style.right}`} />
          </div>
        
        <div className={style.mainContainer}>
            <p className={style.header}>Enter URL</p>

            <div className={style.linkTitleDiv}> 
                  <input type="text" 
                         name='title'
                         placeholder='Link title'  
                         value={isSocial ? socialInput.title : shopInput.title}
                         onChange={handleInputChange}
                  />
                  <img src={penImg} className={style.inputIcon}  />  
                  <div onClick={handleSaveToggle} className={`${style.saveToggle} ${isSave? style.saved : ""}`}>
                  <div className={`${style.saveSlider} ${isSave ? style.right : ""}`} />
                  </div>
               
            </div>
            <div className={style.linkUrlDiv}>
                <input 
                    type="text"  
                    name='url'
                    placeholder='Link Url'
                    value={isSocial ? socialInput.url : shopInput.url}
                    onChange={handleInputChange}
                />
                <img src={penImg} className={style.inputIcon} />
                <img src={copyImg} alt="CopyImg" className={style.copyImg} />
                <img src={deleteImg} alt="deleteImg" className={style.deleteImg}/>
            </div>
            <hr id={style.hrOfModal}/>

            <p className={style.applicationsHeading}>Applications</p>
            <div className={style.applicationsContainer}>
                <div>
                    <div><img src={instagram} className={style.instaImage} /></div>
                    <p>Instagram</p>
                </div>
                <div>
                    <div><img src={facebook} className={style.facebookImage} /></div>
                    <p>Facebook</p>
                </div>
                <div>
                    <div><img src={youtube} className={style.youtubeImage} /></div>
                    <p>Youtube</p>
                </div>
                <div>
                    <div><img src={x} className={style.xImage} /></div>
                    <p>X</p>
                </div>
            </div>
        </div>


  
          {/* <button onClick={onClose}>Close</button> */}
        </div>
      </div>
    );
  }

export default AddLinkModal
  