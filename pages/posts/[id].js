import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

export default function firstPost({ sPost }) {
  const router = useRouter();
  const [cPost, setCPost] = useState(null);
  useEffect(() => {
    if (sPost === null) {
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
export async function getServerSideProps(context) {
  // get the params
  // we can have the following props from context
  // params, req, res, query, preview, previewData, resolvedUrl, locale, locales, defaultLocale
  // req - have request object that client computer sends to server.
  if (typeof window === "undefined") {
    return {
      props: {
        sPost: null,
      },
    };
  }
  const { params } = context;
  // Fetch data from external API
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();

  // Pass data to the page via props
  return { props: { sPost: post } };
}
