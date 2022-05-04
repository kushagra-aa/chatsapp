import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";

const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>{getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
};

export default Chat;

export async function getServerSideProps(context) {
  const ref = doc(collection(db, "chats"), context.query.id);
  // prep the messages
  const messagesRes = await getDocs(
    query(
      collection(db, `chats/${context.query.id}/messages`),
      orderBy("timestamp", "asc")
    )
  );
  const messages = messagesRes?.docs
    ?.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    ?.map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // prep the chats
  const chatRes = await getDoc(ref);
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: messages,
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  height: 100vh;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;
