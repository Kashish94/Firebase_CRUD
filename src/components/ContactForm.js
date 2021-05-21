import React, { useState, useEffect } from "react";

const ContactForm  = (props) => {
const initialFieldValues = {
    productName: '',
    description: ''
}

var [values, setValues] = useState(initialFieldValues)

useEffect(()=>{
    if(props.currentId=='')
    setValues({
        ...initialFieldValues
    })
    else
    setValues({
        ...props.contactObjects[props.currentId]
    })
},[props.currentId,props.contactObjects])

const handleInputChange = e =>{
    var { name, value }= e.target
    setValues({
        ...values,
        [name]: value
    })
}

const handleFormSubmit = e =>{
    e.preventDefault();
    props.addOrEdit(values)
}

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-file"></i>
                </div>
            </div>
            <input className="form-control" placeholder="Product Name" name="productName" required
            value = {values.productName}
            onChange={handleInputChange}
            />
            </div>
            <div className="form-row">
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-pen-fancy"></i>
                </div>
            </div>
            <input className="form-control" placeholder="Description" name="description"
            value = {values.description}
            onChange={handleInputChange}
            />
            </div>
            <div className="form-group">
                <input type="submit" value={props.currentId==''?"Save":"Update"} className="btn btn-primary btn-block"/>
            </div>
            </div>
        </form>
     );
}

export default ContactForm;