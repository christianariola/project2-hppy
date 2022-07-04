
const Survey1 = () => {

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    return (
        <div className="survey" >
            <form action="/surveys/all" method="POST">
                Survey1 component
                <h2>Survey questions</h2>
                <div className="survey-question">
                    <label htmlFor="a1">Q1: Lorem ipsum dolor sit amet, consectetur ? 
                        <div className="answer">
                            <label>
                                <input type="radio" name="a1" value="Congue praesent ac odio" />Congue praesent ac odio
                            </label>
                            <label>
                                <input type="radio" name="a1" value="Congue praesent ac turo" />Congue praesent ac turo
                            </label>
                            <label>
                                <input type="radio" name="a1" value="Congue  ac odio grnds" />Congue  ac odio grnds
                            </label>
                        </div> 
                    </label>
                </div>
                <div className="survey-question">
                    <label htmlFor="a2">Q2: Consequat at maecenas vulputate mattis ?</label>
                    <div className="answer">
                    <textarea type="text" name="a2" id="a2"/>
                    </div>
                </div>
                <div className="survey-question">
                    <label htmlFor="a3">Q3: Feugiat sed sit integer id ullamcorper?</label>
                    <div className="answer">
                        <label>
                            <input type="radio" name="a3" id="a3" value="Bibendum vivamus ut lacinia auctor" />Bibendum vivamus ut lacinia auctor
                        </label>
                       <label>
                            <input type="radio" name="a3" id="a3" value="Congue bibendum vivamu ac turo" />Congue bibendum vivamu ac turo
                        </label>
                        <label>
                            <input type="radio" name="a3" id="a3" value="Ac odio bibendum" />Ac odio bibendum
                        </label>
                    </div>
                </div>
                <div className="survey-question">
                    <label htmlFor="a4">Q4: Feugiat sed sit integer id ullamcorper?</label>
                    <div className="answer">
                        <select>    
                            <option name="a4" value="Bibendum vivamus ut lacinia auctor">Bibendum vivamus ut lacinia auctor</option>
                            <option name="a4" value="Bibendum vivamus ut lacinia head">Bibendum vivamus ut lacinia head</option>
                            <option name="a4" value="Bibendum vivamus ut lacinia employer">Bibendum vivamus ut lacinia employer</option>
                            <option  name="a4" value="Bibendum vivamus ut lacinia footer">Bibendum vivamus ut lacinia footer</option>
                        </select>
                    </div>
                </div>
                <button >Submit</button>
            </form>

        </div>
    );

}

export default Survey1;