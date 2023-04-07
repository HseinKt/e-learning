import { useNavigate } from "react-router-dom";
import image1 from "../images/elearning.svg"
import image2 from "../images/elearning2.jpg"

const Landing_body = () => {
    const navigate = useNavigate();
    return (
        <div className="landing_body">
          <div className="landing_row">
            <div>
              <h2>E-learning is a type of learning conducted digitally via electronic media,
                 typically involving the internet.</h2>
              <h5>Online courses</h5>
              <h4>Learning Management Systems (LMSs)</h4>
              <p>
                They often come with interactive materials to allow the learner to test
                and apply their own knowledge.
              </p>
              <div className="lanbuttons">
                <button onClick={() => navigate("../enroll")}>
                  Enroll Courses
                </button>
                <button onClick={() => navigate("../withdraw")}>
                  Withdraw Courses
                </button>
              </div>
            </div>
            <div>
              <img
                style={{ marginLeft: "2rem" }}
                src={image1}
                height="400px"
              />
            </div>
          </div>

          <div className="landing_row">
            <div>
              <img
              className="m-right"
                src={image2}
                height="400px"
              />
            </div>
            <div style={{marginLeft:"1rem"}}>
              <h2>
              What is e-learning in education?
              </h2>
              <p>
                There are many ways in which teachers have been implementing e-learning
                to continue the teaching of their curriculum. One major way is the use
                of virtual ‘classrooms’ or lessons, using video communication platforms
                like Zoom. The teacher is able to plan and teach lessons as normal,
                with all students attending the lessons from their own home
              </p>
            </div>
          </div>
        </div>
    );
};
    
export default Landing_body;
    