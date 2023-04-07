import { useEffect, useState } from "react";
import axios from "axios";
import CheckBox from "./check_box";
import { useNavigate } from "react-router-dom";

const Enroll = () => {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [checked, setChecked] = useState([]);
    const [token, setToken] = useState("");

    useEffect(()=> {
        const myToken = localStorage.getItem("token");
        if (!myToken) {
            navigate("../login");
        }
        else {
            setToken(myToken);
            console.log("token::::"+token);
        }

        try {
            axios.get("http://127.0.0.1:8000/class/courses",
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ myToken
                }
            })
            .then(response => {
                console.log("after response");
                setCourses(response.data.courses);
                console.log("consol : "+JSON.stringify(response.data.courses));
                // console.log("consol : "+JSON.stringify(response.data.courses[0].name));
                setChecked(new Array(response.data.courses.length).fill(false));
            })
            .catch(err => {
                console.log("axios error enroll: "+err.message);
            });
        } catch (error) {
            console.log("error get "+error);
        }
    }, [token])

    const handleChange = (event, index) => {
        const newChecked = [...checked]
        newChecked[index] = event.target.checked;
        setChecked(newChecked);
    }
    
    return ( 
        <div className="Enroll_course">
            <h2>Enroll Courses</h2>
            <p>selected the courses you want to enroll in:</p>
            <div className="courses">
                <ul >
                    {Array.isArray( courses ) && courses.map((course,index) => {
                        return (
                            <li key={index}>
                            <CheckBox 
                                id= {course._id}
                                label={course.name}
                                value={ checked[index] } 
                                handleChange= {(event) => handleChange(event, index)}
                            />
                        </li>
                        )
                    })} 
                </ul>
                <button onClick={""}> ENROL</button>
            </div>
        </div>
     );
}
 
export default Enroll;