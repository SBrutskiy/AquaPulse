import LineChart from './components/LineChart';
import { UserData as ImportedData } from './Data'
import React, { useState, useEffect } from 'react';


const NumberForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [nitrite, setNitrite] = useState('')
  const [ammonia, setAmmonia] = useState('');
  const [date, setDate] = useState('');
  const [combinedData, setCombinedData] = useState([...ImportedData])

  const [userData, setUserData] = useState({
        labels: combinedData.map((data) => data.testedDate) ,
        datasets: [{
          borderColor: 'rgba(255, 251, 252)',
          backgroundColor: ['yellow'],
          label:"Ammonia level",
          data: combinedData.map((data) => data.ammoniaLevel),
          borderWidth: 1.5,
          pointRadius: 4, 

         },
        {
          label: "Nitrite level",
            data: combinedData.map((data)=>data.nitriteLevel),
            backgroundColor: ['purple'],
            borderColor: 'rgba(255, 251, 252)', 
            borderWidth: 1.5 ,
            pointRadius: 4, 

        }]
       });

       useEffect(() => {
        setUserData({
          labels: combinedData.map((data) => data.testedDate),
          datasets: [
            {
              label: "Ammonia level",
              data: combinedData.map((data) => data.ammoniaLevel),
            },
            {
            label: "Nitrite level",
            data: combinedData.map((data)=>data.nitriteLevel)
            }],
        });
      }, [combinedData]);
      
      const handleButtonClick = () => {
        setIsVisible(true);
      };

  const handleSubmit = (e) => {
    e.preventDefault();

if(ammonia || nitrite && date){
    setCombinedData([...combinedData, {
      testedDate: date,
      ammoniaLevel: ammonia||undefined,
      nitriteLevel: nitrite||undefined

    }])
    function clearButtons (){
      setAmmonia('')
      setDate('')
      setNitrite('')
    }
    clearButtons()
    setIsVisible(false)

  }else alert("Date and Ammonia or Nitrite Levels must be inputted");

  }; 
  return (
    <div>
      <LineChart chartData={userData}/>
      {!isVisible && ( 
      <button onClick={handleButtonClick}>Add Data</button>)
      }
      {isVisible && (<div>
      <button onClick={()=>{setIsVisible(false)
}}>Back</button>
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
Nitrite in PPM 
        <input
            type="number"
            value={nitrite}
            onChange={(e) => setNitrite(e.target.value)}
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
         )}
    </div>
  );
};

export default NumberForm;
