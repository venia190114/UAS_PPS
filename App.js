import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Orders from './Orders';
import OrderDetail from './OrderDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="d-flex">
                    <Sidebar />
                    <div className="content flex-grow-1">
                        <Routes>
                            <Route exact path="/" element={<Orders />} />
                            <Route path="/orderdetail/:order_id" element={<OrderDetail />} />
                        </Routes>
                    </div>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
