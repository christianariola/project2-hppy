import React, { useState, useEffect } from 'react';
import surveys from './surveys-data';
import Survey_item from './Survey_item';

const Surveys = () => {

  const [allSurveys, setAllSurveys] = useState(surveys);

  // add here fetching from database

    return (
        <div className='surveys'>
            <h2>My survey</h2>

        <div className="all-surveys">
          <table>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Expired Date</th>
            </tr>
                {
                  allSurveys.map((survey) => {
                  return <Survey_item key={survey.id} {...survey} />
                  })
                } 
      </table>
    </div>

        </div>
    );
}

export default Surveys
