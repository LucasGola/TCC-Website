// src/pages/Home/Home.jsx
import React from 'react';
import Header from '../../components/Header/Header';
import PlantList from '../../components/PlantList/PlantList';
import '../../styles.css';

const Home = () => {
    return (
        <div>
            <Header />
            <PlantList />
        </div>
    );
};

export default Home;
