import { motion } from 'framer-motion';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import bgimg from '../../../public/logo.png';
import NavItemImg from './NavItem';

function Navbar() {
  const location = useLocation();

  const isTabActive = (path: string) => {
    return location.pathname === path;
  };
  return (
    <div className="font-montserrat">

