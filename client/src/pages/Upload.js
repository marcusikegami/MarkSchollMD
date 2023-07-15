<<<<<<< HEAD
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import auth from '../utils/auth';
import { ADD_PDF, UPLOAD_FILE } from '../utils/mutations';

const UploadForm = () => {
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState({ pdfname: '', category: '', url: '' });
    const [addPdf] = useMutation(ADD_PDF, {
        onCompleted: data => console.log(data)
    });
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    });

    const handleChange = event => {
        console.log(event.target.name, ':', event.target.value);
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFileChange = async (event) => {
        let confirm = window.confirm('Are you sure you want to upload this file?');
        if (confirm) {
            const file = event.target.files[0];
            formState.pdfname = file.name;
            console.log(file);
            if (!file) return;
            try {
                const { data } = await uploadFile({ variables: { file } })
                formState.url = data.singleUpload.url;
                console.log(formState.url);
            } catch (err) {
                console.error(err);
                window.alert(`${err}`);
            };

        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (formState.category === '') {
            window.alert('Please select a category');
            return;
        }
        try {
            console.log(formState);
            const { data } = await addPdf({ variables: { ...formState } });
            window.alert('Completed');
            setFormState({ pdfname: '', url: '', category: '' });
        } catch (err) {
            console.error(err);
            window.alert(`${err}`);
        }
        return;
    };

    if (auth.loggedIn()) {
        return (
            <div id='upload-container'>
                <h1>Upload File</h1>
                <input type="file" onChange={handleFileChange} />

                <h2>Link PDF</h2>
                <form onSubmit={handleFormSubmit}>
                    <h2>PDF Name</h2>
                    <input
                        className='form-input'
                        placeholder='Filename'
                        name='pdfname'
                        type='text'
                        id='post-filename'
                        value={formState.pdfname}
                        onChange={handleChange}
                        onBlur={() => {
                            if (formState.pdfname === "") {
                                window.alert('Filename is a required field');
                            }
                        }}
                    />
                    <h2>Category</h2>
                    <select
                        className='form-select'
                        placeholder='PDF Category'
                        name='category'
                        type='select'
                        id='post-category'
                        value={formState.category}
                        onChange={handleChange}
                        onBlur={() => {
                            if (formState.category === "") {
                                window.alert('Category is a required field');
                            }
                        }}
                    >
                        <option value='Select Category'>Select Category</option>
                        <option value='Info for Patients'>Info for Patients</option>
                        <option value='Info for Physical Therapists'>Info for Physical Therapists</option>
                    </select>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    } else {
        window.location.assign('/');
=======
import { useMutation } from "@apollo/client";
import { useState } from "react";
import auth from "../utils/auth";
import { UPLOAD_FILE, ADD_PDF } from "../utils/mutations";

const UploadForm = () => {
  const [formState, setFormState] = useState({
    pdfname: "",
    category: "",
    url: "",
  });
  const [addPdf] = useMutation(ADD_PDF, {
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
>>>>>>> 8b40927eb32e27013e6a0a0b51d0be33224940dd
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
      const { data } = await addPdf({ variables: { ...formState } });
      window.alert("Completed");
      setFormState({ pdfname: "", url: "", category: "" });
    } catch (err) {
      console.error(err);
      window.alert(`${err}`);
    }
    return;
  };

<<<<<<< HEAD
=======
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

>>>>>>> 8b40927eb32e27013e6a0a0b51d0be33224940dd
export default UploadForm;
