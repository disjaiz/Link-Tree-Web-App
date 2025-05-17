import React, {useState, useEffect, useRef } from 'react'
import {  useNavigate, useLocation} from 'react-router-dom';
import style from './Appearence.module.css';
import AppearenceProfilePreview from './AppearenceProfilePreview.jsx';
import bigMemojiBoy from "../images/bigMemojiBoy.png";
import stack from "../images/stack.png";
import grid from "../images/grid.png";
import carausel from "../images/carausel.png";
import airSnow from "../images/airSnow.png";
import airGrey from "../images/airGrey.png";
import airSmoke from "../images/airSmoke.png";
import airBlack from "../images/airBlack.png";
import mineralBlue from "../images/mineralBlue.png";
import mineralGreen from "../images/mineralGreen.png";
import mineralOrange from "../images/mineralOrange.png";
import eye from "../images/eye.png";
import {fetchUserData} from '../FetchMaker.js';

const port = 3000 || 5000;
const baseUrl = `http://192.168.0.105:${port}`;

function Appearence() {
  const location = useLocation();
  const Name = location.state?.name;
  const [imageSrc, setImageSrc] = useState(bigMemojiBoy);
  const [userName, setUserName] = useState("");
  const [isSocial, setIsSocial] = useState(true);

   const [links, setLinks] = useState([]);
   const [selectedColor, setSelectedColor] = useState("");

    // ======================================================
    const [profilePreviewId, setProfilePreviewId] = useState("");
  const [layout, setLayout] = useState('stack');
  const [buttonStyle, setButtonStyle] = useState("");
  const [buttonColor, setButtonColor] = useState('#caced3');
  const [buttonFontColor, setButtonFontColor] = useState('#888888');
  const [fontFamily, setFontFamily] = useState('DM Sans');
  const [fontColor, setFontColor] = useState('#ffffff');
  const [theme, setTheme] = useState('airSnow');

  // ======================================================

    const fetchUser = async () => {
        const response = await fetchUserData();
        const data = await response.json();

        setProfilePreviewId(data.profilePreviewId);
        setImageSrc(data.profileImage || bigMemojiBoy);
        setUserName(data.profileTitle);
        setSelectedColor(data.bannerColor);
        setLinks([
          ...data.social.map(link => ({ ...link, type: 'social' })),
          ...data.shop.map(link => ({ ...link, type: 'shop' })),
        ]); 

        setLayout(data.profileLayout)
        setButtonStyle(data.buttonStyle)
        setButtonColor(data.buttonColor)
        setButtonFontColor(data.buttonFontColor)
        setFontFamily(data.fontFamily)
        setFontColor(data.fontColor)
        setTheme(data.theme)
    };

    useEffect(() => {
      fetchUser();
    }, []);

 const handleSave = async () => {
  const payload = {
    profileLayout: layout,
    buttonStyle,
    buttonColor,
    buttonFontColor,
    fontFamily,
    fontColor,
    theme,
  };

  try {
    const response = await fetch(`${baseUrl}/user/appearance`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const data = await response.json();
    console.log(data)
    if (data.success) {
      alert('Appearance saved!');
    } else {
      alert('Save failed');
    }
  } catch (error) {
    alert('Error saving appearance');
  }
};

const [showMobilePreview, setShowMobilePreview] = useState(false);
// =========================================================================================================================================
  return (
    <div className={style.container}>

      <div className={style.mobilePreviewFixedBtn} onClick={() => setShowMobilePreview(!showMobilePreview)}>
         <img src={eye}/> &nbsp;Preview
      </div>
            
        <div className={style.header}>
              <div>
              <p style={{marginBottom:'4px', letterSpacing:'1px'}}><span style={{fontWeight: '700'}}>Hi,</span>&nbsp;{Name}</p>
              <p style={{color:'#383838', fontSize:'14px'}}>Congratulations, you got a great response today.</p>
              </div>
            </div>
           
        <div className={style.previewContainer} >

      {(window.innerWidth > 375 || showMobilePreview) && (
          <AppearenceProfilePreview imageSrc={imageSrc} 
                          userName={userName} 
                          isSocial={isSocial} 
                          setIsSocial={setIsSocial}  
                          links={links} 
                          bannerColor={selectedColor}
                          profilePreviewId={profilePreviewId}

                          layout={layout}
                          buttonStyle={buttonStyle}
                          buttonColor={buttonColor}
                          buttonFontColor={buttonFontColor}
                          fontFamily={fontFamily}
                          fontColor={fontColor}
                          theme={theme}
                          />
      )}
       {window.innerWidth <= 375 && showMobilePreview && (
        <button
          onClick={() => setShowMobilePreview(false)}
          style={{
            position: 'fixed',
            bottom: "10%",
            left: '50%',
            transform: 'translate(-50%)',
            zIndex: 10000,
            background: 'white',
            border: "none",
            padding: '10px 20px',
            borderRadius: '19px',
            boxShadow: "4px 4px 10px rgb(43, 42, 42, 0.4)",
          }}
        >
          X
        </button>
      )}
      <div className={style.stylesSegmentDiv}>
    {/* =======================-============== LAYOUT SEGMENT =========================================== */}
          <div className={style.layoutSegmentBox}>
              <p>Layout</p>
              <div className={style.layoutSegment}>
                <div className={style.layoutSegmentDiv}>
              
                  <div className={style.stack} onClick={()=> setLayout("stack")}> 
                    <div className={layout === "stack" ? style.activeBg : ""}>
                      <img src={stack} alt="stackImg" /></div>
                    < p>Stack</p>
                  </div>

                  <div className={style.grid} onClick={()=> setLayout("grid")}>
                  <div className={layout === "grid" ? style.activeBg : ""}>
                      <img src={grid} alt="GridImg" /></div>
                    <p>Grid</p>
                  </div>

                  <div className={style.carausel} onClick={()=> setLayout("carausel")}>
                  <div className={layout === "carausel" ? style.activeBg : ""}>        
                      <img src={carausel} alt="CarauselImg" /></div>
                    <p>Carausel</p>
                  </div>

                </div>
              </div>
          </div>
    {/* ========================================== BUTTON SEGEMENT =========================================== */}
        <div className={style.buttonSegmentBox}>
              <p>Button</p>
              <div className={style.buttonSegment}>

                <div className={style.fillDiv}>
                  <p>Fill</p>
                  <div>
                    <div style={{backgroundColor: "#000000"}} onClick={()=>setButtonStyle("fillOne")}></div>
                    <div style={{backgroundColor: "#000000", borderRadius:'8px'}} onClick={()=>setButtonStyle("fillTwo")}></div>
                    <div style={{backgroundColor: "#000000", borderRadius: '24px', outline: "5px solid #F6F7F5"}} onClick={()=>setButtonStyle("fillThree")}></div>
                  </div>
                </div>
              
              <div className={style.outlineDiv}>
                <p>Outline</p>
                <div>
                    <div onClick={()=>setButtonStyle("outlineOne")}></div>
                    <div  style={{ borderRadius:'8px'}} onClick={()=>setButtonStyle("outlineTwo")}></div>
                    <div  style={{ borderRadius:'24px'}} onClick={()=>setButtonStyle("outlineThree")}></div>
                  </div>
              </div>

              <div className={style.hardShadowDiv}>
                <p>Hard shadow</p>
                <div>
                    <div style={{boxShadow: "4px 4px #000000"}} onClick={()=>setButtonStyle("hardShadowOne")}></div>
                    <div style={{boxShadow: "4px 4px #000000", borderRadius:'8px'}}  onClick={()=>setButtonStyle("hardShadowTwo")}></div>
                    <div style={{boxShadow: "4px 4px #000000", borderRadius:'24px'}}  onClick={()=>setButtonStyle("hardShadowThree")}></div>
                  </div>
              </div>

              <div className={style.softShadowDiv}>
                <p>Soft shadow</p>
                <div>
                  <div style={{boxShadow: "0 4px 4px #00000029" , border: "none"}}  onClick={()=>setButtonStyle("softShadowOne")}></div>
                  <div style={{boxShadow: "0 4px 4px #00000029", borderRadius:'8px', border: "none"}} onClick={()=>setButtonStyle("softShadowTwo")}></div>
                  <div style={{boxShadow: "0 4px 4px #00000029", borderRadius:'24px' , border: "none"}} onClick={()=>setButtonStyle("softShadowThree")}></div>
                </div>
              </div>

               <div className={style.specialDiv}>
                <p>Special</p>
                <div>
                    <div className={style.zigZag} onClick={()=>setButtonStyle("specialOne")}></div>
                    <div className={style.wave} onClick={()=>setButtonStyle("specialTwo")}></div>
                    <div className={style.frameBorder} onClick={()=>setButtonStyle("specialThree")}></div>
                    <div style={{backgroundColor: "black", borderRadius:"24px"}} onClick={()=>setButtonStyle("specialFour")}> </div>
                    <div style={{ position: 'relative', width: '100%', height: '100%', overflow:"visible" }} onClick={()=>setButtonStyle("specialFive")}>
                        <div style={{ position: 'absolute', top: "-4px", left: "-4px", width: '8px', height: '8px',border:"1px solid black", backgroundColor: "white" }}></div>
                        <div style={{ position: 'absolute', top: "-4px", right: "-4px",  width: '8px', height: '8px',border:"1px solid black", backgroundColor: "white" }}></div>
                        <div style={{ position: 'absolute', bottom: "-4px", left: "-4px",  width: '8px', height: '8px',border:"1px solid black", backgroundColor: "white" }}></div>
                        <div style={{ position: 'absolute', bottom: "-4px", right: "-4px",  width: '8px', height: '8px',border:"1px solid black", backgroundColor: "white" }}></div>
                    </div>                   
                    <div style={{backgroundColor: "black", 
                      borderTopLeftRadius:"24px", 
                      borderBottomLeftRadius:"24px",
                      width: "100%",
                      height: "100%"}}
                      onClick={()=>setButtonStyle("specialSix")}
                      >
                    </div>
                </div>
              </div>

              <div className={style.buttonColorDiv}> 
                <p>Button color</p>
                <div >
                  <div className={style.buttonColorPreviewDiv}  style={{backgroundColor: buttonColor}}></div>
                  <div className={style.buttonColorInputDiv}>
                    <label htmlFor="buttonColor">Button color</label>
                    <input id="buttonColor" 
                           type="text" 
                           defaultValue="#caced3"
                           onChange={(e)=> setButtonColor(e.target.value)}
                           maxLength={7}
                           />
                  </div> 
                </div>
              </div>

               <div className={style.buttonFontColorDiv}> 
                <p>Button font color</p>
                <div >
                  <div className={style.buttonFontColorPreviewDiv} style={{backgroundColor: buttonFontColor}}></div>
                  <div className={style.buttonFontColorInputDiv}>
                    <label htmlFor="buttonFontColor">Button font color</label>
                    <input id="buttonFontColor" 
                           type="text" 
                           defaultValue="#888888"
                           onChange={(e)=> setButtonFontColor(e.target.value)}
                           maxLength={7}
                           />
                  </div> 
                </div>
              </div>

  
              </div>
        </div>

        {/* =======================-============== FONTS SEGMENT =========================================== */}
          <div className={style.fontSegmentBox}>
              <p>Fonts</p>
              <div className={style.fontSegment}>

                <p>Font</p>
                <div className={style.fontSegmentFontDiv}>
                  <p style={{ fontFamily: fontFamily }}>Aa</p>
                
                  <div style={{ fontFamily: fontFamily }}>      
                      <select value={fontFamily} onChange={(e)=> setFontFamily(e.target.value)}>
                        <option value="DM Sans">DM Sans</option>
                        <option value="Poppins">Poppins</option>
                        <option value="Inter">Inter</option>
                      </select>
                  </div>
                </div>

                <p>Color</p>
                 <div className={style.fontSegmentColorDiv}>
                  <div style={{backgroundColor: fontColor}}></div>
                  <div>
                    <label htmlFor="fontSegmentColor">Color</label>
                    <input id='fontSegmentColor' 
                           type="text" 
                           defaultValue="#ffffff"  
                           onChange={(e) => setFontColor(e.target.value)}
                           maxLength={7} />
                  </div>
                </div>

              </div>
          </div>

        {/* =======================-============== Themes SEGMENT =========================================== */}
          <div className={style.themeSegmentBox}>
              <p>Themes</p>
              <div className={style.themeSegment}>
                <div className={style.themeSegmentDiv}>
                  <div onClick={()=>setTheme("#F9FAFB")}>
                    <div><img src={airSnow}/></div>
                    <p>Air Snow</p>
                  </div>

                  <div onClick={()=>setTheme("#D1D5DB")}>
                    <div><img src={airGrey}/></div>
                    <p>Air Grey</p>
                  </div>

                  <div onClick={()=>setTheme("#9CA3AF")}>
                     <div><img src={airSmoke}/></div>
                    <p>Air Smoke</p>
                  </div>

                  <div onClick={()=>setTheme("#111827")}>
                     <div><img src={airBlack}/></div>
                    <p>Air Black</p>
                  </div>

                  <div onClick={()=>setTheme("#5C8D89")}>
                     <div><img src={mineralBlue}/></div>
                    <p>Mineral Blue</p>
                  </div>

                  <div onClick={()=>setTheme("#4C6A5D")}>
                     <div><img src={mineralGreen}/></div>
                    <p>Mineral Green</p>
                  </div>

                  <div onClick={()=>setTheme("#FFA343")}>
                     <div><img src={mineralOrange}/></div>
                    <p>Mineral Orange</p>
                  </div>

                </div>
                
              </div>
          </div>
    {/* ================================================== */}

        <div className={style.saveBtnDiv}>
            <button className={style.saveBtn} onClick={handleSave}>Save</button>
        </div>          
      </div >
      </div>
    </div>
  )
}

export default Appearence
