import {
  collection,
  /*  getDocs, */
  limit, // 쿼리에서 가져올 문서 개수 제한
  onSnapshot, // 실시간으로 데이터를 가져오기 위해 사용
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: scroll;
`;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);

  // 컴포넌트가 처음 렌더링될 때 트윗 데이터를 가져옴
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null; // Firestore 구독을 해제하기 위한 변수를 선언
    const fetchTweets = async () => {
      // Firestore 쿼리를 생성하여 트윗을 가져옴
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      /* const spanshot = await getDocs(tweetsQuery);
        const tweets = spanshot.docs.map((doc) => {
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
          };
        }); */

      // 실시간으로 Firestore에서 데이터를 가져옴
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          // Firestore 문서에서 데이터를 추출하여 ITweet 객체로 변환
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id, // 문서 ID를 ITweet 객체에 포함
          };
        });
        setTweet(tweets);
      });
    };
    fetchTweets();

    // 컴포넌트가 언마운트될 때 Firestore 구독을 해제함
    return () => {
      unsubscribe && unsubscribe(); // 구독이 존재하면 해제
    };
  }, []); // 빈 배열을 의존성으로 사용하여 컴포넌트가 처음 렌더링될 때만 실행
  
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
