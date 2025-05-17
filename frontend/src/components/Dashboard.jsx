import React, {useState, useRef, useEffect, use} from 'react'
import styles from './Dashboard.module.css'
import fire from '../images/fire.png'
import spark from '../images/spark.png'

import Links from "./Links";
import Appearence from "./Appearence";
import Analytics from "./Analytics";
import Settings from "./Settings";

import links from "../images/linksImg.png";
import appearance from "../images/appearanceImg.png";
import analytics from "../images/analyticsImg.png";
import settings from "../images/settingsImg.png";
import memojiBoy from "../images/memojiBoy.png";
import bigMemojiBoy from "../images/bigMemojiBoy.png";
import signOut from "../images/signOut.png";
import { useNavigate ,  useLocation} from 'react-router-dom';
import {logout} from '../FetchMaker.js';
import {fetchUserData} from '../FetchMaker.js';
const port = 3000 || 5000;
// const baseUrl = `http://192.168.0.105:${port}`;
const baseUrl = `https://link-tree-web-app-1.onrender.com`;

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const Name = location.state?.name; 
  const userName = location.state?.username;
  const [activeTab, setActiveTab] = useState("links"); 

  const [imageSrc, setImageSrc] = useState(bigMemojiBoy);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetchUserData();
      const data = await response.json();
    
      setImageSrc(data.profileImage || memojiBoy );
    };
    fetchUser();
  }, []);

  const renderComponent = () => {
    switch (activeTab) {
      case "appearance":
        return <Appearence />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      default:
        return <Links />;
    }
  };

  const handleLogout = async () => {
    try {
        const response = await logout();
        const data = await response.json();

        if (response.ok) {
            navigate('/',  { state: { username: Name } });
        } else {
            console.error("Logout failed:", data.msg);
        }
    } catch (error) {
        console.error("Error logging out:", error);
    }
};
  // ===============================================================================================================================================
    return (
      <div className={styles.dashboardContainer}>
  
        <div className={styles.sidebar}>

            <div className={`${styles.sparkLogo} ${activeTab === "links" ? styles.lowerCurve : ""}`}>
                <img src={fire} alt="fire_logo" />
                <img src={spark} alt="spark_logo" />
            </div>
            
            <div className={styles.optionBtnsContainer}>
            <button
                onClick={() => setActiveTab("links")}
                className={`
                    ${styles.button}
                    ${activeTab === "links" ? styles.active : ""}
                    ${activeTab === "appearance" ? styles.lowerCurve : ""}
                `}
            >   
            {/* <img src={links} alt="linksImg" style={{ marginRight: '15px' }} /> */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="#676767" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M18 1.28571H0V0H18V1.28571ZM0 5.78571L0.5625 5.14286H17.4375L18 
                  5.78571V12.2143L17.4375 12.8571H0.5625L0 12.2143V5.78571ZM1.125 6.42857V11.5714H16.875V6.42857H1.125ZM0 
                  18H18V16.7143H0V18Z" />
              </svg>
            <p>Links</p>
            </button>
            
            <button
                onClick={() => setActiveTab("appearance")}
                className={`
                    ${styles.button}
                    ${activeTab === "appearance" ? styles.active : ""}
                    ${activeTab === "links" ? styles.upperCurve : ""}
                    ${activeTab === "analytics" ? styles.lowerCurve : ""}
                `}
            >
            {/* <img src={appearance} alt="appearanceImg" style={{ marginRight: '15px' }} /> */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#676767" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.00862 1C4.68024 1 3.40626 1.52773 2.46695 2.4671C1.52764 3.40647 0.999938 4.68053 0.999938 6.009C0.999938 7.33747 1.52764 8.61153 2.46695 9.5509C3.40626 10.4903 4.68024 11.018 6.00862 11.018V12.018C4.41504 12.018 2.88672 11.3849 1.75989 10.258C0.63305 9.1311 0 7.60269 0 6.009C0 4.41531 0.63305 2.8869 1.75989 1.76C2.88672 0.633089 4.41504 8.32162e-08 6.00862 8.32162e-08V1ZM11.0183 6.009C11.0183 5.35112 10.8887 4.69969 10.637 4.09191C10.3852 3.48412 10.0162 2.93189 9.55095 2.46675C9.08574 2.00161 8.53347 1.63267 7.92567 1.381C7.31788 1.12933 6.66646 0.999869 6.00862 1V8.32162e-08C6.79777 -0.000131253 7.57922 0.155199 8.30833 0.457121C9.03745 0.759043 9.69995 1.20164 10.258 1.75964C10.8161 2.31764 11.2587 2.98011 11.5608 3.70922C11.8628 4.43833 12.0182 5.2198 12.0182 6.009H11.0183ZM7.00856 6.509L6.50859 7.009V15.5L7.00856 16H15.5L16 15.5V7.008L15.5 6.508H7.00756L7.00856 6.509ZM7.50853 15.001V7.508H15.0001V15.001H7.50853Z"/>
            </svg>

            <p>Appearance</p>
            </button>

            <button
                onClick={() => setActiveTab("analytics")}
                className={`
                    ${styles.button}
                    ${activeTab === "analytics" ? styles.active : ""}
                    ${activeTab === "appearance" ? styles.upperCurve : ""}
                    ${activeTab === "settings" ? styles.lowerCurve : ""}
                `}
            >
            {/* <img src={analytics} alt="analyticsImg" style={{ marginRight: '15px' }} /> */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#676767" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.23901 3.15094C6.5706 3.40581 6.76129 3.78586 6.76129 4.19365C6.76129 7.48069 6.87462 8.36523 7.33794 8.7018C7.64196 8.92144 8.05856 8.91919 9.46228 8.88096C10.1147 8.86222 10.9502 8.83823 12.0446 8.83823C12.4811 8.83823 12.8923 9.02113 13.1711 9.33972C13.4299 9.63581 13.5432 10.0226 13.4835 10.4034C12.972 13.6455 10.1538 16 6.78273 16C3.04254 16 0 13.0218 0 9.36146C0 6.45897 2.24227 3.55648 4.9984 2.89233C5.42879 2.78963 5.89133 2.88558 6.23901 3.15094ZM5.34684 3.97551C5.32234 3.97551 5.29783 3.97851 5.27333 3.98451C2.99889 4.53247 1.14871 6.94472 1.14871 9.36146C1.14871 12.4019 3.67586 14.8756 6.78273 14.8756C9.58327 14.8756 11.9236 12.9229 12.3478 10.2318C12.3509 10.2093 12.3616 10.144 12.2988 10.0713C12.2391 10.0031 12.1441 9.96264 12.0446 9.96264C10.964 9.96264 10.1392 9.98663 9.49521 10.0046C7.93603 10.0503 7.29122 10.0676 6.65407 9.60508C5.743 8.94441 5.62322 7.83371 5.61333 4.71691L5.61258 4.19365C5.61258 4.13068 5.58501 4.07821 5.52987 4.03623C5.47856 3.9965 5.41347 3.97551 5.34684 3.97551ZM13.8231 2.04924C15.1694 3.3663 16.024 5.09715 15.9995 6.45919C15.9903 6.99067 15.5959 7.43444 15.0629 7.51314C14.0229 7.66681 12.8053 7.71329 11.7278 7.71329C10.7246 7.71329 9.84166 7.67356 9.33393 7.64508C8.69525 7.60835 8.18675 7.10985 8.14999 6.48468C8.09026 5.4937 7.96084 2.97576 8.05274 1.02827C8.07801 0.462315 8.54515 0.0118 9.11644 0.0020551C10.753 -0.0444207 12.4416 0.699192 13.8231 2.04924ZM9.21446 1.12572H9.19761C9.11338 3.01399 9.2382 5.45322 9.2964 6.41946C9.29947 6.47718 9.34235 6.51916 9.40055 6.52216C10.1878 6.56639 12.9003 6.68932 14.8508 6.40822C14.8554 5.35577 14.1194 3.92851 13.0113 2.84458C11.8749 1.73365 10.5301 1.12572 9.21446 1.12572Z"/>
            </svg>
            <p>Analytics</p>
        </button>

        <button
            onClick={() => setActiveTab("settings")}
            className={`
                ${styles.button}
                ${activeTab === "settings" ? styles.active : ""}
                ${activeTab === "analytics" ? styles.upperCurve : ""}
                
            `}
        >
            {/* <img src={settings} alt="linksImg" style={{ marginRight: '15px' }} /> */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#676767" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5184 0C9.11244 0 9.68988 0.227016 10.1039 0.621592C10.5171 1.01848 10.7452 1.56286 10.7278 2.11496C10.7294 2.23927 10.7734 2.3829 10.8531 2.50876C10.985 2.71724 11.1932 2.86395 11.4405 2.92418C11.6877 2.98132 11.9466 2.95044 12.1664 2.82921C13.2284 2.26476 14.5799 2.60296 15.1864 3.58361L15.7033 4.41678C15.7165 4.43917 15.7282 4.46079 15.7381 4.48318C16.2874 5.44916 15.9206 6.66532 14.9002 7.2205C14.7516 7.30003 14.6313 7.41123 14.5484 7.54558C14.4198 7.75329 14.3841 8.00039 14.4488 8.2274C14.5152 8.45905 14.6737 8.65132 14.8968 8.77023C15.4004 9.03972 15.7763 9.49375 15.9265 10.018C16.0766 10.5416 15.9945 11.1099 15.7016 11.5786L15.1507 12.4326C14.5442 13.4024 13.1927 13.7383 12.1415 13.1731C12.0013 13.0982 11.8395 13.0573 11.6786 13.0534H11.6736C11.4338 13.0534 11.1874 13.1484 11.0082 13.3144C10.8265 13.4835 10.727 13.709 10.7286 13.9484C10.7228 15.0827 9.73137 16 8.5184 16H7.47884C6.26006 16 5.26862 15.078 5.26862 13.9437C5.26696 13.804 5.22381 13.6588 5.14334 13.5329C5.01308 13.3214 4.80235 13.17 4.55926 13.1098C4.31782 13.0496 4.05316 13.0828 3.83579 13.2001C3.31476 13.4704 2.70164 13.536 2.14079 13.3893C1.58077 13.2418 1.09708 12.8835 0.813334 12.4087L0.294795 11.577C-0.311687 10.5979 0.0492153 9.34318 1.09957 8.77795C1.39742 8.61812 1.58243 8.32006 1.58243 8.00039C1.58243 7.68071 1.39742 7.38188 1.09957 7.22205C0.0483857 6.65373 -0.311687 5.39588 0.293966 4.41678L0.856476 3.55736C1.45466 2.58906 2.80701 2.24777 3.86151 2.81145C4.00504 2.89098 4.16102 2.93113 4.31948 2.93268C4.83636 2.93268 5.26862 2.53578 5.27691 2.04778C5.27359 1.50958 5.50175 0.993002 5.91741 0.60306C6.33473 0.213889 6.88895 0 7.47884 0H8.5184ZM8.5184 1.15825H7.47884C7.22164 1.15825 6.98104 1.25168 6.79934 1.42001C6.61848 1.58911 6.51975 1.81381 6.52141 2.05318C6.50398 3.18209 5.51254 4.09092 4.31202 4.09092C3.92705 4.08706 3.5562 3.99054 3.23429 3.8114C2.78212 3.57203 2.1914 3.71951 1.92674 4.14806L1.36506 5.00748C1.10786 5.4229 1.2655 5.97191 1.72347 6.21978C2.40297 6.58578 2.82692 7.26837 2.82692 8.00039C2.82692 8.7324 2.40297 9.41422 1.72181 9.78099C1.26633 10.0265 1.10869 10.5725 1.37253 10.9972L1.89604 11.8373C2.02547 12.0542 2.23703 12.211 2.48178 12.2751C2.7257 12.3384 2.99451 12.3114 3.21852 12.1956C3.5479 12.0156 3.9312 11.9222 4.31616 11.9222C4.50616 11.9222 4.69615 11.9446 4.88199 11.9909C5.44285 12.1315 5.92986 12.4805 6.21858 12.9492C6.40608 13.2434 6.50979 13.587 6.51311 13.9376C6.51311 14.4395 6.94619 14.8418 7.47884 14.8418H8.5184C9.04856 14.8418 9.48164 14.4418 9.48413 13.9484C9.48081 13.4032 9.7098 12.8851 10.1288 12.4952C10.5419 12.1106 11.1194 11.8797 11.6968 11.8952C12.0752 11.9037 12.4394 11.9986 12.7605 12.1685C13.2226 12.4148 13.8125 12.2681 14.0796 11.8434L14.6305 10.9887C14.7533 10.7918 14.789 10.5447 14.7234 10.3169C14.6587 10.0891 14.4961 9.89141 14.2771 9.77482C13.7644 9.49993 13.3985 9.05671 13.2466 8.52546C13.0965 8.00425 13.1786 7.43516 13.4715 6.96646C13.6623 6.65759 13.9419 6.39737 14.2771 6.21823C14.7268 5.97346 14.8844 5.42599 14.6231 4.99976C14.6123 4.98277 14.6023 4.96501 14.594 4.94648L14.1078 4.16196C13.8432 3.73341 13.2541 3.58593 12.792 3.8307C12.2925 4.10559 11.6985 4.18435 11.1277 4.04459C10.5577 3.90715 10.0798 3.57126 9.78198 3.09715C9.59116 2.80064 9.48745 2.45548 9.48413 2.10415C9.49159 1.84007 9.39204 1.60301 9.21117 1.42927C9.03113 1.25631 8.77809 1.15825 8.5184 1.15825ZM8.00227 5.38515C9.55125 5.38515 10.8115 6.55883 10.8115 8.00046C10.8115 9.44209 9.55125 10.6142 8.00227 10.6142C6.45329 10.6142 5.19303 9.44209 5.19303 8.00046C5.19303 6.55883 6.45329 5.38515 8.00227 5.38515ZM8.00227 6.54339C7.13942 6.54339 6.43753 7.19741 6.43753 8.00046C6.43753 8.80351 7.13942 9.45599 8.00227 9.45599C8.86512 9.45599 9.56701 8.80351 9.56701 8.00046C9.56701 7.19741 8.86512 6.54339 8.00227 6.54339Z"/>
            </svg>
            <p>Settings</p>
            </button>
            </div>

        <div style={{flex: '1', backgroundColor: 'white'}} className={`${styles.empty} ${activeTab === "settings" ? styles.upperCurve : ""}`}>
        </div>

        {/* =============== LOG OUT USER ======================== */}
        <div className={styles.memojiContainer} onClick={handleLogout}>
            <div className={styles.memoji}>
            {/* <img src={memojiBoy} alt="memojiBoy" /> */}
            <img src={imageSrc.startsWith("/uploads") ? `${baseUrl}${imageSrc}` : imageSrc} style={{objectFit:"cover"}} />
            </div>
            <p className={styles.memojiName}>{userName}</p>
        </div>
        <div className={styles.tooltip}>
                <img src={signOut} alt="logout icon" />
               <p>Sign Out</p>
        </div>
       {/* ================================================================ */}
    </div>

        {/* =========== RENDER COMPS ================= */}
        <div className={styles.content}>
          {renderComponent()}
        </div>
        {/* ============================================ */}
  
      </div>
    )
}

export default Dashboard

