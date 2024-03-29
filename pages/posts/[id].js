import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

export default function FirstPost({ sPost }) {
  const router = useRouter();
  const [cPost, setCPost] = useState(null);
  useEffect(() => {
    if (sPost === null) {
      console.log()
      fetch(`https://jsonplaceholder.typicode.com/posts/${router.query.id}`)
        .then((res) => res.json())
        .then((res) => setCPost(res));
    }
  }, []);
  let post = sPost || cPost;
  return (
    <Layout>
      <div>
        {post ? (
          <>
            <Head>
              <title>{post.title}</title>
            </Head>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </>
        ) : (
          <>
            <Head>
              <title>Loading</title>
            </Head>
            <h1>Loading</h1>
          </>
        )}
        <h2>
          <Link href="/">
            <a> back to home </a>
          </Link>
        </h2>
      </div>
    </Layout>
  );
}

// This gets called on every request
// We can also use getStaticProps instead of getServerSideProps if we don't need the updated data on each request
// We are using getInitialProps to render the page from the server if the page reloads or accessed through the url directly
// if we navigate through client side then it will behave as SPA Page
FirstPost.getInitialProps = async (context) => {
  // get the params
  // we can have the following props from context
  // params, req, res, query, preview, previewData, resolvedUrl, locale, locales, defaultLocale
  // req - have request object that client computer sends to server.
  const { query } = context;
  if (typeof window != "undefined") {
    return {
      sPost: null,
      query,
    };
  }
  // Fetch data from external API
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${query.id}`
  );
  const post = await res.json();

  // Pass data to the page via props
  return { sPost: post, query };
};
