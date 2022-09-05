import PostPreview from "./PostPreview";

const CategoryPreviews = ({posts}) => {
    console.log(posts);

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
    while(news.length > 4) {
        news.shift();
    }
    return (
        <div id="previews-wrapper">
            <div className="preview">
                <h1>News</h1>
                { news && news.map(post => <PostPreview key={post._id} post={post} />)}
            </div>
            <div className="preview">
                <h1>Information for Patients</h1>
                { patientInfo && patientInfo.map(post => <PostPreview key={post._id} post={post} />)}
            </div>
            <div className="preview">
                <h1>Information for Physical Therapists</h1>
                { ptInfo && ptInfo.map(post => <PostPreview key={post._id} post={post} />)}
            </div>
        </div>
    )
}

export default CategoryPreviews;