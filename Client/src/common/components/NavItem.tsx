import React from 'react';

interface NavItemProps {
  to: string;
  isActive: boolean;
  onClick: (to: string) => void;
  img: string; // assuming img is a string representing the image source
}

const NavItemImg: React.FC<NavItemProps> = ({ to, isActive, onClick, img }) => {
  return (
    <div className={isActive ? 'active' : ''} onClick={() => onClick(to)}>
      <img src={img} alt="" className="h-20 pt-6 pl-3" />
    </div>
  );
};

export default NavItemImg;