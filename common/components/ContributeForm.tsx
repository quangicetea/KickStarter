import Campaign from "@/ethereum/campaign";
import web3 from "@/ethereum/web3";
import { Button, Input } from "antd";
import * as React from "react";
import { ToastContainer, toast } from "react-toastify";

interface IContributeFormProps {
  address: string;
}

const ContributeForm: React.FunctionComponent<IContributeFormProps> = ({
  address,
}) => {
  const [value, setValue] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const contribute = async () => {
    const campaign = Campaign(address);
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="flex justify-center">
      <div className="">
        <label className="font-bold">Amount to Contribute</label>
        <Input
          placeholder="Amount (wei)"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <div className="flex justify-center my-5 ">
          <Button
            className="font-bold bg-orange-300"
            type="default"
            onClick={(e) => {
              e.preventDefault();
              contribute();
            }}
          >
            Contribute
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContributeForm;
