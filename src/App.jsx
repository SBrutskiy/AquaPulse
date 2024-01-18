import LineChart from './components/LineChart';
import { UserData as ImportedData } from './Data'
import React, { useState, useEffect } from 'react';


const NumberForm = () => {
  const [ammonia, setAmmonia] = useState('');
  const [date, setDate] = useState('');
  const [ammoniaLevels, setAmmoniaLevels] = useState([]);
  const [dates, setDates] = useState([]);
  const [combinedData, setCombinedData] = useState([...ImportedData])

  const [userData, setUserData] = useState({
        labels: combinedData.map((data) => data.testedDate) ,
        datasets: [{
          label:"Ammonia level",
          data: combinedData.map((data) => data.ammoniaLevel),
    
         }]
       });

       useEffect(() => {
        // Update userData whenever combinedData changes
        setUserData({
          labels: combinedData.map((data) => data.testedDate),
          datasets: [{
            label: "Ammonia level",
            data: combinedData.map((data) => data.ammoniaLevel),
          }],
        });
      }, [combinedData]);
      

  const handleSubmit = (e) => {
    e.preventDefault();

if(ammonia !== '' && date !== ''){
    setAmmoniaLevels([...ammoniaLevels, ammonia]);
    setDates([...dates, date]);
    setCombinedData([...combinedData, {
    testedDate: date,
      ammoniaLevel: ammonia
    }])
    function clearButtons (){
      setAmmonia('')
      setDate('')
    }
    clearButtons()


  }else alert("Date and Ammonia Levels must be inputted");

  }; 
  return (
    <div>
      <LineChart chartData={userData}/>
     
      <form onSubmit={handleSubmit}>
        <label>
Ammonia in PPM 
        <input
            type="number"
            value={ammonia}
            onChange={(e) => setAmmonia(e.target.value)}
          />
        </label>
        <br />
        <label>
Date Checked          
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Graph Data</button>
      </form>
    </div>
  );
};

export default NumberForm;
