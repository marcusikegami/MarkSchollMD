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
};

export default PtInfo;
