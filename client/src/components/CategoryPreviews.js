import PostPreview from "./PostPreview";

const CategoryPreviews = ({posts}) => {

    let news = [];
    let patientInfo = [];

    posts.map(post => {
        if(post.category === "News and Updates") {
            news.push(post);
        }
        if(post.category === "Patient Education" || post.category === "Information about surgery with Dr. Scholl") {
            patientInfo.push(post);
        }
        return null;
    })
    while(news.length > 4 || patientInfo.length > 4) {
        news.shift();
        patientInfo.shift();
    }
    return (
        <div id="previews-wrapper">
            {/* <h1>Recent Posts</h1> */}
            <div className="preview">
                <h1 id="news-preview">NEWS</h1>
                { news && news.map(post => <PostPreview key={post._id} post={post} />)}
            </div>
            <div className="preview">
                <h1 id="patient-preview">INFORMATION FOR PATIENTS</h1>
                { patientInfo && patientInfo.map(post => <PostPreview key={post._id} post={post} />)}
            </div>
            
        </div>
    )
}

export default CategoryPreviews;