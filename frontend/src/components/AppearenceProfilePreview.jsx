import style from './LinkProfilePreview.module.css';
import movingOut from "../images/movingOut.png";
import blackFire from "../images/blackFire.png"
import {useNavigate} from 'react-router-dom';
import { useEffect} from 'react';
import { toast, ToastContainer } from "react-toastify";
import checkCircle from '../images/checkCircle.png'

const port = 3000;
// const baseUrl = `http://localhost:${port}`;
const baseUrl = `http://192.168.0.105:${port}`;
// const baseUrl = `https://link-tree-web-app-2-backend.onrender.com`;
const frontEndBaseUrl = `http://192.168.0.105:5173`;
// const frontEndBaseUrl = `https://link-tree-web-app-frontend.onrender.com`;


function AppearenceProfilePreview({ imageSrc, userName, isSocial, setIsSocial, links, bannerColor, profilePreviewId,
    layout, buttonStyle, buttonColor, buttonFontColor, fontFamily, fontColor, theme }) {
    const navigate = useNavigate();

    const handleCopyLink = () => {
      const link = `${frontEndBaseUrl}/user/preview/${profilePreviewId}`;
      alert(link);
      navigator.clipboard.writeText(link);
      toast.success(
                  <div className={style.toastContent}>
                    <img src={checkCircle} alt="Success" className={style.toastIcon} />
                    <span>Profile link saved</span>
                  </div>,
                  {
                    className: `${style.customToast} ${style.toastGreen}`,
                    autoClose: false,
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
  
// ====================================================================================================== 
  return (
    <>
      <div className={style.mobilePreviewDiv}>
         <ToastContainer   /> 
                <div className={style.mobilePreview}  style={{ backgroundColor: theme }}>

                  <div className={style.mobilePreviewHeader} style={{backgroundColor: bannerColor}}>
                    <div className={style.divOne} onClick={handleCopyLink} >
                      <img src={movingOut} alt="movingOutPng" />
                    </div>
                    <div className={style.divTwo}>
                      <img src={imageSrc.startsWith("/uploads") ? `${baseUrl}${imageSrc}` : imageSrc} style={{objectFit: "fill"}} height="90%" width="90%"/>
                    </div>
                    <p className={style.userName} style={{fontFamily: fontFamily, color: fontColor}}>{userName}</p>
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
                                    ${layout === "stack" ? style.stackLayout : ""} 
                                    ${layout === "grid" ? style.gridLayout : ""} 
                                    ${layout === "carausel" ? style.carauselLayout : ""}`
                                    }>
                                       {links
                                         .filter(link => isSocial ? link.type === 'social' : link.type === 'shop')
                                         .map((link, index) => (
                                           <div key={index} 
                                           onClick={()=>  window.location.href = `https://${link.linkUrl}`}
                                           style={{backgroundColor: buttonColor,  '--zigzag-color': buttonColor, cursor: "pointer"}} 
                                          
                                           className={`${style.linkCard}

                                            ${layout === "stack" ? style.stackLayoutCard : ""} 
                                            ${layout === "grid" ? style.gridLayoutCard : ""} 
                                            ${layout === "carausel" ? style.carauselLayoutCard : ""}

                                           ${buttonStyle ==="fillOne" ? style.fillOne : ""}
                                           ${buttonStyle ==="fillTwo" ? style.fillTwo : ""}
                                           ${buttonStyle ==="fillThree" ? style.fillThree : ""}
                                           ${buttonStyle ==="outlineOne" ? style.outlineOne : ""}
                                           ${buttonStyle ==="outlineTwo" ? style.outlineTwo : ""}
                                           ${buttonStyle ==="outlineThree" ? style.outlineThree : ""}
                                           ${buttonStyle ==="hardShadowOne" ? style.hardShadowOne : ""}
                                           ${buttonStyle ==="hardShadowTwo" ? style.hardShadowTwo : ""}
                                           ${buttonStyle ==="hardShadowThree" ? style.hardShadowThree : ""}
                                           ${buttonStyle ==="softShadowOne" ? style.softShadowOne : ""}
                                           ${buttonStyle ==="softShadowTwo" ? style.softShadowTwo : ""}
                                           ${buttonStyle ==="softShadowThree" ? style.softShadowThree : ""}
                                           ${buttonStyle ==="specialOne" ? style.specialOne : ""}
                                           ${buttonStyle ==="specialTwo" ? style.specialTwo : ""}
                                           ${buttonStyle ==="specialThree" ? style.specialThree : ""}
                                            ${buttonStyle ==="specialFour" ? style.specialFour : ""}
                                             ${buttonStyle ==="specialFive" ? style.specialFive : ""}
                                              ${buttonStyle ==="specialSix" ? style.specialSix : ""}
                                           `
                                           }>
                                            <div className={style.linkCardImageDiv}>
                                                <img src={link.icon}/>
                                            </div>
                                            <p className={style.linkTitle} style={{color:buttonFontColor, fontFamily: fontFamily}}>  {link.linkTitle}   </p>
                                            
                                           </div>
                                       ))}
                                   </div>
                                 {/* ======================================================================================== */}
            <div className={style.last}>                   
                  <button className={style.getConnectedBtn} onClick={()=> navigate('/')} >Get Connected</button>
                  <div className={style.sparkLogo}><img src={blackFire} alt="fireImg" height="20px"/>&nbsp;SPARK</div>
            </div>  
                </div>
              </div>
    </>
  )
}

export default AppearenceProfilePreview
