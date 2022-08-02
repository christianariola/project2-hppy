import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import {linkdeinLogo} from '../../
import { Link } from "react-router-dom";
const Features = () => {
  let hyewonUrl = "https://www.linkedin.com/in/hyewon-kang";
  let karanUrl = "https://www.linkedin.com/in/karan-p-singh";
  let chrisUrl = "https://www.linkedin.com/in/christian-pierre-ariola";
  let tarasUrl = "https://www.linkedin.com/in/taras-ivanov";
  let jieUrl = "https://www.linkedin.com/in/shijie-you";
  let connieUrl = "https://www.linkedin.com/in/tzuying-connie-lu";
  let tiaUrl = "https://www.linkedin.com/in/tiagayogilvie";

  return (
    <>
      <div className="wrapper">
        <h2>
          <span className="powerWord">With Hppy</span>, employers can now create
          working environment with employees feedback and build a culture where
          people <span className="powerWord">flourish</span>.
        </h2>
        <section className="feature" id="features">
          <div className="feature-1">
            <h3>Get Insights From Employees</h3>
            <p>
              Collect feedback from employees in the organization, find insights
              with connected analytics, and plan for effective action to build a
              people-first culture and happy working environment.
            </p>
          </div>
          <div className="hero-image hero-image-1">
            <img src="/images/get-insights.png" alt="Hppy" />
          </div>
        </section>

        <section className="feature section-3">
          <div className="hero-image hero-image-2">
            <img src="/images/generate-reports.png" alt="Hppy" />
          </div>
          <div className="vector-2">
            <img src="/images/vector.png" alt="Hppy" />
          </div>
          <div className="feature-2">
            <h3>Generate Reports</h3>
            <p>
              An application integrates employee performance metrics with
              employee engagement data. By contextualizing performance with
              engagement results, feedback, and driver analysis,
            </p>
          </div>
        </section>

        <section className="feature section-3">
          <div className="feature-3">
            <h3>Anonymous survey responses</h3>
            <p>
              Companies can receive honest responses and feedback. Employees are
              more comfortable telling the truth without any social desirability
              bias.
            </p>
          </div>
          <div className="vector-2">
            <img src="/images/vector.png" alt="Hppy" />
          </div>
          <div className="hero-image hero-image-3">
            <img src="/images/anonymous.png" alt="Hppy" />
          </div>
        </section>

        <section className="feature">
          <div>
            <div className="hero-image hero-image-4">
              <img src="/images/sentiment-analysis.png" alt="Hppy" />
            </div>
          </div>
          <div className="feature-4">
            <h3>Text sentiment analysis base on AI</h3>
            <p>
              Access massive language models that can understand text/feedback
              from surveys and take appropriate action. Growth accurant data in
              dashboards that provide an understanding of your employee and
              culture.
            </p>
          </div>
        </section>
        <div className="hero hero-wrapper">
          <div className="hero-text">
            <h2>Improved employee engagement begins here.</h2>
            <a href="#!">Contact Us</a>
          </div>
          <div className="hero-image hero-image-5">
            <img src="/images/middle.png" alt="Hppy" />
          </div>
        </div>
        <div className="feature-5">
          <div className="feature-5-toptext">
            <h3>
              <span className="powerWord">Hppy</span> at a glance
            </h3>
            <p>
              Members of Hppy are professionals that can adapt the agile method
              and deliver excellent results while working under pressure.
            </p>
          </div>
          <div className="picture-section">
            <div className="picture-wrap">
              <div className="picture1"></div>
              <h3>KaranPal Singh</h3>
              <p>Project Manager/</p> <p>Full-Stack Developer</p>
              <a href={karanUrl}>
                <p className="linkdein"></p>
              </a>
            </div>
            <div className="picture-wrap">
              <div className="picture2"></div>
              <h3>Christian Pierre Ariola</h3>
              <p>Full-Stack Developer</p>
              <a href={chrisUrl}>
                <p className="linkdein"></p>
              </a>
            </div>
            <div className="picture-wrap">
              <div className="picture3"></div>
              <h3>Hyewon Kang</h3>
              <p>Full-Stack Developer</p>
              <a href={hyewonUrl}>
                <p className="linkdein"></p>
              </a>
            </div>
            <div className="picture-wrap">
              <div className="picture4"></div>
              <h3>Taras Ivanov</h3>
              <p>Full-Stack Developer</p>
              <a href={tarasUrl}>
                <p className="linkdein"></p>
              </a>
            </div>
            <div className="picture-wrap">
              <div className="picture5"></div>
              <h3>Shijie You</h3>
              <p>UI/UX Designer</p>
              <a href={jieUrl}>
                <p className="linkdein"></p>
              </a>
            </div>
            <div className="picture-wrap">
              <div className="picture6"></div>
              <h3>Tia O'Gilvie</h3>
              <p>UI/UX Designer</p>
              <a href={tiaUrl}>
                <p className="linkdein"></p>
              </a>
            </div>
            <div className="picture-wrap">
              <div className="picture7"></div>
              <h3>Connie Lu</h3>
              <p>UI/UX Designer</p>
              <a href={connieUrl}>
                <p className="linkdein"></p>
              </a>
            </div>
          </div>
          <div className="feature-5-text">
            <h3>Agile.Professional</h3>
            <p>
              The world is adapting to the New Normal. So is the workplace.
              Distributed teams, hybrid workplaces, agile organizations. Can
              Hppy keep up? We believe so.
            </p>
          </div>
        </div>
        <div className="contact-us">
          {/* <div className="contact-text">
            <h2>Contact Us</h2>
            <p>We'd love to hear anything from you! </p>
          </div> */}

          <Card>
            <CardContent>
              <Box sx={{ display: "flex" }}>
                <Box style={{ width: "50%" }}>
                  <Typography
                    variant="h4"
                    style={{ textAlign: "left", fontWeight: "bold" }}
                  >
                    Contact Us
                  </Typography>
                  <Typography variant="h6" style={{ textAlign: "left" }}>
                    We'd love to hear anything from you!
                  </Typography>
                </Box>
                <form style={{ width: "50%" }}>
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <TextField
                        label="Message"
                        multiline
                        row={4}
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <Button type="submit" variant="contained" fullWidth>
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Features;
