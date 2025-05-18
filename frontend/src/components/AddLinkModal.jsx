import style from './AddLinkModal.module.css'
import HomeIcon from '../svg/HomeIcon.jsx';
import { useRef, useEffect, useState } from "react";
import copyImg from '../images/copyImg.png';
import deleteImg from '../images/deleteImg.png';
import instagram from '../images/instagram.png';
import facebook from '../images/facebook.png';
import youtube from '../images/youtube.png';
import x from '../images/x.png';
import penImg from '../images/penImage.png';
import defaultAppIcon from '../images/defaultAppIcon.png';
import {createLink, updateLink} from '../FetchMaker.js';

function AddLinkModal({ mode, linkData, onClose, isSocial, setIsSocial }) {
    const modalRef = useRef();
    const [isSave, setIsSave] = useState(false);

    const [socialInput, setSocialInput] = useState({ title: "", url: "", icon: defaultAppIcon });
    const [shopInput, setShopInput] = useState({ title: "", url: "", icon: defaultAppIcon });

    const handleIconClick = (iconPath) => {
      if (isSocial) {
        setSocialInput({ ...socialInput, icon: iconPath });
      } else {
        setShopInput({ ...shopInput, icon: iconPath });
      }
    };

    useEffect(() => {
      // Handle outside click
      const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
    
      // Handle edit mode data fill
      if (mode === "edit" && linkData) {
        console.log("lainkData",linkData);
        if (linkData.type === "social") {
           setSocialInput({ 
            title: linkData.title,
             url: linkData.url,
             icon: linkData.icon,
            });
        } 
        if (linkData.type === "shop")  {
          setShopInput({
              title: linkData.title,
             url: linkData.url,
             icon: linkData.icon,
          })
        }              
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose, mode, linkData, isSocial]);
// ========================================================

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      
      if (isSocial) {
        setSocialInput({ ...socialInput, [name]: value });
      } else {
        setShopInput({ ...shopInput, [name]: value });
      }
    };

    const handleSaveToggle = async () => {
      const linkPayload = {
        type: isSocial ? "social" : "shop",
        linkTitle: isSocial ? socialInput.title : shopInput.title,
        linkUrl: isSocial ? socialInput.url : shopInput.url,
        icon: isSocial ? socialInput.icon : shopInput.icon,
      };

      let response;
      if (mode === "edit") {
        response = await updateLink(linkData.id, { ...linkPayload});
      } else {
        response = await createLink({ ...linkPayload });
      }

      const data = await response.json();
    
      if (data.success) {
        alert(mode === "edit" ? "Link updated" : "Link added");
      }
      else {
        console.error("Error:", data);
      }
      setIsSave(!isSave);
      onClose();
    };
    
    const handleCopy = () => {
      const currentInput = isSocial ? socialInput : shopInput;
      navigator.clipboard.writeText(currentInput.url);
    };
    const handleDelete = () => {
      if (isSocial) {
        setSocialInput({ title: "", url: "" });
      } else {
        setShopInput({ title: "", url: "" });
      }
    };
// =============================================================================================
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
                  <div  onClick={handleSaveToggle} className={`${style.saveToggle} ${isSave? style.saved : ""}`}>
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
                <img src={copyImg} alt="CopyImg" className={style.copyImg} onClick={handleCopy} title='Copy inputs'/>
                <img src={deleteImg} alt="deleteImg" className={style.deleteImg} onClick={handleDelete}  title='Clear inputs'/>
            </div>
            <hr id={style.hrOfModal}/>

            <p className={style.applicationsHeading}>Applications</p>

            <div className={style.applicationsContainer}>
                <div onClick={() => handleIconClick(instagram)}>
                  <div><img src={instagram} className={style.instaImage} /></div>
                  <p>Instagram</p>
                </div>
                <div onClick={() => handleIconClick(facebook)}>
                  <div><img src={facebook} className={style.facebookImage} /></div>
                  <p>Facebook</p>
                </div>
                <div onClick={() => handleIconClick(youtube)}>
                  <div><img src={youtube} className={style.youtubeImage} /></div>
                  <p>Youtube</p>
                </div>
                <div onClick={() => handleIconClick(x)}>
                  <div><img src={x} className={style.xImage} /></div>
                  <p>X</p>
                </div>
            </div>

        </div>
        </div>
      </div>
    );
  }

export default AddLinkModal
  