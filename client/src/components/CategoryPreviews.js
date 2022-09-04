import PostPreview from "./PostPreview";

const CategoryPreviews = ({posts}) => {
    console.log(posts);

    let news = [];

    posts.map(post => {
        if(post.category === "News and Updates") {
            news.push(post);
        }
        return null;
    })
    while(news.length > 4) {
        news.shift();
    }
    return (
        <div>
            { news && news.map(post => <PostPreview key={post._id} post={post} />)}
        </div>
    )
}

export default CategoryPreviews;