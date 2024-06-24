import React from 'react'
import styled from 'styled-components'
import { Item } from '../../../../Redux/query/generated'

const ItemDiv = styled.div`
    background-color: teal;
    width: 75%;
    height: 4rem;
    margin-left: 1rem;
    margin-top: 1rem;
`

interface IItemsProps {
    item: Item,
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}
function ItemComponent({ item, onClick }: IItemsProps) {
    //
    return (
        <ItemDiv onClick={onClick}>
            {item.itemType}
        </ItemDiv>
    )
}

export default ItemComponent
