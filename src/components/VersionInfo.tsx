import React from 'react';
import { VERSION } from '../data/version';
import '../styles/VersionInfo.css';

const VersionInfo: React.FC = () => {
  return (
    <div className="version-info">
      <span>v{VERSION}</span>
    </div>
  );
};

export default VersionInfo; 