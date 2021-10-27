import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Button, Navbar} from 'react-bootstrap'
import { API_KEY } from './api_key'
import styled from 'styled-components'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

const StyledContainer = styled(Container)`
    background-color: rgb(0,0,0,0.08);
    border-radius:2rem;
    padding:1.5rem;
`

const StyledButton = styled(Button)`
    margin-top: 2rem;
    margin-bottom: 2rem;
`
const StyledDiv = styled.div`
    width:100%;
    text-align:center;
`
const StyledInput = styled.input`
    margin-right:1rem;
    padding:0.3rem;
`
const StyledTooltip = styled.div`
    width:100%;
    text-align:center;
`
export const Main = () => {

    const [imagesURLs, setImagesURLs] = useState([])
    const [imageQuery, setImageQuery] = useState('')
    const getImages = () => {
        setImagesURLs([])
        const res = fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${imageQuery}`)
        .then(response => response.json())
        .then(res =>{
            console.log(res.hits[0].webformatURL);
            res.hits.forEach(val => {
                // console.log(val)
                
                setImagesURLs((prev)=> [...prev, val.webformatURL])
            })
        })
        console.log(res);
        console.log(imagesURLs, 'hi');
        
    }
   
    return(
        <>
             <Navbar bg="dark" variant="dark" className="">
                <Container>
                <Navbar.Brand href="#home">BDI Plus Image Seacrh project by Ayush Raikwar</Navbar.Brand>
                </Container>
            </Navbar>
            <br />
            <StyledTooltip className="my-5">
            {['right'].map((placement) => (
                <OverlayTrigger
                key={placement}
                placement={placement}
                overlay={
                    <Tooltip id={`tooltip-${placement}`}>
                    Please reload the page after a search.
                    </Tooltip>
                }
                >
                <Button variant="secondary">Hover on me</Button>
                </OverlayTrigger>
            ))}
            </StyledTooltip>
            <StyledDiv>
                <StyledInput value={imageQuery} placeholder="Search images" onChange={e => {
                    setImageQuery(e.target.value)
                }} />
                <StyledButton onClick={getImages}>Get Images</StyledButton> 
            </StyledDiv>
        
            {(imagesURLs.length) ? (
                <StyledContainer>
                <Row>
                    <Col className="p-3 text-center">
                    {imagesURLs.map(img => {
                        return(
                            
                                <img className="m-1" width="30%" src={img} alt="Cool guy Images.jpeg lol" />

                        )
                    })}
                    </Col>
                </Row>
               
                </StyledContainer>
            ) : null }

            
        </>
    )
}