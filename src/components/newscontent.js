import React, { useState, useEffect, useRef } from 'react';
import { Container, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Content = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [articles, setArticles] = useState([]);
    const searchTermRef = useRef(searchTerm);

    useEffect(() => {
        searchTermRef.current = searchTerm;
    }, [searchTerm]);

    const searchNews = () => {
        const apiKey = '5e5a98f1c4984dce9f63550b60e13a15';
        const url = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`;

        // request ke NewsAPI.org
        axios.get(url)
        .then(response => {
            const data = response.data.articles;

            if (data.length === 0) {
            // No results found
                setArticles([{title: 'Sorry, no result found.' }]);
            } else {
            setArticles(data);
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchNews();
    };

    return (
        <Container>
            <Form className="d-flex ms-auto" onSubmit={handleSubmit}>
                <FormControl
                type="text"
                placeholder="Search here..."
                className="mr-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="dark" type="submit">Search</Button>
            </Form>
        
        <Row className="mt-4">
            {articles.map((article, index) => (
            <Col key={index} md={3} mb={4}>
                <img
                src={article.urlToImage || 'placeholder-image-url'}
                alt={article.title}
                className="img-fluid mb-2"
                />
                <h4>{article.title}</h4>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
                </a>
            </Col>
            ))}
        </Row>
        </Container>
    );
}

    

    


   
        

export default Content;
