import React, { useEffect, useState } from "react"
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ApiClient from "../api/client";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import Scrollbars from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const ModalA = ({ show, handleShow, switchModal }) => {
    const [data, setData] = useState([]);
    const [showC, setShowC] = useState();
    const [query, setQuery] = useState();
    const [selectedContact, setSelectedContact] = useState();
    const [isLoading, setIsLoading] = useState(false);

    async function getData({page, loadMore}) {
        setIsLoading(true);
        if (!loadMore) {
            setData([]);
        }
        const res = await ApiClient.getAll({
            query,
            page
        });
        if (res.status === 200) {
            setIsLoading(false);
            if (!loadMore) {
                setData(Object.values(res.data.contacts));
            } else {              
                setData(data.concat(Object.values(res.data.contacts)));
            }
        } else {
            setIsLoading(false);
            console.log(res);
        }
    }

    useEffect(() => {
        getData({
            page: 1,
            loadMore: false
        })
    }, [query])

    const handleSelectContact = (contact) => {
        setSelectedContact(contact)
        setShowC(true);
        handleShow(false)
    }

    const closeC = () => {
        setShowC(false)
        handleShow(true)
    }

    const loadMore = (page) => {
        console.log({page});
        getData({
            page,
            loadMore: true
        })
    }

    const close = () => {
        handleShow(false)
        window.history.replaceState({}, '', "/");
    }

    return (
        <>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>All Contacts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup style={{ marginBottom: 10 }}>
                        <Form.Control
                            placeholder="Search"
                            aria-label="Search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </InputGroup>
                        <Scrollbars style={{ height: 700 }}>
                            <InfiniteScroll
                                pageStart={1}
                                loadMore={loadMore}
                                initialLoad={false}
                                hasMore={true}
                                loader={isLoading ? <div className="loader" key={0}>Loading ...</div> : null}
                                useWindow={false}
                            >
                                {data.map(contact => 
                                    <ListGroup.Item
                                        key={contact.id}
                                        onClick={() => handleSelectContact(contact)}
                                        action
                                    >
                                        <Container>
                                        <Row>
                                            <Col>{contact.id}</Col>
                                            <Col>{contact.first_name ? contact.first_name : "-"}</Col>
                                            <Col>{contact.last_name ? contact.last_name : "-"}</Col>
                                            <Col>{contact.phone_number ?? "-"}</Col>
                                        </Row>
                                        </Container>
                                    </ListGroup.Item>
                                )}
                            </InfiniteScroll>
                        </Scrollbars>
                </Modal.Body>
                <Modal.Footer>
                    <Form.Check
                        label="Only even"
                    />
                    <Button id="buttonA">
                        All Contacts
                    </Button>
                    <Button id="buttonB" onClick={switchModal}>
                        US Contacts
                    </Button>
                    <Button onClick={close}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <ModalC data={selectedContact} show={showC} onClose={closeC} />
        </>
    )
}

export const ModalB = ({ show, handleShow, switchModal }) => {
    const [data, setData] = useState([]);
    const [showC, setShowC] = useState();
    const [query, setQuery] = useState();
    const [selectedContact, setSelectedContact] = useState();
    const [isLoading, setIsLoading] = useState(false);

    async function getData({page, loadMore}) {
        setIsLoading(true);
        if (!loadMore) {
            setData([]);
        }
        const res = await ApiClient.getUS({
            query,
            page
        });
        if (res.status === 200) {
            setIsLoading(false);
            if (!loadMore) {
                setData(Object.values(res.data.contacts));
            } else {              
                setData(data.concat(Object.values(res.data.contacts)));
            }
        } else {
            setIsLoading(false);
            console.log(res);
        }
    }

    useEffect(() => {
        getData({
            page: 1,
            loadMore: false
        })
    }, [query])

    const handleSelectContact = (contact) => {
        setSelectedContact(contact)
        setShowC(true);
        handleShow(false);
    }

    const closeC = () => {
        setShowC(false)
        handleShow(true)
    }

    const loadMore = (page) => {
        console.log({page});
        getData({
            page,
            loadMore: true
        })
    }

    const close = () => {
        handleShow(false)
        window.history.replaceState({}, '', "/");
    }

    return (
        <>
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>US Contacts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup style={{ marginBottom: 10 }}>
                        <Form.Control
                            placeholder="Search"
                            aria-label="Search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </InputGroup>
                        <Scrollbars style={{ height: 700 }}>
                            <InfiniteScroll
                                pageStart={1}
                                loadMore={loadMore}
                                initialLoad={false}
                                hasMore={true}
                                loader={isLoading ? <div className="loader" key={0}>Loading ...</div> : null}
                                useWindow={false}
                            >
                                {data.map(contact => 
                                    <ListGroup.Item
                                        key={`us${contact.id}`}
                                        onClick={() => handleSelectContact(contact)}
                                        action
                                    >
                                        <Container>
                                        <Row>
                                            <Col>{contact.id}</Col>
                                            <Col>{contact.first_name ? contact.first_name : "-"}</Col>
                                            <Col>{contact.last_name ? contact.last_name : "-"}</Col>
                                            <Col>{contact.phone_number ?? "-"}</Col>
                                        </Row>
                                        </Container>
                                    </ListGroup.Item>
                                )}
                            </InfiniteScroll>
                        </Scrollbars>
                </Modal.Body>
                <Modal.Footer>
                    <Form.Check
                        label="Only even"
                    />
                    <Button id="buttonA" onClick={switchModal}>
                        All Contacts
                    </Button>
                    <Button id="buttonB">
                        US Contacts
                    </Button>
                    <Button onClick={close}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <ModalC data={selectedContact} show={showC} onClose={closeC} />
        </>
    )
}

export const ModalC = ({ show, onClose, data }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <tbody>
                        <tr>
                            <td>First Name</td>
                            <td>{data?.first_name ? data?.first_name : "-"}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>{data?.last_name ? data.last_name : "-"}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{data?.address ? data.address : "-"}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{data?.email ? data.email : "-"}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{data?.phone_number ? data.phone_number : "-"}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
