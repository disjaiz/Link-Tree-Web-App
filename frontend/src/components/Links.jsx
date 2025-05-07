import React, {useState, useEffect } from 'react'
import style from './Links.module.css'
import share from '../images/share.png'
import {  useNavigate, useLocation} from 'react-router-dom';
import bigMemojiBoy from "../images/bigMemojiBoy.png";
import plusImage from "../images/plusImage.png";
import movingOut from "../images/movingOut.png";
import blackFire from "../images/blackFire.png"
import whiteFire from "../images/whiteFire.png"
import HomeIcon from '../svg/HomeIcon.jsx';
import AddLinkModal from './AddLinkModal.jsx';
import {fetchUserData, uploadProfileImage, removeProfileImage} from '../FetchMaker.js';
const port = 3000 || 5000;
const baseUrl = `http://192.168.0.105:${port}`;

function Links() {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = location.state?.username; 
  const Name = location.state?.name;
 
  const [imageSrc, setImageSrc] = useState(bigMemojiBoy);
  const [bio, setBio] = useState("");
  const [selectedColor, setSelectedColor] = useState('#342B26');
  const presetColors = ['#342B26', '#FFFFFF', '#000000'];
  const [hexInput, setHexInput] = useState("#342B26");

  const [showModal, setShowModal] = useState(false);
  const [isSocial, setIsSocial] = useState(true);

  const handleHexChange = (val) => {
    setHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) setSelectedColor(val);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetchUserData();
      const data = await response.json();
    
      setImageSrc(data.profileImage || bigMemojiBoy);
    };
    fetchUser();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setImageSrc(URL.createObjectURL(file));
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const res = await uploadProfileImage(formData);
      const data = await res.json();
      console.log('Uploaded image URL:', data.imageUrl);
  
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };
  
  const handleRemove = async () => {
    try {
      const res = await removeProfileImage();
      const data = await res.json();
  
      setImageSrc(bigMemojiBoy);
    } catch (err) {
      console.error('Remove failed:', err);
    }
  };

