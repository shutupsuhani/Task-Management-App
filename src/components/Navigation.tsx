"use client"; // Ensure this is the first line in the file

import React, { useState } from 'react';
import { UserButton } from '@clerk/nextjs';



const Navigation = () => {
   

  return (
    <div className="bg-primary text-white shadow-md sticky top-0 z-50" >
      <div className="flex items-center justify-between p-4">
        
        <div className='flex'>
        <p className=" text-lg font-bold">Efficio⚡</p>
       
        </div>
       
        
        <div className="flex items-center space-x-4">
         <UserButton/> 
            
        </div>
      </div>
    </div>
  );
};

export default Navigation;
