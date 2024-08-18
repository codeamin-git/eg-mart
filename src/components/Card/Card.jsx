import React from 'react';

const Card = ({image,name,price,category,brand,date}) => {
    return (
        <div className='shadow-md shadow-yellow-200 p-5'>
      <div className='size-36 md:size-48 lg:size-60 cursor-pointer hover:scale-110 mx-auto'>
        <img src={image} alt="Product" />
      </div>
        <h3 className='md:text-lg lg:text-xl font-semibold text-red-500 text-center'>{name}</h3>
        <p className='md:text-lg lg:text-xl font-medium flex items-center justify-center'>{price}<span className='font-bold'></span></p>
        <p className="md:text-lg lg:text-xl text-center">Category : {category} </p>
        <p className="md:text-lg lg:text-xl text-center">Brand : {brand}</p>
        <p className="mt-8 text-xs text-end">Updated On : {date}</p>
        
    </div>
    );
};

export default Card;