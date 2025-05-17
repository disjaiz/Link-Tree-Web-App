import React , {useState} from 'react'
import sideWoman from '../images/sideWoman.png'
import style from  './Personalisation.module.css'
import fire from '../images/fire.png'
import spark from '../images/SPARK.png'
import business from '../images/business.png'
import creative from '../images/creative.png'
import education from '../images/education.png'
import entertainment from '../images/entertainment.png'
import fashion from '../images/fashion&beauty.png'
import food from '../images/food&beverage.png'
import government from '../images/government&politics.png'
import health from '../images/health&wellness.png'
import heart from '../images/heart.png'
import tech from '../images/tech.png'
import travel from '../images/travel&tourism.png'
import { useNavigate ,  useLocation} from 'react-router-dom';
import {updateProfileTitle} from '../FetchMaker';

const options = [
    { name: "Business", image: business },
    { name: "Creative", image: creative },
    { name: "Education", image: education },
    { name: "Entertainment", image: entertainment },
    { name: "Fashion & Beauty", image: fashion },
    { name: "Food & Beverage", image: food},
    { name: "Government & Politics", image: government },
    { name: "Health & Wellness", image: health },
    { name: "Non-Profit", image: heart },
    { name: "Other", image: heart },
    { name: "Tech", image: tech },
    { name: "Travel & Tourism", image: travel },
  ];

function Personalisation() {
  const location = useLocation();
  const userId = location.state?.userid;
  const Name = location.state?.name; 

  // console.log(userName);

    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    const [name, setName] = useState("");

    const handleContinue = async () => {
      if (!name || selected === null) {
        alert("Please enter your name and select a category.");
        return;
    }
    console.log("Name:", name);
    console.log("Category:", options[selected].name);

    const profileTitle = name; 

    try {
        const response = await updateProfileTitle(userId,  profileTitle );
        const data = await response.json();
        if (response.ok) {
            console.log("Profile title updated:", data.user);
        } else {
            console.error("Error updating profile:", data.message);
        }
    } catch (error) {
        console.error("Server error:", error);
    }

    navigate("/dashboard",  { state: { name: Name , username : name} });
    }
  // ===============================================================================================================================================
    return (
      <div className={style.container}>
        <div className={style.sparkLogo}>
            <img src={fire} alt="fire_logo"/>
            <img src={spark} alt="spark_logo" />
        </div>
  
        <div className={style.middleContainer}>
          <h1>Tell us about yourself</h1>
          <p id={style.pOne}>For a Personalised Spark experience</p>

          <input 
            type="text" 
            name="" 
            placeholder='Tell us your username'  
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            />

          <p id={style.pTwo}>Select one category that best describes your Linktree:</p>

          <div className={style.selectContainer}>
                {options.map((option, index) => (
                    <div
                      key={index}
                      className={`${style.selectItem} ${selected === index ? style.selected : ""}`}
                      onClick={() => setSelected(index)}
                    >
                        <img src={option.image} alt={option.name} className={style.optionImage} style={{marginRight: '0.6em'}} />
                        <span>{option.name}</span>
                    </div>
                ))}
        </div>

        <button onClick={handleContinue}>Continue</button>

        </div>
  
        <div className={style.sideWoman}>
            <img src={sideWoman} alt="sideWomanImg" />
        </div>
       
      </div>
    )
}

export default Personalisation
