"use client";
import Campaign from "@/ethereum/campaign";
import web3 from "@/ethereum/web3";
import { Button, Input } from "antd";
import { useParams } from "next/navigation";
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
interface ICreateRequestProps {}
type Inputs = {
  value: string;
  description: string;
  recipient: string;
  loading: boolean;
  errorMessage: string;
};
const CreateRequest: React.FunctionComponent<ICreateRequestProps> = (props) => {
  const { slug } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { description, value, recipient } = data;
    const campaign = Campaign(slug);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({ from: accounts[0] });
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <p className="text-2xl font-bold text-center">Create a Request</p>
      <form
        className="flex flex-col items-center justify-center gap-3 py-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* register your input into the hook by invoking the "register" function */}
        <div className="">
          <p className="my-2 font-bold">Description</p>
          <input
            placeholder="Write your description"
            className="p-3 border border-gray-500 rounded-xl"
            {...register("description")}
          />
        </div>
        <div>
          <p className="my-2 font-bold">Value in Ether</p>
          <input
            placeholder="Type your value"
            className="p-3 border border-gray-500 rounded-xl"
            {...register("value")}
          />
        </div>
        <div>
          <p className="my-2 font-bold">Recipient</p>
          <input
            placeholder="Address of Recipient"
            className="p-3 border border-gray-500 rounded-xl"
            {...register("recipient")}
          />
        </div>
        <button
          className="flex items-center justify-center px-4 py-2 my-5 font-bold text-white uppercase bg-blue-500 rounded hover:bg-blue-700"
          type="submit"
        >
          Create
        </button>
      </form>
    </>
  );
};

export default CreateRequest;
