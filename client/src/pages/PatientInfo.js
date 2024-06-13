import { useMutation, useQuery } from '@apollo/client';
import orthoinfologo from '../assets/images/orthoinfologo.png';
import PostPreview from '../components/PostPreview';
import Auth from '../utils/auth';
import { REMOVE_PDF } from '../utils/mutations';
import { QUERY_PI_PDFS, QUERY_POSTS } from '../utils/queries';

const PatientInfo = () => {
  let { data } = useQuery(QUERY_POSTS);
  let posts = data?.posts || [];
  let GetPdfs = () => {
    let { data } = useQuery(QUERY_PI_PDFS);
    let pdfs = data?.pipdfs || [];
    console.log(pdfs);
    return pdfs;
  }
  let [removePdf] = useMutation(REMOVE_PDF);

  let pdfs = GetPdfs();
  console.log(pdfs);
  const handleDeletePdf = async (url) => {
    try {
      await removePdf({
        variables: { url: url }
      })
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    return;
  };

  return (
    <main>
      <div className="logo-links">
        <a href="https://orthoinfo.aaos.org/"><img alt="orthoinfo.org logo" src={orthoinfologo} /></a>
      </div>
      <div id='uploads-wrapper'>
        {pdfs && pdfs.map(upload => {
          let Url = upload.url;
          console.log(Url);
          return (

            <div key={upload.url} className='upload'>
              {Auth.loggedIn() && (
                <button onClick={() => { return handleDeletePdf(upload.url) }}>Delete File</button>
              )}
              <a href={Url} target='__blank' download className='upload-link'>{upload.pdfname}.pdf</a>
              <p className='upload-date'>{upload.createdAt}</p>
            </div>
          )
        })}
      </div>
      <div id='posts-wrapper'>
        {posts.map(post => {
          if (post.category === "Information about surgery with Dr. Scholl" || post.category === "Patient Education" || post.category === "Knee" || post.category === "Shoulder") {
            return (
              <PostPreview post={post} />
            )
          }
          return null;
        })}
      </div>
    </main>
  )
};

export default PatientInfo;

// ortho info specific links to
