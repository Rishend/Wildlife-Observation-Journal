
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const journalSchema = Yup.object().shape({
    title: Yup.string()
        .min(4, "Min. 4 characters req.")
        .required("Name is Required"),

});

const Journal = () => {
    const navigate = useNavigate();

    const [selFile, setSelFile] = useState('');

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    // initialize the formik
    const journalForm = useFormik({
        initialValues: {
            user: currentUser._id,
            date: new Date(),
            title: "",
            description: "",

        },
        onSubmit: async (values, { setSubmitting }) => {
            values.avatar = selFile;
            setSubmitting(true);

            setTimeout(() => {
                console.log(values);
                setSubmitting(false);
            }, 3000);

            // send the data to the server

            const res = await fetch("http://localhost:5000/journal/add", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },

            });

            console.log(res.status);

            if (res.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Nice",
                    text: "You have signed up successfully",
                })
                    .then((result) => {
                        navigate("/login");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops!!",
                    text: "Something went wrong",
                });
            }
        },
        // validationSchema: journalSchema,
    });

    const uploadFile = async (e) => {
        if (!e.target.files) return;

        const file = e.target.files[0];
        console.log(file.name);
        setSelFile(file.name);

        const fd = new FormData();
        fd.append('myfile', file);

        const res = await fetch('http://localhost:5000/util/uploadfile', {
            method: 'POST',
            body: fd
        });

        console.log(res.status);


    }

    return (
        <motion.div>
            <div className="">
                <div className="col-md-4 mx-auto py-5">
                    <div className="card shadow">
                        <div className="card-body">
                            <form onSubmit={journalForm.handleSubmit}>
                                <img
                                    style={{
                                        width: 100,
                                        display: "block",
                                        margin: 'auto'
                                        // borderRadius: 50,

                                    }}
                                    src="https://static.vecteezy.com/system/resources/thumbnails/017/101/429/small_2x/ilustration-of-owl-free-vector.jpg" ></img>
                                <h3 className="text-center text-success ">Welcome To The Journey!</h3>
                                <hr />
                                


                                <label >Title</label>

                                <span style={{ fontSize: "1.0em", color: "red", marginLeft: 20 }}>
                                </span>

                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    name="title"
                                    onChange={journalForm.handleChange}
                                    value={journalForm.values.title}
                                />

                                <label>Description</label>
                                <span style={{ fontSize: "0.8em", color: "red", marginLeft: 20 }}>

                                </span>

                                <textarea
                                    className="form-control mb-6"
                                    name="description"
                                    onChange={journalForm.handleChange}
                                    value={journalForm.values.description}
                                ></textarea>

                                <button
                                    disabled={journalForm.isSubmitting}
                                    type="submit"
                                    className="btn btn-primary mt-5 w-100"
                                >
                                    {journalForm.isSubmitting ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                aria-hidden="true"
                                            ></span>
                                            <span>Loading ...</span>


                                        </>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </motion.div>
    );
};


export default Journal;

