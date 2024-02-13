import styled from 'styled-components'
import Inventory from './Inventory';
import { useState } from 'react';
import Chat from './Chat/Chat';
import GametTaskMenu from './Tasks/GameTaskMenu';
import GameTaskMenu from './Tasks/GameTaskMenu';
const StyledBar = styled.div`
    background-color: black;
    width: 40%;
    height: 20%;
    left: 5%;
    top: 75%;
    position: absolute;
    display: flex;
    align-items: center;
    padding-right: 1rem;
    box-shadow: 0 0px 25px rgba(0, 0, 0, 1); /* Slightly stronger shadow */
    border-radius: 10px; /* More rounded corners */
`;
const MenuButtonDiv = styled.div`
  width: 15%;
  height: 60%;
  background-color: aliceblue;
  margin-left: 1rem;
  border-radius: 10px; /* More rounded corners */
`
export type MenuSelections = "none" | "inventory" | "ship" | "logs" | "chat" | "tasks"
export default function Bar() {
  const [selectedMenu, setSelectedMenu] = useState<MenuSelections>("none")
  const closeMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("yeah")
    setSelectedMenu("none")
    e.stopPropagation()
  }
  return (
    <div>
      <GameTaskMenu closeMenu={closeMenu} selectedMenu={selectedMenu}/>
      <Inventory selectedMenu={selectedMenu} closeMenu={closeMenu} />
      <Chat closeMenu={closeMenu} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <StyledBar>
        <MenuButton txt='inv' onClick={() => setSelectedMenu("inventory")} />
        <MenuButton txt='chat' onClick={() => setSelectedMenu("chat")} />
        <MenuButton txt='logs' onClick={() => setSelectedMenu("logs")} />
        <MenuButton txt='Task' onClick={() => setSelectedMenu("tasks")} />
        <MenuButton txt='ship' onClick={() => setSelectedMenu("ship")} />
        <MenuButton txt='character' onClick={() => setSelectedMenu("chat")} />
      </StyledBar>
    </div>
  )
}
interface MenuButtonParams {
  txt: string,
  onClick?: () => void,
}
function MenuButton({ onClick, txt }: MenuButtonParams) {
  function onClick2(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (onClick) {
      onClick()
    }
    e.stopPropagation();
  }
  return (
    <MenuButtonDiv onClick={onClick2}>
      <label> {txt}</label>
    </MenuButtonDiv>
  )
}