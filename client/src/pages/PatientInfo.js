import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PI_PDFS } from "../utils/queries";
import { REMOVE_PDF } from "../utils/mutations";
import orthoinfologo from "../assets/images/orthoinfologo.png";
import Auth from "../utils/auth";
import { useEffect, useState } from "react";

const PatientInfo = () => {
  let { data } = useQuery(QUERY_PI_PDFS);
  let pdfs = data?.pipdfs || [];
  let [removePdf] = useMutation(REMOVE_PDF);

  const handleDeletePdf = async (url) => {
    try {
      await removePdf({
        variables: { url: url },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    return;
  };

  return (
    <main>
      <div className="logo-links">
        <a href="https://orthoinfo.aaos.org/">
          <img alt="orthoinfo.org logo" src={orthoinfologo} />
        </a>
      </div>
      <div id="uploads-wrapper">
        {pdfs &&
          pdfs.map((upload) => {
            let Url = upload.url;
            console.log(Url);
            return (
              <div key={upload.url} className="upload">
                {Auth.loggedIn() && (
                  <button
                    onClick={() => {
                      return handleDeletePdf(upload.url);
                    }}
                  >
                    Delete File
                  </button>
                )}
                <a
                  href={Url}
                  target="_blank"
                  rel="noreferrer"
                  className="upload-link"
                >
                  {upload.pdfname}
                </a>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default PatientInfo;

// ortho info specific links to
