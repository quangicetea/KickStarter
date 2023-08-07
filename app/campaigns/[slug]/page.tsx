"use client";
import { CampaignDetailCard } from "@/common/components/CapaignDetailCard";
import ContributeForm from "@/common/components/ContributeForm";
import Campaign from "@/ethereum/campaign";
import { Button } from "antd";
import { useParams } from "next/navigation";
import React from "react";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  const { slug } = useParams();
  const [items, setItems] = React.useState<any[]>([]);
  React.useEffect(() => {
    const getData = async () => {
      try {
        const campaign = Campaign(slug);
        const summary = await campaign.methods.getSummary().call();
        setItems([
          {
            header: summary[4],
            meta: "Address of Manager",
            description:
              "The manager created this campaign and can create requests to withdraw money",
            style: { overflowWrap: "break-word" },
          },
          {
            header: summary[0],
            meta: "Minimum Contribution (wei)",
            description:
              "You must contribute at least this much wei to become an approver",
          },
          {
            header: summary[2],
            meta: "Number of Requests",
            description:
              "A request tries to withdraw money from the contract. Requests must be approved by approvers",
          },
          {
            header: summary[3],
            meta: "Number of Approvers",
            description:
              "Number of people who have already donated to this campaign",
          },
          {
            //   header: web3.utils.fromWei(balance, "ether"),
            header: summary[1],
            meta: "Campaign Balance (ether)",
            description:
              "The balance is how much money this campaign has left to spend.",
          },
        ]);
      } catch (error) {
        console.log("loi ne");
      }
    };
    getData();
  }, []);
  console.log(items);
  return (
    <>
      <h3>Campaign Show</h3>
      <div className="">
        {/* <CampaignDetailCard address={router.slug} /> */}
        <ContributeForm address={slug as string} />
      </div>
      <Button>View request</Button>
    </>
  );
}
