import React, { useState, useEffect } from 'react';

const Survey_item = ({survey_name, survey_status, survey_exp_date}) => {

    const [openSurvey, setOpenSurvey] = useState(false);

    return (
        <tr className="single-survey" onClick={() => setOpenSurvey(!openSurvey)}>
            <td>
                { survey_name }
            </td>
            <td>{survey_status}</td>
            <td>{survey_exp_date}</td>
            { openSurvey && <div>{ survey_name } description</div>}
        </tr>
    );
}

export default Survey_item;