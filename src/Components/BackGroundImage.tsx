
import styled from 'styled-components'
import { useAppSelector } from '../Redux/hooks';
import { selectCamera } from '../Redux/gameSlice';


// warning : I think url always starts from source and is not rrlly neegative
// why does ../../src/assets/anime.jpg work tho ?
const ImageDiv = styled.div<{ $xOffset: number, $yOffset: number }>`
    /* background-image: url("https://upload.wikimedia.org/wikipedia/commons/e/e9/Felis_silvestris_silvestris_small_gradual_decrease_of_quality.png"); */
    background-image: url("src/assets/map.png");
    background-position: ${({ $xOffset, $yOffset }) => `${$xOffset}px ${$yOffset}px`};
    background-repeat: no-repeat;
    color: white;
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: -10;
`;

function BackGroundImage() {
    const camera = useAppSelector(selectCamera)

    return (
        <ImageDiv $xOffset={-camera.x} $yOffset={-camera.y}>
        </ImageDiv>
    )
}

export default BackGroundImage
