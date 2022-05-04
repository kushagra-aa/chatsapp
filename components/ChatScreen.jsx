import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import { Avatar as AvatarElm } from "@material-ui/core";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import { useRef, useState } from "react";
import TimeAgo from "timeago-react";

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();
  const endMessagesRef = useRef(null);
  const [messagesSnapshot] = useCollection(
    query(
      collection(db, `chats/${router.query.id}/messages`),
      orderBy("timestamp", "asc")
    )
  );
  const recipientEmail = getRecipientEmail(chat.users, user);
  const [recipientSnapshot] = useCollection(
    query(
      collection(db, "users"),
      where("email", "==", getRecipientEmail(chat.users, user))
    )
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return messages.map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    // update lastseen
    setDoc(
      doc(db, "users", user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );
    addDoc(collection(db, `chats/${router.query.id}/messages`), {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    endMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipient?.imgURL} />
        ) : (
          <Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
        )}
        <HeaderInfo>
          <h3>{recipientEmail}</h3>
          <p>
            Last Seen:
            {recipientSnapshot ? (
              <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
            ) : (
              "Unavailable"
            )}
          </p>
        </HeaderInfo>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {/* messages */}
        {showMessages()}
        <EndOfMessage ref={endMessagesRef} />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticonIcon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button disabled={!input} type="submit" onClick={sendMessage} hidden>
          send message
        </button>
        <MicIcon />
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;
const Container = styled.div``;
const MessageContainer = styled.div`
  padding: 30px;
  background: #e5ded8;
  min-height: 90vh;
`;
const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;
const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background: #fff;
  z-index: 100;
`;
const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  font-size: 18px;
  background: #ffe4e4;
  margin-left: 15px;
  margin-right: 15px;
`;
const Header = styled.div`
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 100;
  display: flex;
  padding: 11px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;
const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
    text-transform: capitalize;
    > * {
      text-transform: none;
    }
  }
`;
const HeaderIcons = styled.div`
  display: flex;
`;
const IconButton = styled.div``;
const Avatar = styled(AvatarElm)`
  margin: 5px;
  margin-right: 15px;
`;
