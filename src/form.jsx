import React, { useState, useRef } from 'react';
import './form.css'

function Form(props) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        phoneType: '',
        staff: '',
        bio: '',
        signUp: '',
        date: new Date()
    })

    const [errors, setErrors] = useState([]);

    const validate = () => {
        let errors = [];

        if (user.name.length === 0) {
            errors.push("Name can't be blank")
        }

        if (user.email.length === 0) {
            errors.push("Email can't be blank")
        }

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!user.email.match(emailRegex)) {
            errors.push("Email format is invalid")
        }

        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (user.phoneNumber.length > 0) {

            if (!user.phoneNumber.match(phoneRegex)) {
                errors.push("Invalid phone Number")
            }

        }

        if (user.bio.length > 279) {
            errors.push("Bio must be less than 280 characters")
        }

        return errors;
    }

    const handleChange = (field) => {
        return (e) => {
            console.log(e)
            const newObj = Object.assign({}, user, { [field]: e.target.value })
            setUser(newObj)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = validate();

        console.log(user);

        if (errors.length) {
            setErrors(errors);
        };
    }

    const showErrors = () => {
        if (!errors.length) return null;

        return (
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
        )
    }

    return (
        <div>
            {showErrors()}

            <form className='form' onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <input
                    type="text"
                    placeholder='Name'
                    value={user.name}
                    onChange={handleChange('name')}
                />

                <input
                    type="text"
                    placeholder='Email'
                    value={user.email}
                    onChange={handleChange('email')}
                />

                <input
                    type="text"
                    placeholder='Phone Number'
                    value={user.phoneNumber}
                    onChange={handleChange('phoneNumber')}
                    />


                    {if (user.phoneNumber.length > 0) {
                    <label>Phone Type:
                        <select value={user.phoneType} onChange={handleChange('phoneType')}>
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                            <option value="mobile">Mobile</option>
                        </select>
                    </label>
                }}


                <label >
                    <input
                        name="staffType"
                        type="radio"
                        value={user.staff}
                        onChange={handleChange('staff')}
                    /> Instructor
                </label>

                <label >
                    <input
                        name="staffType"
                        type="radio"
                        value={user.staff}
                        onChange={handleChange('staff')}
                    /> Student
                </label>

                <label>Bio
                    <textarea value={user.bio} onChange={handleChange('bio')} />
                </label>
                <label>
                    <input
                        type="checkbox"
                        placeholder='Sign Up'
                        value={user.signUp}
                        onChange={handleChange('signUp')}
                    /> Sign Up For Email Notifications
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Form;