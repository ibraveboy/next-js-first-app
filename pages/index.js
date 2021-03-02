import Head from "next/head";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <div className="container">
      <Head>
        <title>Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>All Posts</h1>
      <div className="blog-posts">
        {posts.map((post) => {
          const url = "/posts/" + post.id;
          return (
            <div className="post">
              <Link href={url}>
                <a>
                  <h2>{post.title}</h2>
                </a>
              </Link>
              <p>{post.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return {
    props: { posts }, // will be passed to the page component as props
  };
}
