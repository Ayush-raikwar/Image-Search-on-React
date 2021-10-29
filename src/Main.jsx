import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Button, Navbar} from 'react-bootstrap'
import { API_KEY } from './api_key'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
    background-color: rgb(0,0,0,0.08);
    border-radius:2rem;
    padding:1.5rem;
    @media(max-width:1030px){
        width:95%;
        background:url("https://images.unsplash.com/photo-1585328000852-779be6a6582b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=435&q=80");
        padding:1.25rem;
        div{
            div{
                img{
                    width:100%;
                    padding:0.25rem 0 0.25rem 0;
                }
            }
        }
    }
`

const StyledButton = styled(Button)`
    /* margin-top: 2rem; */
    /* margin-bottom: 2rem; */
    border-radius:2rem;
    padding:0.5rem 1rem;
`
const StyledDiv = styled.div`
    width:60%;
    margin:auto;
    border-radius:5rem;
    padding:1.5rem 5rem ;
    text-align:center;
    background-color: rgb(0,0,0,0.25);
    margin-bottom: 2rem;

    @media(max-width:1030px){
        width:80%;
        padding:1rem;
        border-radius:2rem;
        text-align:center;
        input{
            margin-top:1rem;
            margin-bottom:1rem;
            width:100%;
        }
        button{

        }
    }

`
const StyledInput = styled.input`
    margin-right:1.75rem;
    padding:0.4rem 2rem 0.4rem 2rem ;
    border-color:rgb(255,255,255,0.9);
    background-color:rgb(0,0,0,0.25);
    outline:none;
    color:#fff;
    &::placeholder{
        color:#fff;
    }
    width:50%;
    border-radius:2rem;
`

const StyledNavbarBrand = styled(Navbar.Brand)`
    font-size:2.5rem;    
    font-family: 'Fleur De Leah', cursive;

    @media(max-width:1030px){
        font-size:1.5rem;
        margin-left:1.25rem;
    }

`
const StyledImg = styled.img`
    margin-right:0.25rem;
    margin-left:0.25rem;
`

export const Main = () => {

    const [imagesURLs, setImagesURLs] = useState([])
    const [imageQuery, setImageQuery] = useState('')



    useEffect(() => {
        const demoImgs = fetch(`https://pixabay.com/api/?key=${API_KEY}`)
        .then(response => response.json())
        .then(res => {
            console.log(res);
            res.hits.forEach(val => {
                setImagesURLs(prev => [...prev, val.webformatURL])
            })
        })
        console.log(demoImgs);
    },[])



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
        .catch(err=> {
            console.log("Error = ",err);
        })
        console.log(res);
        console.log(imagesURLs, 'hi');
        
    }
   
    return(
        <>
             <Navbar bg="dark" variant="dark" className="">
                <Container>
                    <StyledNavbarBrand href="#home">Image library by Ayush</StyledNavbarBrand>
                </Container>
            </Navbar>
            <br />
     
            <StyledDiv>
                <StyledInput value={imageQuery} placeholder="Search for images" onChange={e => {
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
                                
                                    <StyledImg className="my-1" width="30%" src={img} />

                            )
                        })}
                        </Col>
                    </Row>
               
                </StyledContainer>
            ) : (<h1 className="text-center">No search found !</h1>) }

            
        </>
    )
}