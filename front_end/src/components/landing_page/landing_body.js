import { redirect } from "react-router-dom";
import image1 from "../images/elearning.svg"
import image2 from "../images/elearning2.webp"

const Landing_body = () => {
    return (
        <div className="landing_body">
          <div className="landing_row">
            <div>
              <h2>Compile your code with ease using our Python compiler</h2>
              <h5>Instant IDE</h5>
              <h4>Code right from your browser</h4>
              <p>
                Codeit is the best tool for starting, sharing, and developing
                projects in Python programming language, right from your browser.
              </p>
              <div className="lanbuttons">
                <button onClick={() => redirect("coding_page")}>
                  Start Coding
                </button>
                <button onClick={() => redirect("search_page")}>
                  Search Members
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
                Compile your code faster than ever with our high-speed servers
              </h2>
              <p>
                Our Python compiler's high-speed servers ensure faster and efficient
                code compilation, giving you more time for important project tasks.
                Enjoy a reliable and stable platform for your code, avoiding costly
                delays and setbacks.
              </p>
            </div>
          </div>
        </div>
    );
};
    
export default Landing_body;
    