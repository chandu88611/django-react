import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import axios from "axios";
import BillingDetails_Form from "./BillingDetails_Form";
import { AiFillCloseCircle } from "react-icons/ai";

function AddAddress({ setProceed, proceed, setISShipping }) {
  const user = useSelector((state) => state.users.user);
  const [data, setData] = useState("");
  const [id, setId] = useState();
  const [disable, setDisable] = useState(false);
  const validationSchema = Yup.object().shape({
    country: Yup.string(),
    streetAddress: Yup.string().required("Street address is required"),
    apartment: Yup.string(),
    city: Yup.string().required("Town / City is required"),
    state: Yup.string(),
    postcode: Yup.string(),
    orderNotes: Yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      city: user?.primary_address[0]?.city || "",
      state: user?.primary_address[0]?.state || "",
      country: user?.primary_address[0]?.country || "",
      streetAddress: user?.primary_address[0]?.add_1 || "",
      apartment: user?.primary_address[0]?.add_2 || "",
      postcode: user?.primary_address[0]?.zip || "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const [primary, setPrimary] = useState("secondary0");
  const [change, setChange] = useState(false);
  console.warn(user);

  const updatePrimaryAddress = async (id) => {
    const token = localStorage.getItem("tmToken");
    // dispatch(setLoader(true));
    try {
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/lead/make-primary-address",
        {
          address_id: id,
        },
        {
          headers: {
            "access-token": token,
          },
        }
      );
      console.log(response);
      if (response.data.status) {
        window.location.reload();
      }
      console.log(response);
    } catch (error) {
      //   dispatch(setLoader(false));
    }
  };
  const { country, streetAddress, city, state, postcode } = getValues();
  useEffect(() => {
    if (country && streetAddress && city && !state && postcode) {
      setDisable(false);
    }
  }, [country, streetAddress, city, state, postcode]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="tp-checkout-bill-inner">
          <div className="row">
            <div className="flex">
              <div className="w-1/2">
                <div className="tp-checkout-input">
                  <label>First Name</label>
                  <p>{user?.first_name} </p>
                </div>
              </div>
              <div className="">
                <div className="tp-checkout-input">
                  <label>Last Name</label>
                  <p>{user?.last_name} </p>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2">
                <div className="tp-checkout-input">
                  <label>Phone</label>
                  <p>{user?.phone} </p>
                </div>
              </div>
              <div className="">
                <div className="tp-checkout-input">
                  <label>Email </label>
                  <p>{user?.email} </p>
                </div>
              </div>
            </div>

            <hr className="py-2" />
            <h3 class="tp-checkout-bill-title">
              Billing Details{" "}
              {!user?.primary_address[0] && (
                <span className="text-red-500 ">"!"</span>
              )}
            </h3>
            {user?.primary_address.length < 1 && (
              <button
                className="bg-orange-600 py-2 text-sm text-white  w-1/2 md:w-1/3  xl:1/4 2xl:w-1/5 ml-7 mt-1"
                onClick={() => setDisable(!disable)}
              >
                Add New Address
              </button>
            )}
            {user?.primary_address[0] ? (
              <>
                <div className="flex">
                  <div className="w-1/2">
                    <div className="tp-checkout-input">
                      <label> City</label>
                      <p>{user?.primary_address[0]?.city} </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tp-checkout-input">
                      <label>State </label>
                      <p>{user?.primary_address[0]?.state} </p>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2">
                    <div className="tp-checkout-input">
                      <label>Country </label>
                      <p>{user?.primary_address[0]?.country} </p>
                    </div>
                  </div>
                  <div className="">
                    <div className="tp-checkout-input">
                      <label>Address line 1</label>
                      <p>{user?.primary_address[0]?.add_1} </p>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {user?.primary_address[0]?.add_2 && (
                    <div className="w-1/2 ">
                      <label className="w-1/2 font-bold">Address line 2</label>
                      <p>{user?.primary_address[0]?.add_2} </p>
                    </div>
                  )}
                  <div className="col-md-6">
                    <div className="tp-checkout-input">
                      <label>Postcode ZIP</label>
                      <p>{user?.primary_address[0]?.zip} </p>
                    </div>
                  </div>
                </div>

                <div className="">
                  {
                    <button
                      className="bg-orange-600 py-2 text-md text-white w-1/2 md:w-1/3 xl:1/4 2xl:w-1/5"
                      onClick={() => {
                        setDisable(!disable);
                        setData(user?.primary_address[0]);
                      }}
                    >
                      Edit Billing Address
                    </button>
                  }
                  <hr className="my-4" />

                  <div className=" text-xl font-medium mt-3 flex items-center gap-2">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      value={change}
                      onClick={() => {
                        setChange(!change);
                        setPrimary();
                      }}
                      className="h-6 cursor-pointer"
                    />{" "}
                    Ship to a different address?
                  </div>
                </div>
                {change && (
                  <>
                    <span className=" text-xs md:text-sm text-red-400 p-1 ml-2">
                      (you can add different shipping address.if you are not
                      selected/Added any other Address ,Billing Address Will be
                      the Shipping Address)
                    </span>
                    <div className="flex flex-wrap gap-x-8 m-2">
                      {user?.address && (
                        <>
                          {user?.address
                            .filter((data) => data.status !== "1")
                            .map((data, i) => (
                              <div
                                className=" capitalize text-xl width_anim"
                                key={i}
                              >
                                <input
                                  type="radio"
                                  checked={primary === `secondary${i}`}
                                  className="mr-1 cursor-pointer"
                                  onClick={() => {
                                    setPrimary(`secondary${i}`);
                                    setData(data);
                                    setISShipping(data.id);
                                  }}
                                />{" "}
                                {data?.add_1}
                                <br />
                                <p className="pl-5">
                                  {" "}
                                  {data?.city} {data?.state}
                                  <br />
                                  {data?.country} - {data?.zip}
                                  <br />
                                  <br />
                                </p>
                              </div>
                            ))}
                        </>
                      )}{" "}
                    </div>
                    {
                      <button
                        className="bg-orange-600 py-2 text-sm text-white  w-1/2 md:w-1/3  xl:1/4 2xl:w-1/5 ml-7 mt-1"
                        onClick={() => setDisable(!disable)}
                      >
                        Add New Address
                      </button>
                    }
                  </>
                )}
              </>
            ) : (
              <div> </div>
            )}

            {disable && (
              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full m-1 md:w-[35vw] lg:[25vw] z-40 p-4 shadow-2xl fadein">
                {" "}
                <AiFillCloseCircle
                  className="text-xl text-red-300 cursor-pointer"
                  onClick={() => {
                    setDisable(false);
                    window.location.reload();
                  }}
                />{" "}
                <BillingDetails_Form data={data} />
              </div>
            )}

            <div className=" mt-2">
              <div className="tp-checkout-input">
                <hr className="mt-4 mb-4" />
                <label>Order notes (optional)</label>
                <textarea
                  placeholder="Notes about your order, e.g. special notes for delivery."
                  {...register("orderNotes")}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAddress;
