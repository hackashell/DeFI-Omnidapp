import styled from 'styled-components'

import backgroundImage from '@/assets/images/section-home-decoration.png'

export const BackgroundImage = () => <Image src={backgroundImage} />

const Image = styled.img`
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 0.3;
`
