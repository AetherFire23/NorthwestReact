import React from 'react'
import styled from 'styled-components'
import { IItem } from './Inventory'


const ItemDiv = styled.div`
    background-color: teal;
    width: 75%;
    height: 4rem;
    margin-left: 1rem;
    margin-top: 1rem;
`

interface IItemsProps {
    item: IItem,
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}
function Item({ item, onClick }: IItemsProps) {
    //
    return (
        <ItemDiv onClick={onClick}>
            {item.name}
        </ItemDiv>
    )
}

export default Item