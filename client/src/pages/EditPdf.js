import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import auth from "../utils/auth";
import { EDIT_PDF, UPLOAD_FILE } from "../utils/mutations";
import { QUERY_GET_PDF } from "../utils/queries";


const EditPdf = () => {
    // Set initial form state from pdf
    const { data } = useQuery(QUERY_GET_PDF);

    const [formState, setFormState] = useState({
        pdfname: data?.pdf.pdfname || "",
        url: data?.pdf.url || "",
        category: data?.pdf.category || "",
    });
    const [editPdf] = useMutation(EDIT_PDF, {
        onCompleted: (data) => console.log(data),
    });
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: (data) => console.log(data),
    });

    const handleChange = (event) => {
        console.log(event.target.name, ":", event.target.value);
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFileChange = async (event) => {
        let confirm = window.confirm("Are you sure you want to upload this file?");
        if (confirm) {
            const file = event.target.files[0];
            setFormState({
                pdfname: file.name,
            });
            console.log(file);
            if (!file) return;
            try {
                const { data } = await uploadFile({ variables: { file } });
                setFormState({
                    ...formState,
                    url: data.singleUpload.url,
                });
            } catch (err) {
                console.error(err);
                window.alert(`${err}`);
            }
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (formState.category === "") {
            window.alert("Please select a category");
            return;
        }
        try {
            console.log(formState);
            await editPdf({ variables: { ...formState } });
            window.alert("Completed");
            setFormState({ pdfname: "", url: "", category: "" });
        } catch (err) {
            console.error(err);
            window.alert(`${err}`);
        }
        return;
    };

    if (auth.loggedIn()) {
        return (
            <div id="upload-container">
                <h1>Upload File</h1>
                <input type="file" onChange={handleFileChange} />

                <h2>Link PDF</h2>
                <form onSubmit={handleFormSubmit}>
                    <h2>PDF Name</h2>
                    <input
                        className="form-input"
                        placeholder="Filename"
                        name="pdfname"
                        type="text"
                        id="post-filename"
                        value={formState.pdfname}
                        onChange={handleChange}
                        onBlur={() => {
                            if (formState.pdfname === "") {
                                window.alert("Filename is a required field");
                            }
                        }}
                    />
                    <h2>Category</h2>
                    <select
                        className="form-select"
                        placeholder="PDF Category"
                        name="category"
                        type="select"
                        id="post-category"
                        value={formState.category}
                        onChange={handleChange}
                        onBlur={() => {
                            if (formState.category === "") {
                                window.alert("Category is a required field");
                            }
                        }}
                    >
                        <option value="Select Category">Select Category</option>
                        <option value="Info for Patients">Info for Patients</option>
                        <option value="Info for Physical Therapists">
                            Info for Physical Therapists
                        </option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    } else {
        window.location.assign("/");
    }
};
export default EditPdf;
