import { useSession } from "next-auth/client";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useSelector } from "react-redux";
import CheckoutProduct, { CheckoutProductWithReveal } from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";

import TransitionGroup from "react-transition-group/TransitionGroup";
import { groupBy } from "lodash";

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const [session] = useSession();
  const groupedItems = Object.values(groupBy(items, "id"));

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="lg:flex max-w-screen-2xl ">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <div className="w-full m-5 flex justify-center">
            <Image
              src="https://links.papareact.com/ikj"
              height={250}
              width={1020}
              objectFit="contain"
            />
          </div>

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your Basket is empty" : "Shopping Basket"}
            </h1>
            <TransitionGroup
              {...{
                appear: true,
                enter: true,
                exit: true,
              }}
              className="flex flex-col p-5 space-y-10 "
            >
              {groupedItems.map((group, i) => (
                // <Fade key={i} collapse bottom className="flex flex-wrap">
                <CheckoutProduct key={i} item={group[0]} quantity={group.length} />
                // </Fade>
              ))}
            </TransitionGroup>
          </div>
        </div>

        {/* Right */}

        {items.length > 0 && (
          <div className="flex flex-col bg-white p-10 shadow-md">
            <h2 className="whitespace-nowrap">
              Subtotal ({items.length}) items:{" "}
              <span className="font-bold">
                <Currency quantity={total} currency="GBP" />
              </span>
            </h2>
            <button
              className={`button mt-2 ${
                !session &&
                "from-gray-300 to-gray-200 border-gray-200 text-gray-400 cursor-not-allowed outline-none focus:ring-0 active:bg-none"
              }`}
            >
              {!session ? "Sign in to checkout" : "Proceed to checkout"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;
