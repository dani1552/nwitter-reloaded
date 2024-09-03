import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div``;

export default function Timeline() {
  // tweets 상태 정의 : ITweet 객체의 빈 배열로 초기화
  const [tweets, setTweet] = useState<ITweet[]>([]);

  // 트윗 데이터를 Firestore에서 가져오는 비동기 함수
  const fetchTweets = async () => {
    // tweets 컬렉션을 "createdAt" 필드를 기준으로 내림차순 정렬하여 쿼리 생성
    const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc")
      );
    const snapshot = await getDocs(tweetsQuery);
    const tweets = snapshot.docs.map((doc) => {
        const { tweet, createdAt, userId, username, photo } = doc.data();
        return {
          tweet,
          createdAt,
          userId,
          username,
          photo,
          id: doc.id,
        };
    }); // 각 문서의 데이터를 콘솔에 출력 (디버깅용)
    setTweet(tweets);
  };

  // 컴포넌트가 처음 렌더링될 때 트윗 데이터를 가져옴
  useEffect(() => {
    fetchTweets();
  }, []); // 빈 배열을 의존성으로 하여 처음 한 번만 실행됨
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  ); // tweets 상태를 JSON 형식으로 화면에 렌더링
}




