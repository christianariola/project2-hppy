

const SurveyList = ({setOpenSurvey, openSurvey, setSurveyName}) => {

    const clickHandler = () => {
        setOpenSurvey(!openSurvey);
        setSurveyName("Survey1")
    }


    return (
         <div className="all-surveys">
          <table>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Expired Date</th>
            </tr>
                <tr onClick={() => {clickHandler()
                     }}>
              <th>Survey1</th>
              <th>Incompleated</th>
              <th>2020-06-17</th>
                </tr>
            </table>
        </div>
    );
};

export default SurveyList;