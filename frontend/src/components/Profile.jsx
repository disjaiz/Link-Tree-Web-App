import style from './Profile.module.css'
import movingOut from "../images/movingOut.png";
import blackFire from "../images/blackFire.png"
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import bigMemojiBoy from "../images/bigMemojiBoy.png";
import { toast, ToastContainer } from "react-toastify";
import checkCircle from '../images/checkCircle.png'
import { useParams } from "react-router-dom";
import { saveClickLog, saveCtaLog } from '../FetchMaker';
import baseUrl, {frontEndBaseUrl} from '../config'; 

function Profile() {
  const navigate = useNavigate()
  const { id } = useParams();
   const [user, setUser] = useState(null);

  const [isSocial, setIsSocial] = useState(true);

   const handleCopyLink = () => {
      const link = `${frontEndBaseUrl}/user/preview/${id}`;
      navigator.clipboard.writeText(link);
       toast.success(
                           <div className={style.toastContent}>
                                <img src={checkCircle} alt="Success" className={style.toastIcon} />
                                <span>Profile link saved</span>
                              </div>,
                              {
                                className: `${style.customToast} ${style.toastGreen}`,
                                autoClose: 3000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                draggable: false,
                                closeButton: ({ closeToast }) => (
                                  <span className={style.closeBtn} onClick={closeToast}>✖</span>
                                ),
                                icon: false,
                              }
                            );
    };

  useEffect(() => {
    fetch(`${baseUrl}/user/preview/${id}`, {
      credentials: 'include',
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
                  setUser(data);
                  console.log(data)
                })
      .catch((err) => console.log("err", err));
  }, [id]);

  const handleLinkClick = async (link) => {
    try {
      const response = await saveClickLog(link.linkUrl, isSocial);
      const data = await response.json();
      console.log(data)
    } catch (err) {
      console.error("Click log failed", err);
    } finally {
      // window.location.href = `https://${link.linkUrl}`;
    window.location.href = link.linkUrl.startsWith('http') ? link.linkUrl : `https://${link.linkUrl}`;
    }
};
  const handleCtaClick = async () => {
     try {
      const response = await saveCtaLog(id);
      const data = await response.json();
      console.log(data)
    } catch (err) {
      console.error("Cta log failed", err);
    } finally {
    navigate('/')
    }
  }

     if (!user) return null; 
//  ======================================================
  return (
    <div className={style.container}>
      <div className={style.mobilePreviewDiv}>
         <ToastContainer   />
                <div className={style.mobilePreview} style={{ backgroundColor: user.theme }}>

                  <div className={style.mobilePreviewHeader} style={{backgroundColor: user.bannerColor}}>
                     <div className={style.divOne} onClick={handleCopyLink} >
                          <img src={movingOut} alt="movingOutPng" />
                      </div>
                    
                    <div className={style.divTwo}>
                     <img src={user.profileImage.startsWith("/uploads") ? `${baseUrl}${user.profileImage}` : bigMemojiBoy} style={{objectFit: "fill"}} height="90%" width="90%"/>

                    </div>
                    <p style={{fontFamily: user.fontFamily, color: user.fontColor}}>{user.profileTitle}</p>
                  </div>

                  <div className={style.mobilePreviewSlider}>
                        <div className={style.toggleWrapper} onClick={() => setIsSocial(!isSocial)}>
                                        <div className={style.labels}>
                                            <span className={`${isSocial ? style.active : ""} ${style.spanStyle}`}>Link</span>
                                            <span className={`${!isSocial ? style.active : ""} ${style.spanStyle}`}>Shop</span>
                                          </div>
                                        <div className={`${style.slider} ${isSocial ? style.left : style.right}`} ></div>
                        </div>
                  </div>
      
                {/*================================Render links===================================  */}
                 <div className={`${style.linksList} 
                                  ${user.profileLayout === "stack" ? style.stackLayout : ""} 
                                  ${user.profileLayout === "grid" ? style.gridLayout : ""} 
                                  ${user.profileLayout === "carausel" ? style.carauselLayout : ""}`}>
                     {(isSocial ? user.social : user.shop)?.map((link, index) => (
                           <div key={index} 
                                // onClick={()=>  window.location.href = `https://${link.linkUrl}`}
                               onClick={() => handleLinkClick(link)}
                                style={{backgroundColor: user.buttonColor,  '--zigzag-color': user.buttonColor, cursor: "pointer"}}
                                className={`${style.linkCard}
                                
                                            ${user.profileLayout === "stack" ? style.stackLayoutCard : ""} 
                                            ${user.profileLayout === "grid" ? style.gridLayoutCard : ""} 
                                            ${user.profileLayout === "carausel" ? style.carauselLayoutCard : ""}
  
                                             ${user.buttonStyle ==="fillOne" ? style.fillOne : ""}
                                             ${user.buttonStyle ==="fillTwo" ? style.fillTwo : ""}
                                             ${user.buttonStyle ==="fillThree" ? style.fillThree : ""}
                                             ${user.buttonStyle ==="outlineOne" ? style.outlineOne : ""}
                                             ${user.buttonStyle ==="outlineTwo" ? style.outlineTwo : ""}
                                             ${user.buttonStyle ==="outlineThree" ? style.outlineThree : ""}
                                             ${user.buttonStyle ==="hardShadowOne" ? style.hardShadowOne : ""}
                                             ${user.buttonStyle ==="hardShadowTwo" ? style.hardShadowTwo : ""}
                                             ${user.buttonStyle ==="hardShadowThree" ? style.hardShadowThree : ""}
                                             ${user.buttonStyle ==="softShadowOne" ? style.softShadowOne : ""}
                                             ${user.buttonStyle ==="softShadowTwo" ? style.softShadowTwo : ""}
                                             ${user.buttonStyle ==="softShadowThree" ? style.softShadowThree : ""}
                                             ${user.buttonStyle ==="specialOne" ? style.specialOne : ""}
                                             ${user.buttonStyle ==="specialTwo" ? style.specialTwo : ""}
                                             ${user.buttonStyle ==="specialThree" ? style.specialThree : ""}
                                             ${user.buttonStyle ==="specialFour" ? style.specialFour : ""}
                                             ${user.buttonStyle ==="specialFive" ? style.specialFive : ""}
                                             ${user.buttonStyle ==="specialSix" ? style.specialSix : ""} `
                                              }
                                >
                          <div className={style.linkCardImageDiv}>
                                    <img src={link.icon}/>
                          </div>
                          <p className={style.linkTitle} style={{color:user.buttonFontColor, fontFamily: user.fontFamily}}>  {link.linkTitle}   </p>
                                                                      
                           </div>
                       ))}
                  </div>
                 {/* ======================================================================================== */}

                  <button className={style.getConnectedBtn} onClick={handleCtaClick}>Get Connected</button>
      
                  <div className={style.sparkLogo}><img src={blackFire} alt="fireImg" height="20px"/>&nbsp;SPARK</div>
                </div>
              </div>
    </div>
  )
}

export default Profile
