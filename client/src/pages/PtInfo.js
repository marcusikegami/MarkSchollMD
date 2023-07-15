<<<<<<< HEAD
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_PT_PDFS } from "../utils/queries";

const PtInfo = () => {
  let { data } = useQuery(QUERY_PT_PDFS);
  let [removeUpload] = useMutation(REMOVE_FILE);
  let uploads = data?.ptpdfs || [];

  const handleDeleteUpload = async (url) => {
    try {
      const { data } = await removeUpload({
        variables: { url: url }
      })
=======
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PT_PDFS } from "../utils/queries";
import { REMOVE_PDF } from "../utils/mutations";
import Auth from "../utils/auth";

const PtInfo = () => {
  let { data } = useQuery(QUERY_PT_PDFS);
  let [removePdf] = useMutation(REMOVE_PDF);
  let uploads = data?.ptpdfs || [];

  const handleDeleteUpload = async (url) => {
    const pdfUrl = url;
    try {
      await removePdf({
        variables: { url: pdfUrl },
      });
>>>>>>> 8b40927eb32e27013e6a0a0b51d0be33224940dd
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    return;
  };
  return (
    <main>
<<<<<<< HEAD
      <div id='uploads-wrapper'>
        {uploads.map(upload => {
          let Url = upload.url;
          console.log(Url);
          return (

            <div key={upload.url} className='upload'>
              {Auth.loggedIn() && (
                <button onClick={() => { return handleDeleteUpload(upload.url) }}>Delete File</button>
              )}
              {/* <a href={Url} download className='upload-link'>{upload.filename}</a> */}
              <a href={Url} target='__blank' download className='upload-link'>{upload.pdfname}.pdf</a>
              <p className='upload-date'>{upload.createdAt}</p>
              {/* <img src={SaveFile} alt='save file' className='save-file' /> */}
            </div>
          )
        })}
      </div>
      <PdfLinks />
    </main>
  )
=======
      <div id="uploads-wrapper">
        {uploads.map((upload) => {
          let Url = upload.url;
          return (
            <div key={upload.url} className="upload">
              {Auth.loggedIn() && (
                <button
                  onClick={() => {
                    handleDeleteUpload(Url);
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
>>>>>>> 8b40927eb32e27013e6a0a0b51d0be33224940dd
};

export default PtInfo;
