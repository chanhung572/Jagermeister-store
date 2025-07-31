import React from 'react';
import drinkImage from '../../img/drink.jpg';

const MainContent = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100vh', paddingBottom: '90px' }}>
            <a href={drinkImage} target="_blank" rel="noopener noreferrer">
                <img 
                    src={drinkImage} 
                    alt="Drink" 
                    style={{ width: '700px', height: 'auto'}}
                />
            </a>
        </div>
    );
};

export default MainContent;