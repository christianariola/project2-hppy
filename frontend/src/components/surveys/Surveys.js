import Survey1 from './Survey1';
import SurveyList from './SurveyList'
import React, { useState, useEffect } from 'react';




const Surveys = () => {
    const [openSurvey, setOpenSurvey] = useState(false);
    
    const [surveyName, setSurveyName] = useState('')
    
    const returnToSurveys = () => {
        setOpenSurvey(!openSurvey);
        setSurveyName('');
    }

        // const showComponent = () =>       



  // const [openSurvey, setOpenSurvey] = useState(false);

  // add here fetching from database

    return (
        <div className='surveys-container'>
            <h2 onClick={() => returnToSurveys() }> My survey { surveyName }</h2>
                {/* {showComponent()} */}
            
            {!openSurvey ?
                < SurveyList setOpenSurvey={setOpenSurvey} openSurvey={openSurvey} setSurveyName={setSurveyName } /> 
            : <Survey1 />
            }   



               


            

        {/* <div className="all-surveys">
          <table>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Expired Date</th>
            </tr> */}
                {/* {
                  allSurveys.map((survey) => {
                  return <SurveyItem key={survey.id} {...survey} />
                  })
            } */}
            {/* (
        <tr className="single-survey" onClick={() => setOpenSurvey(!openSurvey)}>
            <td>
                { survey.survey_name }
            </td>
            <td>{survey.survey_status}</td>
            <td>{survey.survey_exp_date}</td>
            { openSurvey && <div>{ survey.survey_name } description</div>}
        </tr>
    ); */}



      {/* </table>
    </div> */}
                   
        </div>

    );
}

export default Surveys


