import {useState, useEffect, useRef } from 'react'
import style from './Links.module.css'
import share from '../images/share.png'
import { useLocation} from 'react-router-dom';
import bigMemojiBoy from "../images/bigMemojiBoy.png";
import plusImage from "../images/plusImage.png";
import whiteFire from "../images/whiteFire.png"
import deleteImg from '../images/deleteImg.png';
import savedToggle from '../images/savedToggle.png';
import eightPointer from '../images/eightPointer.png';
import clicksLadder from '../images/clicksLadder.png';
import pen from '../images/penImage.png';
import HomeIcon from '../svg/HomeIcon.jsx';
import AddLinkModal from './AddLinkModal.jsx';
import defaultAppIcon from '../images/defaultAppIcon.png';
import eye from "../images/eye.png";
import {fetchUserData, uploadProfileImage, removeProfileImage, deleteLink, updateProfileBanner} from '../FetchMaker.js';
import LinkProfilePreview from './LinkProfilePreview.jsx';
import { toast, ToastContainer } from "react-toastify";
import checkCircle from '../images/checkCircle.png'
import toastErrorImage from "../images/toastErrorImage.png";
import baseUrl, {frontEndBaseUrl} from '../config'; 

function Links() {
  const location = useLocation();
  // const userName = location.state?.username; 
  const Name = location.state?.name;
  const [userName, setUserName] = useState("");
  const [imageSrc, setImageSrc] = useState(bigMemojiBoy);
  const [bio, setBio] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const presetColors = ['#342B26', '#FFFFFF', '#000000'];
  const [hexInput, setHexInput] = useState("#342B26");
  const [showAddLinkModal, setShowAddLinkModal] = useState(false);
  const [showEditLinkModal, setShowEditLinkModal] = useState(false);
  const [isSocial, setIsSocial] = useState(true);
  const [selectedLinkData, setSelectedLinkData] = useState({ title: "", url: "", icon: defaultAppIcon, type:"", id: ""});
  const [links, setLinks] = useState([]);
  const profileRef = useRef();
  const bioRef = useRef();
  const [profilePreviewId, setProfilePreviewId] = useState("");
  const [userData, setUserData] = useState(null);
  const [showMobilePreview, setShowMobilePreview] = useState(false);


  const fetchUser = async () => {
    const response = await fetchUserData();
    const data = await response.json();
    if (!data) return;

    setUserData(data);
  
    setImageSrc(data.profileImage || bigMemojiBoy);
    setUserName(data.profileTitle);
    setSelectedColor(data.bannerColor);
    setBio(data.bio);
    setProfilePreviewId(data.profilePreviewId);
    setLinks([
      ...data.social.map(link => ({ ...link, type: 'social' })),
      ...data.shop.map(link => ({ ...link, type: 'shop' })),
    ]); 
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleHexChange = (val) => {
    setHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) setSelectedColor(val);
  };

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
      // eslint-disable-next-line no-unused-vars
      const data = await res.json();
  
      setImageSrc(bigMemojiBoy);
    } catch (err) {
      console.error('Remove failed:', err);
    }
  };

  const handleDeleteLink =async( id) =>{
    const response = await deleteLink(id);
    const data = await response.json();

       if (data.success) {
              toast.success(
                  <div className={style.toastContent}>
                    <img src={checkCircle} alt="Success" className={style.toastIcon} />
                    <span>link deleted successfully</span>
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
          } 
       else {
             toast.error(
            <div className={style.toastContent} >
              <img src={toastErrorImage} alt="Fail" className={style.toastIcon} />
              <span>failed to delete link</span>
            </div>,
            {
              className: `${style.customToast} ${style.toastRed}`,
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
          }

    if(response.ok){
        setLinks(prev => prev.filter(link => link._id !== id));
    }  
  }

  const handleEditLink = (link) =>{
    setSelectedLinkData({title: link.linkTitle, url: link.linkUrl, icon: link.icon, type: link.type, id: link._id});
    setShowEditLinkModal(true);
  };

  const handleSaveProfile = async () =>{
    const profileTitle = profileRef.current.value;
    const bio = bioRef.current.value;
    try {
      const res = await updateProfileBanner({profileTitle, bio, bannerColor:selectedColor});
      const data = await res.json();
  
      if (data.success) {
              toast.success(
                  <div className={style.toastContent}>
                    <img src={checkCircle} alt="Success" className={style.toastIcon} />
                    <span>Profile saved successfully</span>
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
          } 
       else {
             toast.error(
            <div className={style.toastContent} >
              <img src={toastErrorImage} alt="Fail" className={style.toastIcon} />
              <span>failed to update profile</span>
            </div>,
            {
              className: `${style.customToast} ${style.toastRed}`,
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
          }
    } 
    catch (err) {
      console.error('Profile update failed:', err);
    }
  }

  const handleShareBtn = () =>{
      navigator.clipboard.writeText(frontEndBaseUrl);
  }
//  =====================================================================================
  return (
    <div className={style.container}>
        <ToastContainer   />
      <div className={style.mobilePreviewFixedBtn} onClick={() => setShowMobilePreview(!showMobilePreview)}>
        <img src={eye}/> &nbsp;Preview
        </div>
      {/* ===========================================header========================== */}

      <div className={style.header}>
        <div>
        <p style={{marginBottom:'4px', letterSpacing:'1px'}}><span style={{fontWeight: '700'}}>Hi,</span>&nbsp;{Name}</p>
        <p style={{color:'#383838', fontSize:'14px'}}>Congratulations, you got a great response today.</p>
        </div>
        <button className={style.shareBtn} onClick={handleShareBtn}>
          <img src={share} alt="shareImg" />
          Share
        </button>
      </div>

      <div className={style.previewContainer} >
 {/* ===========================  MOBILE preview ======================================== */}
 {(window.innerWidth > 375 || showMobilePreview) && (
    <LinkProfilePreview
                    user={userData}
                    imageSrc={imageSrc} 
                    userName={userName} 
                    isSocial={isSocial} 
                    setIsSocial={setIsSocial}  
                    // links={links} 
                    bannerColor={selectedColor}
                    profilePreviewId={profilePreviewId}
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

{/* ========================== PROFILE SEGMENTS ================================== */}
        <div className={style.profileDiv} style={{display: showMobilePreview ? "none": "block"}}>
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
                    <input id="profileTitle" type="text" defaultValue={userName} ref={profileRef}/>
              </div> 
              <div>      
                    <label htmlFor="bio">Bio</label>
                    <input id="bio" type="text" placeholder="Bio" maxLength="80" defaultValue={bio || ""} onChange={(e) => setBio(e.target.value)} ref={bioRef}/>
                    
              </div>
              <div>
                <p>{bio?.length || 0}/80</p>

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

                <button className={style.addBtn} onClick={()=>setShowAddLinkModal(true)}>
                    <img src={plusImage} alt="plusImage" />
                    Add
                </button>  

                 {/*================================Render links===================================  */}
                 <div className={style.linksList}>
                      {links
                        .filter(link => isSocial ? link.type === 'social' : link.type === 'shop')
                        .map((link, index) => (
                          <div key={index} className={style.linkCard}>
                            <div className={style.eightPointerDiv}>
                              <img src={eightPointer} alt="" />
                            </div>
                            <div className={style.linkCardDetailsDiv}>
                              <p className={style.linkTitle}>
                                {link.linkTitle}
                                 <img src={pen} onClick={()=>handleEditLink(link)}/>
                              </p>
                              <p className={style.linkUrl}>
                                {link.linkUrl} 
                                <img src={pen} onClick={()=>handleEditLink(link)}/>
                              </p>
                              <div className={style.clicksCountDiv}>
                                <img src={clicksLadder} alt="clicksLadderImg" />
                                <p>{link.clickCount}</p>
                              </div>
                            </div>
                            <div className={style.linkCardControlsDiv}> 
                              <img src={savedToggle} alt="savedToggleImg" />
                              <img  onClick={() => handleDeleteLink(link._id)} src={deleteImg} alt="deleteImg" />
                            </div>
                          </div>
                      ))}
                  </div>
                {/* ======================================================================================== */}
                {showAddLinkModal && (
                        <AddLinkModal
                          mode = "add"
                          linkData = "null"
                          onClose={() => {
                                          setShowAddLinkModal(false);
                                          fetchUser();
                                        }
                          }
                          isSocial={isSocial}
                          setIsSocial={setIsSocial}
                        />
                )}

                 {showEditLinkModal && (
                        <AddLinkModal
                          mode="edit" 
                          linkData={selectedLinkData} 
                          onClose={() => {
                                          setShowEditLinkModal(false);
                                          fetchUser();
                                        }
                          }
                          isSocial={isSocial}
                          setIsSocial={setIsSocial}
                        />
                )}
              </div>
          </div>
          {/* ================================================================================================ */}


        <div className={style.bannerSegmentBox}>
              <p>Banner</p>
              <div className={style.bannerSegment}>
                <div className={style.bannerSegmentProfileBoard} style={{ backgroundColor: selectedColor }}>

                  <div className={style.avatarWrapper}>
                    {/* <div><img src={bigMemojiBoy} alt="memojiBoyImg" /></div> */}
                     <div><img src={imageSrc.startsWith("/uploads") ? `${baseUrl}${imageSrc}` : imageSrc} style={{objectFit: "fill"}} /></div>

                  </div>
                  <div className={style.textWrapper}>
                      <p>{userName}</p>
                     <p><img src={whiteFire} alt="fireImage" height='14px' width='14px'/>/<span>{bio}</span></p>
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
            <button className={style.saveBtn} onClick={handleSaveProfile}>Save</button>
        </div>          
      </div >
    </div>

    </div>
  )
}

export default Links
