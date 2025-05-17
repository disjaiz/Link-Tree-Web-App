import style from './LinkProfilePreview.module.css';
import movingOut from "../images/movingOut.png";
import blackFire from "../images/blackFire.png"
import {useNavigate} from 'react-router-dom';
import { useEffect} from 'react';

const port = 3000;
// const baseUrl = `http://localhost:${port}`;
// const baseUrl = `http://192.168.0.105:${port}`;
const baseUrl = `https://link-tree-web-app-1.onrender.com`;
// const frontEndBaseUrl = `http://192.168.0.105:5173`;
const frontEndBaseUrl = `https://link-tree-web-app-frontend.onrender.com`;


function LinkProfilePreview({ imageSrc, userName, isSocial, setIsSocial, links, bannerColor, profilePreviewId,
    layout, buttonStyle, buttonColor, buttonFontColor, fontFamily, fontColor, theme }) {
    const navigate = useNavigate();

    const handleCopyLink = () => {
      const link = `${frontEndBaseUrl}/user/preview/${profilePreviewId}`;
      // navigator.clipboard.writeText(link);
      alert(link);
    };
    // useEffect(() => {
    //   if (!profilePreviewId) return;

    //   fetch(`${baseUrl}/user/preview/${profilePreviewId}`, {
    //     credentials: 'include',
    //     method: "GET",
    //     headers: {  
    //       'Content-Type': 'application/json', 
    //     },
    //   })
    //     .then(res => {
    //       if (!res.ok) throw new Error('Unauthorized');
    //       return res.json();
    //     })
    //     .then(data => console.log(data))
    //     .catch((err) => console.log(err));
    // }, [profilePreviewId]);
// ====================================================================================================== 
  return (
    <>
{/* <h1>{profilePreviewId}</h1> */}
      <div className={style.mobilePreviewDiv}>
                <div className={style.mobilePreview}  style={{ backgroundColor: theme }}>

                  <div className={style.mobilePreviewHeader} style={{backgroundColor: bannerColor}}>
                    <div className={style.divOne} onClick={handleCopyLink} >
                      <img src={movingOut} alt="movingOutPng" />
                    </div>
                    <div className={style.divTwo}>
                      <img src={imageSrc.startsWith("/uploads") ? `${baseUrl}${imageSrc}` : imageSrc} style={{objectFit: "fill"}} height="90%" width="90%"/>
                    </div>
                    <p style={{fontFamily: fontFamily, color: fontColor}}>{userName}</p>
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

export default LinkProfilePreview
