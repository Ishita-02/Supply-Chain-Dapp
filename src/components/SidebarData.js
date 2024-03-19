import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as FiIcons from 'react-icons/fi';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'side-text'
  },
  {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus />,
    cName: 'side-text'
  },
  {
    title: 'Track',
    path: '/journey',
    icon: <FaIcons.FaMapMarkedAlt/>,
    cName: 'side-text'
  },
  {
    title: 'Metrics Input',
    path: '/assessments',
    icon: <FiIcons.FiFileText />,
    cName: 'side-text'
  },
  {
    title: 'Analytics',
    path: '/Reports',
    icon: <MdIcons.MdAssessment />,
    cName: 'side-text'
  },
  
];