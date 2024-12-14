import React from 'react';
import Header from './Header';
import Navbar from './Navbar'; // Change Sidebar to Navbar
import Footer from './Footer';
import OrderDetail from './OrderDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Navbar /> {/* Updated Sidebar to Navbar */}
                <div className="content flex-grow-1">
                    <Routes>
                        <Route path="/orderdetail/:order_id" element={<OrderDetail/>} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
