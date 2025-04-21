import { useEffect, useState } from "react";
import Form from "../../components/form";
import Post from "../../components/post";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import Loader from "../../components/loader";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const tweetsCol = collection(db, "tweets");
    const q = query(tweetsCol, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const temp = [];
      snapshot.docs.forEach((doc) => temp.push({ id: doc.id, ...doc.data() }));
      setTweets(temp);
    });

    return () => unsub();
  }, []);
  // console.log(tweets);
  return (
    <main className=" border border-zinc-600  overflow-y-auto">
      {/* Header */}
      <header className="border-b border-zinc-600 p-4 font-bold text-[#e7e9ea]">
        Anasayfa
      </header>

      <Form user={user} />
      {!tweets ? (
        <Loader design="my-20 mx-60  " />
      ) : (
        tweets.map((tweet, key) => <Post key={key} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;