//  =====================================================================================
  return (
    <div className={style.container}>
      {/* ===========================================header========================== */}

      <div className={style.header}>
        <div>
        <p style={{marginBottom:'4px', letterSpacing:'1px'}}><span style={{fontWeight: '700'}}>Hi,</span>&nbsp;{Name}</p>
        <p style={{color:'#383838', fontSize:'14px'}}>Congratulations, you got a great response today.</p>
        </div>
        <button className={style.shareBtn}>
          <img src={share} alt="shareImg" />
          Share
        </button>
      </div>

     
      <div className={style.previewContainer} >
 {/* ===========================  MOBILE preview ======================================== */}
        <div className={style.mobilePreviewDiv}>
          <div className={style.mobilePreview}>
            <div className={style.mobilePreviewHeader}>
              <div className={style.divOne}>
                <img src={movingOut} alt="movingOutPng" />
              </div>
              <div className={style.divTwo}>
                <img src={imageSrc.startsWith("/uploads") ? `${baseUrl}${imageSrc}` : imageSrc} style={{objectFit: "fill"}} height="90%" width="90%"/>
              </div>
              <p>{userName}</p>
            </div>
            <div className={style.mobilePreviewSlider}>
              {/* <button>link</button>
              <button>shop</button> */}
                  <div className={style.toggleWrapper} onClick={() => setIsSocial(!isSocial)}>
                    <div className={style.labels}>
                      <span className={`${isSocial ? style.active : ""} ${style.spanStyle}`}>   
                        Link
                      </span>
                      <span className={`${!isSocial ? style.active : ""} ${style.spanStyle}`}>
                        Shop
                     </span>
                    </div>

                  <div className={`${style.slider} ${isSocial ? style.left : style.right}`} ></div>
                </div>
            </div>

            <div>latest yt video</div>
            <div>latest insta video</div>

            <button className={style.getConnectedBtn} onClick={()=> navigate('/')}>Get Connected</button>

            <div className={style.sparkLogo}><img src={blackFire} alt="fireImg" height="20px"/>&nbsp;SPARK</div>
          </div>

        </div>

{/* ========================== PROFILE SEGMENTS ================================== */}
        <div className={style.profileDiv}>
          <div className={style.profileSegmentBox}>
              <p>Profile</p>
              <div className={style.profileSegment}>
               <div className={style.pickImageDiv}>
                   <div>
                       {/* <img src={imageSrc} alt="memojiBoy" />  */}
                       {/* <img src={`http://localhost:3000${imageSrc}`} alt="profile" /> */}
                       <img src={imageSrc.startsWith("/uploads") ? `${baseUrl}${imageSrc}` : imageSrc} style={{objectFit: "fill"}} />

                   </div>

                   <div>
                        <label htmlFor="imageInput" className={style.imagePickerBtn}>Pick an image</label>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          id="imageInput"
                          onChange={handleImageChange}
                        />
                       <button type="button" onClick={handleRemove} className={style.imageRemoverBtn}>Remove</button>
                  </div>
               </div>

              <div >
                    <label htmlFor="profileTitle">Profile Title</label>
                    <input id="profileTitle" type="text" value={userName} readOnly/>
              </div> 
              <div>      
                    <label htmlFor="bio">Bio</label>
                    <input id="bio" type="text" placeholder="Bio" maxLength="80"  onChange={(e) => setBio(e.target.value)}/>
                    
              </div>
              <div>
                <p>{bio.length}/80</p>
              </div>
              </div>

              <div className={style.profileSegmentPartTwo}>

                <div className={style.toggleWrapper} onClick={() => setIsSocial(!isSocial)}>
                    <div className={style.labels}>
                      <span className={`${isSocial ? style.active : ""} ${style.spanStyle}`}>
                         <HomeIcon color={isSocial ? "white" : "grey"} />
                         Add Link
                      </span>
                      <span className={`${!isSocial ? style.active : ""} ${style.spanStyle}`}>
                        <HomeIcon color={!isSocial ? "white" : "grey"} />
                        Add Shop
                     </span>
                    </div>

                  <div className={`${style.slider} ${isSocial ? style.left : style.right}`} ></div>
                </div>

                <button className={style.addBtn} onClick={() => setShowModal(true)}>
                    <img src={plusImage} alt="plusImage" />
                    Add
                </button>    

                {showModal && (
                        <AddLinkModal
                          onClose={() => setShowModal(false)}
                          isSocial={isSocial}
                          setIsSocial={setIsSocial}
                        />
                )}
              </div>
          </div>

        <div className={style.bannerSegmentBox}>
              <p>Banner</p>
              <div className={style.bannerSegment}>
                <div className={style.bannerSegmentProfileBoard} style={{ backgroundColor: selectedColor }}>

                  <div className={style.avatarWrapper}>
                    <div><img src={bigMemojiBoy} alt="memojiBoyImg" /></div>
                    
                  </div>
                  <div className={style.textWrapper}>
                      <p>{userName}</p>
                     <p><img src={whiteFire} alt="fireImage" height='14px' />/{userName}</p>
                  </div>

                </div>  
                
                     
                <div className={style.colorPicker}>
                  <p>Custom Background Color</p>

                  <div className={style.colorOptions}>
                    {presetColors.map((color) => (
                      <div
                        key={color}
                        className={`${style.colorCircle} ${selectedColor === color ? style.active : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>

                  <div style={{ display: 'flex',  gap: '10px', }}>
                      <div className={style.previewCircle} style={{ backgroundColor: selectedColor }} />

                      <div className={style.hexInputRow}>
                        <input
                          type="text"
                          value={hexInput}
                          onChange={(e) => handleHexChange(e.target.value)}
                          maxLength={7}
                          className={style.hexInput}
                        />
                      </div>
                  </div>             
</div>
              </div>
        </div>

        <div className={style.saveBtnDiv}>
            <button className={style.saveBtn}>Save</button>
        </div>          
      </div >
    </div>

    </div>
  )
}

export default Links
