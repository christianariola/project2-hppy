import { useSelector } from "react-redux";
import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios' 
import Survey1 from './Survey1';
// import SurveyList from './SurveyList'


const Surveys = () => {
  const { employee } = useSelector((state) => state.auth);
  const [monthlySurvey, setMonthSurvey] = useState([]);
  const [openSurvey, setOpenSurvey] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [choosenSurvey, setChoosenSurvey] = useState('');
    
    // fetching data from database
    useEffect(function loadData(){
      axios.get('http://localhost:3000/monthlysurveys')
        .then((res)=>{
            setMonthSurvey(res.data)  
         })   
         .catch(error=>console.log(error))
     },[]) 
 
  // function for filtering surveys by email 
  const ListOfSurveys = () => {
      let surveyList = [];
    for (let i = 0; i < monthlySurvey.length; i++){
      if (employee.email === monthlySurvey[i].employeeEmail)
      {
        surveyList.push(monthlySurvey[i])
        }
    }
    setFilteredList(surveyList)
  }

  useEffect(() => {
    ListOfSurveys()
  },[monthlySurvey ,employee.email] )

  // console.log(filteredList)

    // }

  const handleChooseSurvey = (item) => {
    setChoosenSurvey(item);
    // console.log(item)
  }


    

    // const returnToSurveys = () => {
    //     setOpenSurvey(!openSurvey);
    //     setSurveyName('');
    // }
     


    return (
        <div className='surveys-container'>
        <h2
          // onClick={console.log("pressed")}
          >
          {choosenSurvey === '' ? 'My Survey': `My Survey > ${choosenSurvey.surveyName}`} 
        </h2>
        {openSurvey ? <Survey1 choosenSurvey={ choosenSurvey } /> : 
              <div className="all-surveys">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Expired Date</th>
                        </tr>
                    </thead>
                <tbody>
                {filteredList.map((item, index) => {
                // console.log(item)
                return (
                  <tr key={index}
                    onClick={ () => {
                      handleChooseSurvey(item)
                      setOpenSurvey(!openSurvey)
                      
                  }}
                  >
                        <th>{item.surveyName}</th>
                        <th>{item.surveyStatus}</th>
                        <th>{item.createdDate }</th>
                  </tr>
                )
               
                  })}    
                  
                </tbody>
                    
                </table>
            </div>
       
        }
      </div>
          
           
    );
        






        

}

export default Surveys


