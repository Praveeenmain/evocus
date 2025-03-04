import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Tab, Nav, ListGroup } from 'react-bootstrap';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { getAuth, signOut } from "firebase/auth";
import Header from '../Header';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '123-456-7890',
    photo: '',
    address: '123 Main St, City, Country',
    orders: ['Order #1 - Delivered', 'Order #2 - Shipped'],
    previousOrders: ['Order #3 - Completed', 'Order #4 - Completed']
  });

  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    if (currentUser) {
      setUser({
        name: currentUser.displayName || 'User',
        email: currentUser.email || 'No Email',
        photo: currentUser.photoURL || '',
        address: '123 Main St, City, Country',
        orders: ['Order #1 - Delivered', 'Order #2 - Shipped'],
        previousOrders: ['Order #3 - Completed', 'Order #4 - Completed']
      });
    }
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("User signed out");
    }).catch((error) => {
      console.error("Logout Error:", error);
    });
  };

  return (
    <div>
    <Header/>
    <Container className="mt-4">
     
      <Row>
        <Col md={3}>
          <Card className="text-center shadow p-3 bg-dark text-white">
            {user.photo ? (
              <img src={user.photo} alt="Profile" className="rounded-circle mx-auto" width={80} height={80} />
            ) : (
              <FaUserCircle size={80} className="mx-auto text-light" />
            )}
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>{user.email}</Card.Text>
              <Button variant="warning" size="sm">
                <FaEdit /> Edit Profile
              </Button>
           
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
            <Nav variant="tabs" className="bg-dark">
              <Nav.Item>
                <Nav.Link eventKey="profile" className={`text-white ${activeTab === 'profile' ? 'bg-primary' : ''}`}>
                  Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="address" className={`text-white ${activeTab === 'address' ? 'bg-primary' : ''}`}>
                  Address
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="orders" className={`text-white ${activeTab === 'orders' ? 'bg-primary' : ''}`}>
                  Orders
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="previousOrders" className={`text-white ${activeTab === 'previousOrders' ? 'bg-primary' : ''}`}>
                  Previous Orders
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content className="p-3 bg-dark text-white">
              <Tab.Pane eventKey="profile">
                <h5>Personal Information</h5>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </Tab.Pane>

              <Tab.Pane eventKey="address">
                <h5>Address</h5>
                <p><strong>Home Address:</strong> {user.address}</p>
              </Tab.Pane>

              <Tab.Pane eventKey="orders">
                <h5>Orders</h5>
                <ListGroup>
                  {user.orders.map((order, index) => (
                    <ListGroup.Item key={index} className="bg-dark text-white border-light">
                      {order}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab.Pane>

              <Tab.Pane eventKey="previousOrders">
                <h5>Previous Orders</h5>
                <ListGroup>
                  {user.previousOrders.map((order, index) => (
                    <ListGroup.Item key={index} className="bg-dark text-white border-light">
                      {order}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Profile;
