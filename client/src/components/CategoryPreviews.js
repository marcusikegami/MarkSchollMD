import PostPreview from "./PostPreview";

const CategoryPreviews = ({ posts }) => {
  let news = [];

  posts.map((post) => {
    if (post.category === "News and Updates") {
      news.push(post);
    }
    return null;
  });
  while (news.length > 4) {
    news.shift();
  }
  return (
    <div id="previews-wrapper">
      {/* <h1>Recent Posts</h1> */}
      <div className="preview">
        <h1 id="news-preview">NEWS</h1>
        {news && news.map((post) => <PostPreview key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default CategoryPreviews;
