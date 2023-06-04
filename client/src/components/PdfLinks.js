import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PT_PDFS } from "../utils/queries";
import { REMOVE_PDF } from "../utils/mutations";
import Auth from "../utils/auth";
const PdfLinks = () => {
  let { data } = useQuery(QUERY_PT_PDFS);
  let [removePdf] = useMutation(REMOVE_PDF);

  let pdfs = data?.pdfs || [];

  const handleDeletePdf = async (url) => {
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
        {pdfs.map((upload) => {
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
              <a href={Url} target="__blank" download className="upload-link">
                {upload.pdfname}.pdf
              </a>
              <p className="upload-date">{upload.createdAt}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default PdfLinks;
