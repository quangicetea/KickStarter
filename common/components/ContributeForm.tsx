import Campaign from "@/ethereum/campaign";
import web3 from "@/ethereum/web3";
import { Button, Input } from "antd";
import * as React from "react";

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
      console.log(accounts);
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
    } catch (error) {
      console.log("loi ne");
    }
    setLoading(false);
  };
  return (
    <>
      <label>Amount to Contribute</label>
      <Input value={value} onChange={(event) => setValue(event.target.value)} />
      <Button
        onClick={(e) => {
          e.preventDefault();
          contribute();
        }}
      >
        Contribute
      </Button>
    </>
  );
};

export default ContributeForm;
