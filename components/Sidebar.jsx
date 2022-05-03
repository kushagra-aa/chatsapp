import { Avatar, Button, IconButton } from "@material-ui/core";
import { MoreVert } from "@mui/icons-material";
import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = query(
    collection(db, "chats"),
    where("users", "array-contains", user.email)
  );
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt("enter email address for user");

    if (!input) return;
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // we need to add chat into the db ''chats' collection

      addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => signOut(auth)} src={user?.photoURL} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="search in chats" />
      </Search>
      <SidebarButton onClick={createChat}>start a new chat</SidebarButton>

      {/* Chats */}
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const Header = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const IconsContainer = styled.div``;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  outline: none;
  outline-width: 0;
  border: none;
  flex: 1;
`;
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
