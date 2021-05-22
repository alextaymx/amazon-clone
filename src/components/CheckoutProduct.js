import { StarIcon, MinusSmIcon, PlusIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({ item, quantity }) {
  const { id, title, price, rating, description, category, image, hasPrime } = item;
  const totalPrice = price * quantity;
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    const product = {
      ...item,
    };
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    //   Remove item from redux
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      {/* Middle */}
      <div className="col-span-3 mx-5">
        <p className="">{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>

        <div className="mb-5">
          {quantity} x <Currency quantity={price} currency="GBP" /> ={" "}
          <span className="font-bold">
            <Currency quantity={totalPrice} currency="GBP" />
          </span>
        </div>
        {hasPrime && (
          <div className="flex items-center space-x-2 -mt-5">
            <img loading="lazy" className="w-12" src="https://links.papareact.com/fdw" alt="" />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      {/* Right add/remove buttons */}

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <div className="flex flex-row space-x-5">
          <button className="button p-1" onClick={removeItemFromBasket}>
            <MinusSmIcon className="h-5 text-black" />
          </button>
          <div className="p-2 whitespace-normal sm:p-1 sm:whitespace-nowrap">
            <span className="font-bold">{quantity}</span>
          </div>
          <button className="button sm:p-1" onClick={addItemToBasket}>
            <PlusIcon className="h-5 text-black" />
          </button>
        </div>
        {/* <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          Remove from Basket
        </button> */}
      </div>
    </div>
  );
}

export default CheckoutProduct;
