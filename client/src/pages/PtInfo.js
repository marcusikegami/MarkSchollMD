import { useQuery, useMutation } from "@apollo/client";
import { QUERY_UPLOADS, QUERY_PT_PDFS } from "../utils/queries";
import { REMOVE_PDF } from "../utils/mutations";
import PostPreview from "../components/PostPreview";
import Auth from "../utils/auth";
import PdfLinks from "../components/PdfLinks";
// import SaveFile from '!file-loader!../assets/images/savefile.svg'
const PtInfo = () => {
  let { data } = useQuery(QUERY_PT_PDFS);
  let [removePdf] = useMutation(REMOVE_PDF);
  let uploads = data?.ptpdfs || [];

  const handleDeleteUpload = async (url) => {
    try {
      const { data } = await removePdf({
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
      <div id="uploads-wrapper">
        {uploads.map((upload) => {
          let Url = upload.url;
          console.log(Url);
          return (
            <div key={upload.url} className="upload">
              {Auth.loggedIn() && (
                <button
                  onClick={() => {
                    return handleDeleteUpload(upload.url);
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
      <PdfLinks />
    </main>
  );
};

export default PtInfo;
