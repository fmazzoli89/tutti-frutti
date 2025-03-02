import React from 'react';
import { FORMATTED_DATE } from '../data/version';
import '../styles/VersionInfo.css';

const VersionInfo: React.FC = () => {
  return (
    <div className="version-info">
      <span>Actualizado: {FORMATTED_DATE}</span>
    </div>
  );
};

export default VersionInfo; 