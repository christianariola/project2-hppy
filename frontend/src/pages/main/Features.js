import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input"; 
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
// import {linkdeinLogo} from '../../
import {Link} from 'react-router-dom'
const Features = () => {
  return (
    <>
      <div className="wrapper">
        <h2>
          <span className="powerWord">With Hppy</span>, employers can now create
          working environment with employees feedback and build a culture where
          people <span className="powerWord">flourish</span>.
        </h2>
        <section className="feature">
          <div>
            <div className="hero-image">
              <img src="/images/get-insights.png" alt="Hppy" />
            </div>
          </div>
          <div className="feature-1">
            <h3>Get Insights From Employees</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi,
              illo eligendi! Fuga praesentium corporis facere quisquam officiis,
              blanditiis ducimus cum nam excepturi, repellendus totam suscipit
              veritatis! Sunt vero odio quidem.
            </p>
          </div>
        </section>

        <section className="feature">
          <div>
            <div className="hero-image">
              <img src="/images/generate-reports.png" alt="Hppy" />
            </div>
          </div>
          <div className="feature-2">
            <h3>Generate Reports</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi,
              illo eligendi! Fuga praesentium corporis facere quisquam officiis,
              blanditiis ducimus cum nam excepturi, repellendus totam suscipit
              veritatis! Sunt vero odio quidem.
            </p>
          </div>
        </section>

        <section className="feature">
          <div>
            <div className="hero-image">
              <img src="/images/anonymous.png" alt="Hppy" />
            </div>
          </div>
          <div className="feature-3">
            <h3>Anonymous survey responses</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi,
              illo eligendi! Fuga praesentium corporis facere quisquam officiis,
              blanditiis ducimus cum nam excepturi, repellendus totam suscipit
              veritatis! Sunt vero odio quidem.
            </p>
          </div>
        </section>

        <section className="feature">
          <div>
            <div className="hero-image">
              <img src="/images/sentiment-analysis.png" alt="Hppy" />
            </div>
          </div>
          <div className="feature-4">
            <h3>Text sentiment analysis base on AI</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi,
              illo eligendi! Fuga praesentium corporis facere quisquam officiis,
              blanditiis ducimus cum nam excepturi, repellendus totam suscipit
              veritatis! Sunt vero odio quidem.
            </p>
          </div>
        </section>
        <div className="hero">
          <div className="hero-text">
            <h2>Improved employee engagement begins here.</h2>
            <a href="#!">Contact Us</a>
          </div>
          <div className="hero-image">
            <img src="/images/middle.png" alt="Hppy" />
          </div>
        </div>
        <div className="feature-5">
          <h3>
            <span className="powerWord">Hppy</span> at a glance
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, illo
            eligendi! Fuga praesentium corporis facere quisquam officiis,
            blanditiis ducimus cum nam excepturi, repellendus totam suscipit
            veritatis! Sunt vero odio quidem.
          </p>
          <div className="picture-section">
            <div className="picture-wrap">
              <div className="picture1"></div>
              <h3>KaranPal Singh</h3>
              <p>Project Manager/</p> <p>Full-Stack Developer</p>
              <Link to="">lnk</Link>
            </div>
            <div className="picture-wrap">
              <div className="picture2"></div>
              <h3>Christian Pierre Ariola</h3>
              <p>Full-Stack Developer</p>
              <Link to="">lnk</Link>
            </div>
            <div className="picture-wrap">
              <div className="picture3"></div>
              <h3>Hyewon Kang</h3>
              <p>Full-Stack Developer</p>

              <Link to="">lnk</Link>
            </div>
            <div className="picture-wrap">
              <div className="picture4"></div>
              <h3>Taras Ivanov</h3>
              <p>Full-Stack Developer</p>
              <Link to="">lnk</Link>
              </div>
            <div className="picture-wrap">
              <div className="picture5"></div>
              <h3>Shijie You</h3>
              <p>UI/UX Designer</p>
              <Link to="">lnk</Link>
            </div>
            <div className="picture-wrap">
              <div className="picture6"></div>
              <h3>Tia O'Gilvie</h3>
              <p>UI/UX Designer</p>
              <Link to="">lnk</Link>
            </div>
            <div className="picture-wrap">
              <div className="picture7"></div>
              <h3>Connie Lu</h3>
              <p>UI/UX Designer</p>
              <Link to="">lnk</Link>
            </div>
          </div>
          <div className="feature-5-text">
            <h3>Agile.Professional</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, illo
              eligendi! Fuga praesentium corporis facere quisquam officiis,
              blanditiis ducimus cum nam excepturi, repellendus totam suscipit
              veritatis! Sunt vero odio quidem.
            </p>
          </div>
        </div>
        <div className="contact-us">
          {/* <div className="contact-text">
            <h2>Contact Us</h2>
            <p>We'd love to hear anything from you! </p>
          </div> */}
          
          <Card >
          <CardContent>
            <Box sx={{display:'flex'}}>
              <Box style={{width:"50%"}}>
                <Typography variant="h4" style={{textAlign:'left', fontWeight:'bold'}}>Contact Us</Typography>
                <Typography variant="h6" style={{textAlign:'left'}}>We'd love to hear anything from you!</Typography>
             </Box>
          <form style={{width:"50%"}}>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField label="First Name" variant="outlined" fullWidth required />
              </Grid>
              <Grid  xs={12} sm={6} item>
                <TextField label="Last Name" variant="outlined" fullWidth required/>
              </Grid>
              <Grid xs={12} item>
                <TextField label="Email" variant="outlined" fullWidth required/>
              </Grid>
              <Grid xs={12} item>
                <TextField label="Message" multiline row={4} variant="outlined" fullWidth required/>
              </Grid>
              <Grid xs={12} item>
                <Button type="submit" variant="contained" fullWidth>Submit</Button>
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
