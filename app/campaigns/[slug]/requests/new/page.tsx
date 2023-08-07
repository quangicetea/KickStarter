"use client";
import Campaign from "@/ethereum/campaign";
import web3 from "@/ethereum/web3";
import { Button, Input } from "antd";
import { useParams } from "next/navigation";
import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
    } catch (error) {
      console.log("dit me m loi");
    }
  };
  return (
    <>
      <p>Create a Request</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div>
          <label>Description</label>
          <input
            className="border p-3 rounded-xl border-gray-500 mx-5"
            {...register("description")}
          />
        </div>
        <div>
          <label>Value in Ether</label>
          <input
            className="border p-3 rounded-xl border-gray-500 m-5"
            {...register("value")}
          />
        </div>
        <div>
          <label>Recipient</label>
          <input
            className="border p-3 rounded-xl border-gray-500 mx-5"
            {...register("recipient")}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateRequest;
