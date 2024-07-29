import styled from 'styled-components'

const InfoContainer = styled.div`
    width: 45%;
    height: 90%;
    flex-shrink: 0;
    border: 1px solid #262F66;
    margin-left: 1rem; 
    display: flex;
    flex-direction: column;
`
const Header = styled.div`
    display: flex;
    height: 20%;
    border: 1px solid red;
`
const Content = styled.div`
    display: flex;
    height: 30%;
    border: 1px solid blue;
`
const Footer = styled.div`
    /* display: flex; */
    flex: 1;
    border: 1px solid black;
`
const InfoComp = () => {
    return (
        <InfoContainer>
            <Header/>
            <Content/>
            <Footer/>
        </InfoContainer>
    )
}

export default InfoComp