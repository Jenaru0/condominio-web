import React from 'react';
import { Link } from 'react-router-dom';
import './InfoCard.css';

const InfoCard = ({ icon, title, subtitle, linkText, linkPath }) => {
    return (
        <div className="info-card">
            <div className="info-card-header">
                <i className={`fas ${icon} info-card-icon`}></i>
            </div>
            <div className="info-card-body">
                <h3 className="info-card-title">{title}</h3>
                <p className="info-card-subtitle">{subtitle}</p>
                <Link to={linkPath} className="info-card-link">
                    {linkText}
                </Link>
            </div>
        </div>
    );
};

export default InfoCard;
