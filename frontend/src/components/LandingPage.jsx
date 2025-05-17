import React from 'react'
import fire from '../images/fire.png'
import spark from '../images/SPARK.png'
import greenPallete from '../images/green_pallet.png'
import bubbleGum from '../images/bubbleGum.png'
import blackWoman from '../images/blackWoman.png'
import manInSparkles from '../images/manInSparkles.png'
import audiomackLogo from '../images/audiomackLogo.png'
import books from '../images/books.png'
import clubHouse from '../images/clubHouse.png'
import bandSinTown from '../images/bandsinTown.png'
import buyMeAGift from '../images/buyMeAGift.png'
import community from '../images/Community.png'
import bonFire from '../images/bonFire.png'
import cameo from '../images/Cameo.png'
import contactDetails from '../images/contactDetails.png'
import twitter from '../images/twitterLogo.png'
import instagram from '../images/instagramLogo.png'
import youtube from '../images/youtubeLogo.png'
import tiktok from '../images/tiktokLogo.png'
import linktree from '../images/linkTreeLogo.png'
import boxOne from '../images/boxOne.png'
import style from  './LandingPage.module.css'
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

  return (
    <div className={style.page}>   
    <div className={style.container}>

        <div className={style.navbarTab}>
            <div className={style.logoBox}> 
                <img src={fire} alt="fire_logo" style={{ height: '25px' }} />
                <div className={style.separatorContainer}>
                <img src={spark} alt="spark_logo" style={{ height: '15px' }} />

                <div className={style.separator}></div>
                </div>
                <p style={{ display: "inline-block" }}>Marketplace</p>
            </div>
            <button className={style.signupBtn} onClick={()=> navigate('/signup')}>Sign up free</button>
        </div>

        <div className={style.boxOne}>
            <div className={style.boxOneLeft}>
                <p>The easiest place to  update and share your Connection</p>
                <p>Help your followers discover everything you're sharing all over the internet, 
                    in one simple place. They'll thank you for it! </p>
                <button onClick={()=> navigate('/signup')} >Get your free spark</button>
            </div>
            <img  className={style.boxOneRight} src={boxOne}  alt="boxOneImage" />
        </div>

        <div className={style.boxTwo}>
          
            <div className={style.boxTwoLeft}>
                 <img src={greenPallete}   alt="color_pallete_img" />
                 <p>Sell products and collect payments. It's monetization made simple.</p>
            </div>

            <div className={style.boxTwoRight}>
                <p>Analyze your audience and keep your followers engaged</p>
                <p>Track your engagement over time, monitor reevenue and learn what's converting your audience. 
                    Make informed updates on the fly to keep them coming back.</p>
            </div>  

               
        </div>

        <div className={style.boxThree}>
            <div className={style.boxThreeLeft}>
                 <p>Share limitless content in limitless ways</p>
                 <p>Connect your content in all its forms and help followers find more of what they're looking for. Your TikToks, Tweets, Youtube videos,
                    music, articles, recipes, podcasts, and more... It all comes together in powerful place
                 </p>
            </div>

            <div className={style.boxThreeRight}>
                <div className={style.boxThreeRightImages}>
                    <img src={bubbleGum} alt="bubbleGum" />
                    <img src={blackWoman} alt="blackWoman" />
                    <img src={manInSparkles} alt="manInSparkles" />
                </div>
               
                <p>Share your content in limitless ways on your Spark</p>
            </div>    
        </div>

        <div className={style.boxFour}>
            <div className={style.boxFourLeft}>
                <p>Here's what our <span style={{color:'#28A263'}}>customer</span> has to say</p>
                <p>Read customer stories</p>
            </div>
        </div>  

        <div className={style.boxFive}>
            <div className={style.boxFiveItems} >
                <p>Amazing tool! Saved me months</p>
                <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.</p>
                <div>
                    <div className={style.circle}></div>
                    <div className={style.circleText}>
                        <p>John Master</p>
                        <p>Director, Spark.com</p>
                    </div>
                </div>
            </div>
            <div className={style.boxFiveItems}>
            <p>Amazing tool! Saved me months</p>
                <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.</p>
                <div>
                    <div className={style.circle}></div>
                    <div className={style.circleText}>
                        <p>John Master</p>
                        <p>Director, Spark.com</p>
                    </div>
                </div>
              </div>
              <div className={style.boxFiveItems} >
              <p>Amazing tool! Saved me months</p>
                <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.</p>
                <div>
                    <div className={style.circle}></div>
                    <div className={style.circleText}>
                        <p>John Master</p>
                        <p>Director, Spark.com</p>
                    </div>
                </div>
              </div>
              <div className={style.boxFiveItems}>
              <p>Amazing tool! Saved me months</p>
                <p>This is a placeholder for your testimonials and what your client has to say, put them here and make sure its 100% true and meaningful.</p>
                <div>
                    <div className={style.circle}></div>
                    <div className={style.circleText}>
                        <p>John Master</p>
                        <p>Director, Spark.com</p>
                    </div>
                </div>
              </div>
        </div> 

        <p className={style.appsListHeading}>All Link Apps and Integrations</p>

        <div className={style.appsList}>     
            <div>
                <img src={audiomackLogo} alt="audiomack_logo" />
                <div>
                    <p>Audiomack</p>
                    <p>Add an Audiomack player to your Linktree</p>
                </div>
            </div>
            <div> 
                <img src={bandSinTown} alt="bandsintown_logo" />
                <div>
                    <p>bandsintown</p>
                    <p>Drive ticket sales by listing your events</p>
                </div>
            </div>
            <div> 
                <img src={bonFire} alt="bonfire_logo" />
                <div>
                    <p>Bonfire</p>
                    <p>Display and sell your custom merch</p>
                </div>
            </div>
            <div> 
                <img src={books} alt="books_logo" />
                <div>
                    <p>Books</p>
                    <p>Promote books on your Linktree</p>
                </div>
            </div>
            <div> 
                <img src={buyMeAGift} alt="buyMeAGift_logo" />
                <div>
                    <p>Buy Me A Gift</p>
                    <p>Let visitors suppport you with a small gift</p>
                </div>
            </div>
            <div> 
                <img src={cameo} alt="cameo_logo" />
                <div>
                    <p>Cameo</p>
                    <p>Make impossible fan connections possible</p>
                </div>
            </div>
            <div> 
                <img src={clubHouse} alt="clubHouse_logo" />
                <div>
                    <p>ClubHouse</p>
                    <p>Let your community in on the conversation</p>
                </div>
            </div>
            <div> 
                <img src={community} alt="community_logo" />
                <div>
                    <p>Community</p>
                    <p>Build an SMS subscriber list</p>
                </div>
            </div>
            <div> 
                <img src={contactDetails} alt="contactDetails_logo" />
                <div>
                    <p>Contact Details</p>
                    <p>Easily share downloadable contact details</p>
                </div>
            </div>
        </div> 

        <div className={style.footer}>

            <div className={style.footerDivOne}>
                <div className={style.footerDivOneLeft}>
                    <button onClick={()=> navigate('/login')}>Log in</button>
                    <button onClick={()=> navigate('/signup')}>Sign up free</button>
                </div>
                <div className={style.footerDivOneRight}>
                    <ul>    
                        <li>About Spark</li>
                        <li>Blog</li>
                        <li>Press</li>
                        <li>Social Good</li>
                        <li>Contact</li>
                    </ul>
                    <ul>
                        <li>Carrers</li>
                        <li>Getting Started</li>
                        <li>Features and How-Tos</li>
                        <li>FAQs</li>
                        <li>Report a Voilation</li>
                    </ul>
                    <ul>
                        <li>Terms and Conditions</li>
                        <li>Privacy Policy</li>
                        <li>Cookie Notice</li>
                        <li>Trust Center</li>
                    </ul>
                </div>
            </div>

            <div className={style.footerDivTwo}>
                <p>We acknowledge the Traditional Custodians of the land on which our office stands, the Wurundjeri people of the Kulin Nation, and pay our
                    respects to Elders past, present and emerging.</p>
                <div>
                    <img src={twitter} alt="twitter_logo" />
                    <img src={instagram} alt="instagram_logo" />   
                    <img src={youtube} alt="youtube_logo" />
                    <img src={tiktok} alt="tiktok_logo" />
                    <img src={linktree} alt="linktree_logo" />
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default LandingPage
