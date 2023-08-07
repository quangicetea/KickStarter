import * as React from "react";
import { Card } from "antd";
import { useParams } from "next/navigation";
import web3 from "@/ethereum/web3";
import Campaign from "@/ethereum/campaign";
export interface ICampaignDetailCardProps {
  balance: number;
  minimumContribution: number;
  requestsCount: number;
  contributors: number;
  manager: string;
  approversCount: number;
  address: string;
}

export function CampaignDetailCard({
  balance,
  manager,
  minimumContribution,
  requestsCount,
  approversCount,
  address,
}: ICampaignDetailCardProps) {
  const [data, setData] = React.useState<any>({});
  React.useEffect(() => {
    const getData = async () => {
      const campaign = Campaign(address);
      const summary = await campaign.methods.getSummary().call();
      setData(summary);
    };
    getData()
  }, []);
  console.log(data);

  const items = [
    {
      header: manager,
      meta: "Address of Manager",
      description:
        "The manager created this campaign and can create requests to withdraw money",
      style: { overflowWrap: "break-word" },
    },
    {
      header: minimumContribution,
      meta: "Minimum Contribution (wei)",
      description:
        "You must contribute at least this much wei to become an approver",
    },
    {
      header: requestsCount,
      meta: "Number of Requests",
      description:
        "A request tries to withdraw money from the contract. Requests must be approved by approvers",
    },
    {
      header: approversCount,
      meta: "Number of Approvers",
      description: "Number of people who have already donated to this campaign",
    },
    {
      //   header: web3.utils.fromWei(balance, "ether"),
      header: balance,
      meta: "Campaign Balance (ether)",
      description:
        "The balance is how much money this campaign has left to spend.",
    },
  ];
  return (
    <>
      DetailCard
      {/* <Card title={campaignBalance} bordered={false} style={{ width: 300 }}>
        <p>Campaign Balance</p>
      </Card>
      <Card title={minimumContribution} bordered={false} style={{ width: 300 }}>
        <p>Minimum Contribution</p>
      </Card>
      <Card title={pendingRequest} bordered={false} style={{ width: 300 }}>
        <p>Pending Request</p>
      </Card>
      <Card title={contributors} bordered={false} style={{ width: 300 }}>
        <p>Contributors</p>
      </Card> */}
    </>
  );
}
