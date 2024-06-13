import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { REMOVE_PDF } from "../utils/mutations";
import { QUERY_PT_PDFS } from "../utils/queries";
const PdfLinks = () => {
  let { data } = useQuery(QUERY_PT_PDFS);
  let [removePdf] = useMutation(REMOVE_PDF);

  let pdfs = data?.pdfs || [];

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

  const handleEditPdf = (id) => {
    window.location.replace(`/edit-pdf/${id}`);
  };

  return (
    <main>
      <div id="uploads-wrapper">
        {pdfs.map((upload) => {
          let Url = upload.url;
          console.log(Url);
          return (
            <div key={upload.url} className="upload">
              {Auth.loggedIn() && (
                <div>
                  <button
                    onClick={() => {
                      return handleDeletePdf(upload.url);
                    }}
                  >
                    Delete File
                  </button>
                  <button
                    onClick={() => {
                      return handleEditPdf(upload.id);
                    }}
                  >
                    Edit File
                  </button>
                </div>

              )}
              <a
                href={Url}
                target="_blank"
                rel="noreferrer"
                className="upload-link"
              >
                {upload.pdfname}.pdf
              </a>
              {/* <p className="upload-date">{upload.createdAt}</p> */}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default PdfLinks;
