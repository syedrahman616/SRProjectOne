import React from "react";
// import Img1 from "../../assets/women/women.png";
// import Img2 from "../../assets/women/women2.jpg";
// import Img3 from "../../assets/women/women3.jpg";
// import Img4 from "../../assets/women/women4.jpg";
import Img5 from "../../assets/women/img4.jpg";
import Img6 from "../../assets/women/img5.jpg";
import Img7 from "../../assets/women/img6.jpg";
import Img8 from "../../assets/women/imge2.jpg";


import { FaStar } from "react-icons/fa6";

const ProductsData = [
  {
    id: 1,
    img: Img5,
    title: "Cooking Plumbing",
    rating: 5.0,
    color: "white",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img6,
    title: "Bathroom Plumbing",
    rating: 5.0,
    color: "white",
    aosDelay: "0",
  },
  {
    id: 3,
    img: Img7,
    title: "Basement Plumbing",
    rating: 5.0,
    color: "white",
    aosDelay: "0",
  },
  {
    id: 3,
    img: Img8,
    title: "Bathroom Plumbing",
    rating: 5.0,
    color: "white",
    aosDelay: "0",
  },
    
 
];

const Products = () => {
  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-4xl text-primary">
            Plumbing
          </p>
          <h1 data-aos="fade-up" className="text-3xl  text-dark font-bold">
            Details
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 place-items-center gap-4 text-dark">
            {/* card section */}
            {ProductsData.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="space-y-3"
              >
                <img
                  src={data.img}
                  alt=""
                  className="h-[220px]  object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.color}</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{data.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* view all button */}
          <div className="flex justify-center">
            <button className="text-center mt-10 cursor-pointer bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white rounded-full py-1 px-5 rounded-md">
              View All Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
