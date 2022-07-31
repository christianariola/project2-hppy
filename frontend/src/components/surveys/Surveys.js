import { useSelector } from "react-redux";
import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios' 
import Survey1 from './Survey1';
// import SurveyList from './SurveyList'



const Surveys = () => {
  const { employee } = useSelector((state) => state.auth);
  const [openSurvey, setOpenSurvey] = useState(false);
  const [monthlySurvey, setMonthSurvey] = useState([]);
  const [choosenSurvey, setChoosenSurvey] = useState('');
  const [filteredList, setFilteredList] = useState([]);
    
    // fetching data from database
    useEffect(function loadData(){
      axios.get('http://localhost:3001/monthlysurveys')
        .then((res)=>{
            setMonthSurvey(res.data)  
         })   
         .catch(error=>console.log(error))
    }, [openSurvey] ) 
  
  // console.log(employee.email)
  
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ openSurvey,
    monthlySurvey,
    employee.email,
  ])

  const handleChooseSurvey = (item) => {
    setChoosenSurvey(item);
    setOpenSurvey(!openSurvey)
    console.log(openSurvey)
    // console.log(item)
  }




  // console.log(monthlySurvey);

    return (
        <div className='surveys-container'>

        {choosenSurvey === ''
          ?
            <h2>My Survey</h2>
          :
            <h2 onClick={() => {
            setOpenSurvey(!openSurvey);
            console.log(openSurvey)
              setChoosenSurvey('');
            }} > My Survey  &gt;  {choosenSurvey.surveyName}
            </h2>
            } 
        {
          openSurvey ? <Survey1 choosenSurvey={choosenSurvey} setOpenSurvey={setOpenSurvey} openSurvey={ openSurvey } ListOfSurveys={ListOfSurveys} setChoosenSurvey={setChoosenSurvey} /> : 
              <div className="all-surveys">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
              <tbody>
                
                  {
                    filteredList.map((item, index) => {
                      console.log(item)
                  if (item.surveyStatus === "incompleted") {
                        return (
                          <tr key={index}
                              onClick={ () => {
                                handleChooseSurvey(item)

                              }
                              }>
                            <td>{item.surveyName}{ item.surveyOpened ? <sup className="newSurvey"> new</sup> : ''}</td>
                        <td>{item.surveyStatus}</td>
                        <td>{item.createdDate }</td>
                  </tr>
                )
                  } else {
                        return (
                    <tr key={index}
                      
                      className="survey_inactive"
                    >
                        <td>{item.surveyName}</td>
                        <td>{item.surveyStatus}</td>
                        <td>{item.createdDate }</td>
                    </tr>
                        )
                    }})
                  }    
                  
                </tbody>
                    
                </table>
            </div>
       
        }
      </div>
          
           
    );
        






        

}

export default Surveys


