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
const baseUrl = `http://192.168.0.105:${port}`;
// const baseUrl = `https://link-tree-web-app-2-backend.onrender.com`;

function Analytics() {
  const location = useLocation();
  const Name = location.state?.name;
  const [socialClicksCount, setSocialClicksCount] = useState(0);
  const [shopClicksCount, setshopClicksCount] = useState(0);
  const [ctaCount, setCtaCount] = useState(0); 
  const [areaChartData, setAreaChartData] = useState([]);
  const [deviceClicksData, setDeviceClicksData] = useState([]);
  const ref = useRef(null);
  const colors = ['#28A263', '#28A263', '#28A263', '#28A263', '#28A263A', '#28A263'];
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
   
    setSocialClicksCount(totalSocialClicks);
    setshopClicksCount(totalShopClicks);
    setCtaCount(data.ctaCount);

    // Group clicks by month
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

    // Filter clicks by device
    const startDate = dateRange[0].startDate;
    const endDate = dateRange[0].endDate;

    const deviceData = getDeviceClicksInRange(data.clickLogs, startDate, endDate);
    setDeviceClicksData(deviceData);

    //filter logs by date range
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
})
const updatedPieData = [
  { name: 'YouTube', value: clickCounts.youtube },
  { name: 'Facebook', value: clickCounts.facebook },
  { name: 'Instagram', value: clickCounts.instagram },
  { name: 'Other', value: clickCounts.other }
];
setPieChartData(updatedPieData);
console.log(updatedPieData)
};
  useEffect(() => {
      fetchUser();
  }, []);

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
              <div>
              <p style={{marginBottom:'4px', letterSpacing:'1px'}}><span style={{fontWeight: '700'}}>Hi,</span>&nbsp;{Name}</p>
              <p style={{color:'#383838', fontSize:'14px'}}>Congratulations, you got a great response today.</p>
              </div>

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

      {/* =====================================main=================================== */}
      <div className={style.overviewContainer}>
        <p className={style.overviewHeader}>Overview</p>
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
              <ResponsiveContainer >
                  <AreaChart data={areaChartData} style={{overflow: 'hidden'}}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#28A263" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#28A263" stopOpacity={0}/>
                      </linearGradient>
                    </defs>

                    <XAxis dataKey="month" axisLine={false} tickLine={false} padding={{ left: 20, right: 0 }}/>
                    <YAxis 
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
                      axisLine={false} 
                      tickLine={false}
                      ticks={[0, 1000, 2000, 3000]}  
                      tickFormatter={(val) => val === 0 ? '0' : `${val / 1000}k`} />
                {/* <Tooltip /> */}
                <Bar dataKey="clicks" radius={[8, 8, 8, 8]} barSize={40}>
                   {deviceClicksData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                </Bar>
            </BarChart> 
            </ResponsiveContainer>
          </div>

          <div className={style.pieChartDiv}>
            <p>Traffic by link</p>
              <ResponsiveContainer width="100%" height="100%">
              <PieChart width={300} height={300}>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#FF0000', '#3b5998', '#C13584', '#8884d8'][index % 4]} />
                    ))}
                  </Pie>
              </PieChart>
              </ResponsiveContainer>
          </div>
        </div>

      </div>    
    </div>
  )
}

export default Analytics
