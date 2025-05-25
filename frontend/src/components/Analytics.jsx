import {useState, useEffect,  useRef} from 'react'
import { useLocation} from 'react-router-dom';
import style from './Analytics.module.css'
import { fetchUserData } from '../FetchMaker';
import calender from '../images/calenderImg.png';
import calenderDropArrow from '../images/calenderDropArrow.png';

import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { enUS } from 'date-fns/locale';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import {
  PieChart, Pie, BarChart, Bar,Cell, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

const port = 3000;
// const baseUrl = `http://192.168.0.105:${port}`;
const baseUrl = `https://link-tree-web-app-2-backend.onrender.com`;

function Analytics() {
  const location = useLocation();
  const Name = location.state?.name;
  const [socialClicksCount, setSocialClicksCount] = useState(0);
  const [shopClicksCount, setshopClicksCount] = useState(0);
  const [ctaCount, setCtaCount] = useState(0); 
  const [areaChartData, setAreaChartData] = useState([]);
  const [deviceClicksData, setDeviceClicksData] = useState([]);
  const [linksBarData, setLinksBarData] = useState([]);
  const ref = useRef(null);
  const themeColors = ['#92FFC6', '#9BEBC1', '#165534', '#3EE58F', '#A1D4BA', '#21AF66'];

  const clickCounts = { youtube: 0, facebook: 0, instagram: 0, other: 0 };
  const [pieChartData, setPieChartData] = useState([]);

  const pieData = [
  { name: 'YouTube', value: clickCounts.youtube },
  { name: 'Facebook', value: clickCounts.facebook },
  { name: 'Instagram', value: clickCounts.instagram },
  { name: 'Other', value: clickCounts.other }
];

  const [open, setOpen] = useState(false);

  const today = new Date();
  const prevMonth = new Date();
  prevMonth.setMonth(today.getMonth() - 1);

  const [dateRange, setDateRange] = useState([
    {
      startDate: prevMonth,
      endDate: today,
      key: 'selection'
    }
  ]);

  const fetchUser = async () => {
    const response = await fetchUserData();
    const data = await response.json();
    const totalShopClicks = data.shop.reduce((sum, link) => sum + (link.clickCount || 0), 0);
    const totalSocialClicks = data.social.reduce((sum, link) => sum + (link.clickCount || 0), 0);
    console.log(data);
   
    setSocialClicksCount(totalSocialClicks);
    setshopClicksCount(totalShopClicks);
    setCtaCount(data.ctaCount);

    // Group clicks by month====================================================================
    const monthlyClicks = {};
    data.clickLogs.forEach(log => {
      const date = new Date(log.date);
      const month = date.toLocaleString('default', { month: 'short' }); 
      monthlyClicks[month] = (monthlyClicks[month] || 0) + 1;
    });

    const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const chartData = allMonths.map(month => ({
      month,
      total: monthlyClicks[month] || 0,
    }));
    setAreaChartData(chartData);
    // ========================================================================================

    // Filter clicks by device==============================================================
    const startDate = dateRange[0].startDate;
    const endDate = dateRange[0].endDate;

    const deviceData = getDeviceClicksInRange(data.clickLogs, startDate, endDate);
    setDeviceClicksData(deviceData);
    // console.log(startDate, endDate, data.clickLogs)
    // ========================================================================================

    //filter logs by date range=============================================================
    const filteredLogs = data.clickLogs.filter(log => {
                        const logDate = new Date(log.date);
                        return logDate >= dateRange[0].startDate && logDate <= dateRange[0].endDate;
                        });
    filteredLogs.forEach(log => {
                          const url = log.linkUrl?.toLowerCase() || '';
                          if (url.includes('youtube')) clickCounts.youtube++;
                          else if (url.includes('facebook')) clickCounts.facebook++;
                          else if (url.includes('instagram')) clickCounts.instagram++;
                          else clickCounts.other++;
                        });
    const updatedPieData = [
                        { name: 'YouTube', value: clickCounts.youtube },
                        { name: 'Facebook', value: clickCounts.facebook },
                        { name: 'Instagram', value: clickCounts.instagram },
                        { name: 'Other', value: clickCounts.other }
                      ];
setPieChartData(updatedPieData);
// ========================================================================================
  const allLinks = [...data.social, ...data.shop];
  const sortedLinks = allLinks
    .map(link => ({
      linkTitle: link.linkTitle,
      clickCount: link.clickCount || 0
    }))
    .sort((a, b) => b.clickCount - a.clickCount) .slice(0, 6);

  setLinksBarData(sortedLinks);
  };

  useEffect(() => {
      fetchUser();
  }, [dateRange]);

const getDeviceClicksInRange = (clickLogs, startDate, endDate) => {
  const baseDevices = ['Linux', 'Mac', 'Ios', 'Windows', 'Android', 'Other'];
  const counts = Object.fromEntries(baseDevices.map(d => [d, 0]));

  clickLogs.forEach(log => {
    const logDate = new Date(log.date);
    if (logDate >= startDate && logDate <= endDate) {
      const device = baseDevices.includes(log.device) ? log.device : 'Other';
      counts[device]++;
    }
  });
  return baseDevices.map(device => ({ device, clicks: counts[device] }));
};

// ========================================================================================
  return (
    <div className={style.container}>
          {/* ==================================header================================= */}   
              <div className={style.header}>
              <p style={{marginBottom:'4px', letterSpacing:'1px'}}><span style={{fontWeight: '700'}}>Hi,</span>&nbsp;{Name}</p>
              <p style={{color:'#383838', fontSize:'14px'}}>Congratulations, you got a great response today.</p>
              </div>
      {/* =====================================main=================================== */}
      <div className={style.overviewContainer}>
 
        <div className={style.overviewDatePickerContainer}>
          <p className={style.overviewHeader}>Overview</p>

          <div className={style.datePicker} ref={ref}>
                  <button className={style.dropdownBtn} onClick={() => setOpen(!open)}>
                    <img  className={style.icon} src={calender} alt="calenderImg" />
                     {format(dateRange[0].startDate, "MMM do")} to{" "}
                     {format(dateRange[0].endDate, "MMM do")}
                    <img className={style.arrow} src={calenderDropArrow} alt="calenderDropArrowImg" />
                  </button>
          </div>
            {open && (
                  <div className={style.dateRangeContainer}>
                    <DateRange
                      className={style.dateRange}
                      editableDateInputs
                      onChange={item => setDateRange([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                      locale={enUS}
                      rangeColors={["#3b82f6"]}
                    />
                  </div>
                )}
           
        </div>
        
        <div className={style.clicksDivContainer}>
          <div className={style.clicksDiv} style={{backgroundColor:'#22D679', color:'#FFFFFF'}}>
            <p className={style.clicksDivHeader} style={{color: "#FFFFFF"}}>Clicks on Link</p>
            <p className={style.clicks} style={{color: '#F4F4F4'}}>{socialClicksCount}</p>
          </div>
          <div className={style.clicksDiv}>
            <p className={style.clicksDivHeader}>Clicks on Shop</p>
            <p className={style.clicks}>{shopClicksCount}</p>
          </div>
          <div  className={style.clicksDiv} >
            <p className={style.clicksDivHeader}>CTA</p>
           <p className={style.clicks}>{ctaCount}</p>
          </div>
        </div>

        <div className={style.clicksAreaChartContainer} >
              <ResponsiveContainer>
                  <AreaChart data={areaChartData} style={{overflow: 'hidden'}}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#28A263" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#28A263" stopOpacity={0}/>
                      </linearGradient>
                    </defs>

                    <XAxis dataKey="month" axisLine={false} tickLine={false} padding={{ left: 20 }}/>
                    <YAxis 
                      width={40}
                      axisLine={false} 
                      tickLine={false} 
                      ticks={[0, 1000, 2000, 3000]} 
                      tickFormatter={(val) => val === 0 ? '0' : `${val / 1000}k`}
                      padding={{ bottom: 20 }}
                    />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="#000"
                      fillOpacity={1}
                      fill="url(#colorTotal)"
                      strokeWidth={1.5}
                      dot={false}
                      activeDot={false}
                    />
                  </AreaChart>
              </ResponsiveContainer>
        </div>

        <div className={style.barPieChartContainer}>
          <div className={style.barChartDiv}>
            <p>Traffic by device</p>
            <ResponsiveContainer width="100%" height="90%">
            <BarChart data={deviceClicksData} style={{overflow: 'hidden'}}>
                <XAxis dataKey="device" axisLine={false} tickLine={false}/>
                <YAxis 
                      width={40}
                      axisLine={false} 
                      tickLine={false}
                      ticks={[0, 1000, 2000, 3000]}  
                      tickFormatter={(val) => val === 0 ? '0' : `${val / 1000}k`} />
                <Tooltip />
                <Bar dataKey="clicks" radius={[8, 8, 8, 8]} barSize={40}>
                   {deviceClicksData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={themeColors[index % themeColors.length]} />
                            ))}
                </Bar>
            </BarChart> 
            </ResponsiveContainer>
          </div>
           <div className={style.pieChartDiv}>
            <p>Sites</p>
            <div className={style.content}>
              <div className={style.chartWrapper}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart style={{overflow: 'hidden'}}>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                // innerRadius={40}
                // outerRadius={80}
                innerRadius={30}
                outerRadius={60}
                dataKey="value"
                cornerRadius={7} 
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={themeColors[index % themeColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
         <div className={style.legend}>
          {pieChartData.map((entry, index) => (
            <div key={index} className={style.legendItem}>
              <span
                className={style.colorDot}
                style={{ backgroundColor: themeColors[index % themeColors.length] }}
              ></span>
              <span className={style.labelText}>{entry.name}</span>
              <span className={style.value}>{entry.value}</span>
            </div>
          ))}
        </div>

            </div>
          </div>

        </div>

      <div className={style.linksBarChartContainer}>
        <p>Traffic by links</p>
        <ResponsiveContainer width="100%" height="80%">
        <BarChart
          layout="horizontal"
          data={linksBarData}
          style={{overflow: 'hidden'}}
        >
          <XAxis dataKey="linkTitle" type="category" axisLine={false} tickLine={false}/>
           <YAxis     width={40} 
                      type="number"
                      padding={{ bottom: 30 }}
                      axisLine={false} 
                      tickLine={false}
                      ticks={[0, 1000, 2000, 3000]}  
                      tickFormatter={(val) => val === 0 ? '0' : `${val / 1000}k`} />
          <Tooltip />
          <Bar dataKey="clickCount" barSize={25} radius={[6, 6, 6, 6]}>
            {linksBarData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={themeColors[index % themeColors.length]}  />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
      </div>
    </div>
  )
}


export default Analytics
