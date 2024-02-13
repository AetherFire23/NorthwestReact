import styled from "styled-components";

const TextDiv = styled.div`
background-color: beige;
    width: 100%;
    overflow-wrap: break-word;
`

export default function TextLine({ text }: { text: string }) {

    return (
        <>
            <hr style={{ width: '100%', borderWidth: '1px', borderColor: 'black' }} />
            <TextDiv>
                {`someplayer: ${text}`}
            </TextDiv>
        </>
    )
}