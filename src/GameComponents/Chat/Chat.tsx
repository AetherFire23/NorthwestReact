import styled from 'styled-components'
import { ExitButtonDiv } from '../Inventory/Inventory'
import { MenuSelections } from '../MainMenuBar';
import { useState } from 'react';
import ChatTextContainer from './ChatTextContainer';

const ChatContainerDiv = styled.div`
    background-color: black;
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    z-index: 99;
`
const ChatInput = styled.input`
    background-color: aliceblue;
    position: absolute;
    left: 35%;
    top: 85%;
    width: 55%;
    height: 10%;
`
const GroupPanelDiv = styled.div`
    background-color: aliceblue;
    position: absolute;
    left: 15%;
    top: 75%;
    width: 55%;
    height: 20%;
`
const ConfirmChatMessageDiv = styled.button`
    background-color: aliceblue;
    position: absolute;
    left: 91%;
    top: 85%;
    width: 5%;
    height: 10%;
`

interface IChatProps {
    selectedMenu: MenuSelections;
    closeMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    setSelectedMenu: React.Dispatch<React.SetStateAction<MenuSelections>>;
}

function Chat({ selectedMenu, closeMenu }: IChatProps) {
    const [textInput, setTextInput] = useState("")
    const [chatMessages, setChatMessages] = useState(dummyText)
    const isChatOpen = selectedMenu === 'chat'
    const controlChatMessage = (e: React.ChangeEvent<HTMLInputElement>) => { setTextInput(e.target.value) }

    function submitChatMessage() {
        setTextInput("")
        setChatMessages([...chatMessages, textInput])
    }
    return (
        <div>
            {isChatOpen && (
                <ChatContainerDiv>
                    <div style={{
                        backgroundColor: "white",
                        position: "absolute",
                        width: "10%",
                        height: "5%",
                        marginLeft: "2%",
                        marginTop: "5%",
                    }} />
                    <ChatTextContainer text={chatMessages}>
                    </ChatTextContainer>
                    <ChatInput value={textInput} onChange={controlChatMessage}>
                    </ChatInput>
                    <ConfirmChatMessageDiv onClick={submitChatMessage}></ConfirmChatMessageDiv>
                    <ExitButtonDiv onClick={closeMenu}>
                        X
                    </ExitButtonDiv>
                </ChatContainerDiv>
            )}
        </div>
    )
}

export default Chat

const dummyText = [
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "ssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "ssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
]
