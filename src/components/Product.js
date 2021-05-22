import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const dispatch = useDispatch();
  const [rating] = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
  const [hasPrime] = useState(Math.random() < 0.5);

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating,
    };
    // Send the product as an action to the REDUX store ... the basket slice
    dispatch(addToBasket(product));
    toast.warning(
      <>
        <span className="font-bold text-gray-600">&#10004; Added to basket!</span>
        <br />
        <p className="text-amazon_blue-light">
          {product.title.slice(0, 30)}
          {product.title.length > 30 ? "…" : ""}
        </p>
      </>,
      {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 20,
        progress: undefined,
      }
    );
  };
  // className="transform transition duration-500 hover:scale-105"
  return (
    <Fade bottom>
      <div className="relative flex flex-col m-5 bg-white z-30 p-10 ">
        <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
        <Image
          src={image}
          height={200}
          width={200}
          objectFit="contain"
          className="hover:opacity-50"
        />
        <h4 className="my-3">{title}</h4>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => {
              return <StarIcon className="h-5 text-yellow-500" key={i} />;
            })}
        </div>
        <p className="text-xs my-2 line-clamp-2">{description}</p>
        <div className="mb-5">
          <Currency quantity={price} currency="GBP" />
        </div>

        {hasPrime && (
          <div className="flex items-center space-x-2 -mt-5">
            <img className="w-12" src="https://links.papareact.com/fdw" alt="" />
            <p className="text-xs">FREE Next-day Delivery</p>
          </div>
        )}
        <button onClick={addItemToBasket} className="button mt-auto">
          Add to Basket
        </button>
      </div>
    </Fade>
  );
}

export default Product;
