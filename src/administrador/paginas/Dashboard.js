import React from 'react';
import InfoCard from '../componentes/InfoCard';
import { dashboardCards } from '../config/dashboardData';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h2>Buenos días, [Usuario]</h2>
            <div className="dashboard-grid">
                {dashboardCards.map((card) => (
                    <InfoCard
                        key={card.id}
                        icon={card.icon}
                        title={card.title}
                        subtitle={card.subtitle}
                        linkText={card.linkText}
                        linkPath={card.linkPath}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
