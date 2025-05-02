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
import signOut from "../images/signOut.png";
import { useNavigate ,  useLocation} from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const Name = location.state?.name; 
  const userName = location.state?.username;
  const [activeTab, setActiveTab] = useState("links"); 

  console.log(userName);
  console.log(Name);

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
        const response = await fetch("http://localhost:3000/user/logout", {
            method: "POST",
            credentials: "include",
        });
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

            <button
                onClick={() => setActiveTab("links")}
                className={`
                    ${styles.button}
                    ${activeTab === "links" ? styles.active : ""}
                    ${activeTab === "appearance" ? styles.lowerCurve : ""}
                `}
            >   
            <img src={links} alt="linksImg" style={{ marginRight: '15px' }} />
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
            <img src={appearance} alt="appearanceImg" style={{ marginRight: '15px' }} />
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
            <img src={analytics} alt="analyticsImg" style={{ marginRight: '15px' }} />
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
            <img src={settings} alt="linksImg" style={{ marginRight: '15px' }} />
            <p>Settings</p>
            </button>


        <div style={{flex: '1', backgroundColor: 'white'}} className={`${styles.empty} ${activeTab === "settings" ? styles.upperCurve : ""}`}>
        </div>

        {/* =============== LOG OUT USER ======================== */}
        <div className={styles.memojiContainer} onClick={handleLogout}>
            <div className={styles.memoji}>
            <img src={memojiBoy} alt="memojiBoy" />
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

