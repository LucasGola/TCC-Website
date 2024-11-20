// src/pages/Home/Home.jsx
import React from 'react';
import Header from '../../components/Header/Header';
import PlantList from '../../components/PlantList/PlantList';
import '../../styles.css';

const Home = () => {
    return (
        <>
            <Header />
            <main style={{ width: '100%', display: 'flex', }}>
                <PlantList />
            </main>
        </>
    );
};

export default Home;
