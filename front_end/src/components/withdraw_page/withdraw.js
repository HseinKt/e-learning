
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CheckBox from "../enroll_page/check_box";

const Withdraw = () => {
    
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
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
            axios.get("http://127.0.0.1:8000/class/getClasses",
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ myToken
                }
            })
            .then(response => {
                //console.log("after response");
                setCourses(response.data.courses);
                //console.log("consol : "+JSON.stringify(response.data.courses));
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
    
    const runHandler = async () => {
        try {
            const selectedCourses = [];
            for (let index = 0; index < checked.length; index++) {
                if (checked[index]) {
                    selectedCourses.push(courses[index]._id);
                }
            }
            console.log("selectedCourses: " + selectedCourses);
            
            const course_id = selectedCourses[0];
            const response = await axios.get("http://127.0.0.1:8000/class/"+course_id+"/withdrawal",
            {
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            console.log("1");
            if (response.status === 409) {
                console.log("409:", JSON.stringify(response.data));
            }
            else if (response.status === 201){
                console.log("Withdrawal successful:", JSON.stringify(response.data));
                navigate("/");
            }
            console.log("2");
        } catch (error) {
            console.log("Withdrawal error front end:", error.message);
        }
    }

    return ( 
        <div className="Enroll_course">
            <h2>Withdrawal Courses</h2>
            <p>selected the courses you want to Withdraw from:</p>
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
                <button onClick={runHandler}> Withdraw</button>
            </div>
        </div>
     );
}
 
export default Withdraw;

 
