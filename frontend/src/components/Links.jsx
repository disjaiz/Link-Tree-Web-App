import React, {useState, useEffect } from 'react'
import style from './Links.module.css'
import share from '../images/share.png'
import { useNavigate ,  useLocation} from 'react-router-dom';
import memojiBoy from "../images/memojiBoy.png";
import bigMemojiBoy from "../images/bigMemojiBoy.png";
import plusImage from "../images/plusImage.png";
import movingOut from "../images/movingOut.png";
import blackFire from "../images/blackFire.png"
import whiteFire from "../images/whiteFire.png"
import HomeIcon from '../svg/HomeIcon.jsx';


function Links() {
  const location = useLocation();
  const userName = location.state?.username; 
  const Name = location.state?.name;
 
  const [imageSrc, setImageSrc] = useState(bigMemojiBoy);
  const [imageFile, setImageFile] = useState(null);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImageSrc(URL.createObjectURL(file));
  //     setImageFile(file);
  //     // optional: upload file to server here
  //   }
  // };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      setImageFile(file);
  
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        const res = await fetch('http://localhost:3000/user/upload-profile-image', {
          method: 'POST',
          body: formData, 
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ profileImage: data.url }),
        });
  
        const data = await res.json();
        console.log('Uploaded image URL:', data); // backend should return the image URL
        // optionally update profileImage in DB here

      } catch (err) {
        console.error('Upload failed:', err);
      }
    }
  };
  



  const handleRemove = () => {
    setImageSrc(bigMemojiBoy);
    setImageFile(null);
    // optional: delete image from server here
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    const formData = new FormData();
    formData.append('image', imageFile);
  
    const res = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });
  
    const data = await res.json();
    setImageSrc(`http://localhost:5000/image/${data.file.filename}`);
  };
  

  const [bio, setBio] = useState("");
  const [isSocial, setIsSocial] = useState(true);

  const [selectedColor, setSelectedColor] = useState('#342B26');
  const presetColors = ['#342B26', '#FFFFFF', '#000000'];
  const [hexInput, setHexInput] = useState("#342B26");

  const handleHexChange = (val) => {
    setHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) setSelectedColor(val);
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

      {/* ===========================preview div======================================== */}
      <div className={style.previewContainer} >

        <div className={style.mobilePreviewDiv}>
          <div className={style.mobilePreview}>
            <div className={style.mobilePreviewHeader}>
              <div className={style.divOne}>
                <img src={movingOut} alt="movingOutPng" />
              </div>
              <div className={style.divTwo}>
                <img src={bigMemojiBoy} alt="memojiBoyPng" height="90%" width="90%"/>
              </div>
              <p>@oppo_08</p>
            </div>
            <div className={style.mobilePreviewSlider}>
              <button>link</button>
              <button>shop</button>
            </div>

            <div>latest yt video</div>
            <div>latest insta video</div>

            <button className={style.getConnectedBtn}>Get Connected</button>

            <div className={style.sparkLogo}><img src={blackFire} alt="fireImg" height="20px"/>&nbsp;SPARK</div>
          </div>

        </div>

        <div className={style.profileDiv}>
          <div className={style.profileSegmentBox}>
              <p>Profile</p>
              <div className={style.profileSegment}>
               <div className={style.pickImageDiv}>
                   <div>
                       <img src={imageSrc} alt="memojiBoy" />  
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
                   {/* <div>
                      <button >Pick an image</button>
                      <button>Remove</button>
                   </div> */}

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
                         Social
                      </span>
                      <span className={`${!isSocial ? style.active : ""} ${style.spanStyle}`}>
                        <HomeIcon color={!isSocial ? "white" : "grey"} />
                        Shop
                     </span>
                    </div>

                  <div className={`${style.slider} ${isSocial ? style.left : style.right}`} ></div>
                </div>

                 <button className={style.addBtn}><img src={plusImage} alt="plusImage" />Add</button>    

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
                      <p>@oppo_08</p>
                     <p><img src={whiteFire} alt="fireImage" height='14px' />/opopo_08</p>
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
