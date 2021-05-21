import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm"
import firebaseDb from "../firebase";

const Contacts  = () => {

    var [contactObjects, setContactObjects] = useState({})
    var [currentId,setCurrentId] = useState('')

    useEffect(()=>{
        firebaseDb.child('contacts').on('value',snapshot=>{
            if(snapshot.val() != null)
            setContactObjects({
                ...snapshot.val()
            })
            else
            setContactObjects({})
        })
    },[])

    const addOrEdit = obj =>{
        if(currentId=='')
        firebaseDb.child('contacts').push(
            obj,
            err => {
                if(err)
                console.log(err)
                else
                setCurrentId('')
            }
        )
        else
        firebaseDb.child(`contacts/${currentId}`).set(
            obj,
            err => {
                if(err)
                console.log(err)
                else
                setCurrentId('')
            }
        )
    }

    const onDelete = key=>{
        if(window.confirm('Are you sure to delete this record?')){
            firebaseDb.child(`contacts/${key}`).remove(
                err => {
                    if(err)
                    console.log(err)
                    else
                    setCurrentId('')
                }
            )
        }
    }
    return (
        <>
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <h1 class="display-4 text-center" style={{
        backgroundColor: 'gray',
      }}>E-mart</h1>
            </div>
            <br/>
        </div>
        <div className="row">
            <div className="col-md-5">
            <h2>Add Products</h2>
                <ContactForm {...({addOrEdit,currentId,contactObjects})}/>
            </div>
            <div className="col-md-7">
                <h2>Products</h2>
                <table className="table table-borderless table-stripped">
                    <thead className="thed-light">
                        <tr style={{
        backgroundColor: 'grey',
      }}>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(contactObjects).map(id=>{
                                return <tr key={id}>
                                    <td>{contactObjects[id].productName}</td>
                                    <td>{contactObjects[id].description}</td>
                                    <td>
                                        <a className="btn text-primary" onClick={()=> {setCurrentId(id)}}>
                                            <i className="fas fa-pencil-alt"></i>
                                        </a>
                                        <a className="btn text-dan" onClick={()=> {onDelete(id)}}>
                                            <i className="far fa-trash-alt"></i>
                                        </a>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
     );
}

export default Contacts;