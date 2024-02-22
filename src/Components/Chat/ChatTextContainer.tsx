import styled from "styled-components";
import TextLine from './TextLine';

const ChatTextContainerDiv = styled.div`
    background-color: aliceblue;
    position: absolute;
    left: 35%;
    top: 10%;
    width: 55%;
    height: 70%;
    overflow: scroll;
`
function ChatTextContainer({text}: {text: string[]}) {

    return (
        <ChatTextContainerDiv>
            <ul style={{ margin: "0", padding: "0" }}>
                {text.map((x, i) => (
                    <li key={i}>
                        <TextLine text={x}>
                        </TextLine>
                    </li>
                ))}
            </ul>
        </ChatTextContainerDiv>
    )
}

export default ChatTextContainer

