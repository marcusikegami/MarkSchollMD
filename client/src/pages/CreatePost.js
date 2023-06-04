import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../utils/mutations";
import { UPLOAD_FILE } from "../utils/mutations";
import auth from "../utils/auth";
import BodyParagraph from "../components/BodyParagraph";

const CreatePost = (user) => {
  const [formState, setFormState] = useState({
    header: "",
    category: "",
    image: "",
    imagecaption: "",
    video: "",
    urls: [],
  });
  const [paragraphs, setParagraphs] = useState([<BodyParagraph key={0} />]);

  const [createPost, { error }] = useMutation(ADD_POST);
  const [uploadFile, { loading }] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  });

  // This function updates the state of primary input fields before the body paragraphs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // This function uploads the Thumbnail image or the Video file to the S3 bucket
  const handleMainFileChange = async (event) => {
    let confirm = window.confirm("Are you sure you want to upload this file?");
    debugger;
    if (confirm) {
      console.log(event.target);
      const file = event.target.files[0];
      console.log(file);
      if (!file) return;
      try {
        const { data } = await uploadFile({ variables: { file } });
        if (event.target.name === "image") {
          formState.image = data.singleUpload.url;
        } else if (event.target.name === "video") {
          formState.video = data.singleUpload.url;
        }
        console.log(formState);
      } catch (err) {
        console.error(err);
        window.alert(`${err}`);
      }
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    debugger;
    let paragraphsArray = gatherParagraphData();
    console.log(paragraphsArray);
    try {
      const { data } = await createPost({
        variables: { ...formState, body: paragraphsArray },
      });

      window.location.href = `/post/${data.addPost._id}`;
    } catch (err) {
      console.error(error);
      window.alert(`${err}`);
    }
    return;
  };

  const addParagraph = (e) => {
    e.preventDefault();
    setParagraphs([...paragraphs, <BodyParagraph key={paragraphs.length} />]);
  };

  const removeParagraph = (e) => {
    e.preventDefault();
    if (paragraphs.length > 1) {
      setParagraphs(paragraphs.slice(0, -1));
    }
  };

  const gatherParagraphData = () => {
    let paragraphsArray = [];
    let paragraphs = document.getElementById("paragraphs-form").childNodes;
    let arr = [...paragraphs];
    arr.map((element) => {
      let obj = {};
      let contents = element.childNodes;
      console.log(contents[2].innerText);
      obj.header = contents[0].value;
      obj.image = contents[2].innerText;
      obj.imagecaption = contents[3].value;
      obj.body = contents[4].value;
      paragraphsArray.push(obj);
    });
    console.log(paragraphsArray);
    return paragraphsArray;
  };
  if (auth.loggedIn()) {
    return (
      <main id="main">
        {loading && <div>Uploading file, please wait before continuing...</div>}
        <div className="form-container">
          <form className="post-form">
            <h2>Header</h2>
            <input
              className="form-input"
              placeholder="Header"
              name="header"
              type="text"
              id="post-header"
              value={formState.header}
              onChange={handleChange}
              onBlur={() => {
                if (formState.header === "") {
                  window.alert("Header is a required field");
                }
              }}
            />

            <h2>Video Link</h2>
            <input
              className="form-upload"
              placeholder="Video Link"
              name="video"
              type="file"
              id="post-video"
              onChange={handleMainFileChange}
              // onBlur={() => {
              //     if()
              // }}
            />
            <h2>Thumbnail/Image URL</h2>
            <input
              className="form-upload"
              name="image"
              type="file"
              id="post-image"
              onChange={handleMainFileChange}
              // onBlur={() => {
              //     if()
              // }}
            />
            <h2>Image Caption</h2>
            <input
              className="form-input"
              placeholder="Image Caption"
              name="imagecaption"
              type="text"
              id="post-image-caption"
              value={formState.imagecaption}
              onChange={handleChange}
            />

            <h2>Post Category</h2>
            <select
              className="form-select"
              placeholder="Post Category"
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
              <option value="">Post Category</option>
              <option value="Patient Education">Patient Education</option>
              <option value="Information about surgery with Dr. Scholl">
                Information about surgery with Dr. Scholl
              </option>
              <option value="Information for Physical Therapists">
                Information for Physical Therapists
              </option>
              <option value="News and Updates">News and Updates</option>
            </select>
          </form>
          <h2>Body</h2>
          <form className="post-form" id="paragraphs-form">
            {paragraphs}
          </form>
          {paragraphs.length > 1 && (
            <button type="button" onClick={removeParagraph}>
              Remove Paragraph
            </button>
          )}
          <button type="button" onClick={addParagraph}>
            Add New Body Paragraph
          </button>
          <button
            className="button-save"
            type="submit"
            onClick={handleFormSubmit}
          >
            Create Post
          </button>
        </div>
      </main>
    );
  } else {
    window.location.assign("/");
  }
};

export default CreatePost;

// File upload,
