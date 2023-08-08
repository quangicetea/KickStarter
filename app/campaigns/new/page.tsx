"use client";
import { Button, Input } from "antd";
import { useState } from "react";
import factory from "@/ethereum/factory";
import web3 from "@/ethereum/web3";

export default function CreateCampaign() {
  const [value, setValue] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const createCampaign = async () => {
    try {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(value).send({
        from: accounts[0],
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      <h3 className="text-2xl font-bold text-center">Create Campaign</h3>
      <div className="flex justify-center">
        <div className="">
          <p className="my-2 font-bold">Minimum contribution</p>
          <div className="">
            <Input
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <Button
          onClick={(e) => {
            e.preventDefault();
            createCampaign();
          }}
        >
          Create
        </Button>
      </div>
    </>
  );
}
