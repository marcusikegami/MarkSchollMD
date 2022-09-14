import PostPreview from "./PostPreview";

const CategoryPreviews = ({posts}) => {

    let news = [];
    let patientInfo = [];
    let ptInfo = [];


    posts.map(post => {
        if(post.category === "News and Updates") {
            news.push(post);
        }
        if(post.category === "Patient Education") {
            patientInfo.push(post);
        }
        if(post.category === "Information for Physical Therapists") {
            ptInfo.push(post);
        }
        return null;
    })
    while(news.length > 4 || patientInfo.length > 4 || ptInfo.length > 4) {
        news.shift();
    }
    return (
        <div id="previews-wrapper">
            <h1>Recent Posts</h1>
            <div className="preview">
                {/* <h1 id="news-preview">News</h1> */}
                { news && news.map(post => <PostPreview key={post._id} post={post} />)}
            </div>
            <div className="preview">
                {/* <h1 id="patient-preview">Information for Patients</h1> */}
                { patientInfo && patientInfo.map(post => <PostPreview key={post._id} post={post} />)}
            </div>
            <div className="preview">
                {/* <h1 id="pt-preview">Information for Physical Therapists</h1> */}
                { ptInfo && ptInfo.map(post => <PostPreview key={post._id} post={post} />)}
            </div>
        </div>
    )
}

export default CategoryPreviews;