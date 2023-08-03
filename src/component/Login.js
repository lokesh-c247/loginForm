/* eslint-disable no-useless-escape */
import "./login.css";
import { useState } from "react";
import Confetti from 'react-confetti';




const Login = () => {

    const [confetti, setConfetti] = useState(false);
    const [prevImg, setPrevImg] = useState(false);
    const [data, setData] = useState({
        name: "",
        empno: "",
        mail: "",
        position: "",
        date: "",
        checked: false,
        img: null
    })

    const [errors, setErrors] = useState({
        name: "",
        empno: "",
        mail: "",
        position: "",
        date: "",
        file: ""
    })


    const handleChange = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleCheckBox = (e) => {
        setData({
            ...data,
            [e.target.name]: true

        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        setConfetti(true);

        let newErrors = {};
        if (!data.mail) {
            newErrors.mail = "Mail is required"
        }
        else if (!isValidEmail(data.mail)) {
            newErrors.mail = "Invalid Email Address"
        }
        if (!data.name) {
            newErrors.name = "Name is Required"
        }
        if (!data.empno) {
            newErrors.empno = "Emplopyee No. is required"
        }

        if (!data.position) {
            newErrors.position = "Please select the designation"
        }
        if (!data.date) {
            newErrors.date = "Date is required"
        }
        if (!data.file) {
            newErrors.file = "Please select the resume"
        }

        setErrors(newErrors);
    }

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setData({
                    ...data,
                    [e.target.name]: reader.result
                })
            }
        }
        setPrevImg(true)
    }

    const isValidEmail = (mail) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(mail);
    }



    return (

        <div className="form-container">
            {
                confetti && <Confetti />
            }

            <div className="form">
                <h1 className="heading" >Employee Details</h1>
                <input type="text" name="name" onChange={handleChange} placeholder="Name" />
                {
                    errors.name && <div className="error">*{errors.name}</div>
                }
                <input type="number" name="empno" onChange={handleChange} placeholder="Employee ID " />
                {
                    errors.empno && <div className="error" >*{errors.empno}</div>
                }
                <input type="email" name="mail" onChange={handleChange} placeholder="xyz@gmail.com" />
                {
                    errors.mail && <div className="error">*{errors.mail}</div>
                }
                <select name="position" onChange={handleChange}>
                    <option value="">Select Designation</option>
                    <option value="frontend">Front-End</option>
                    <option value="backend">Back-End</option>
                    <option value="fullstack">Full-Stack</option>
                    <option value="QA">QA</option>
                </select>
                {
                    errors.position && <div className="error">*{errors.position}</div>
                }

                <input type="date" name="date" onChange={handleChange} />{
                    errors.date && <div className="error">*{errors.date}</div>
                }
                <label htmlFor="">Upload Resume</label>

                <input type="file" className="file" name="img" onChange={handleFile} />
                {
                    prevImg ? <img className="img" src={data.img} alt="" /> :
                        errors.file && <div className="error">*{errors.file}</div>
                }


                <div className="box">
                    <input onClick={handleCheckBox} name="checked" className="checked" type="checkbox" />
                    <p>Above details are correct and acknowlege by me.</p>
                </div>
                {
                    data.checked ? <button onClick={handleSubmit}>Submit</button>
                        :
                        <button onClick={handleSubmit} disabled >Submit</button>
                }


            </div>

            <div className="footer">
                <p>© No Copyright.Feel free to copy &#128516;</p>

            </div>

        </div>
    )
}


export default Login;
