"use client";
import { CampaignDetailCard } from "@/common/components/CapaignDetailCard";
import ContributeForm from "@/common/components/ContributeForm";
import Campaign from "@/ethereum/campaign";
import { Button } from "antd";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  const router = useRouter();
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
            header: Number(summary[0]),
            meta: "Minimum Contribution (wei)",
            description:
              "You must contribute at least this much wei to become an approver",
          },
          {
            header: Number(summary[2]),
            meta: "Number of Requests",
            description:
              "A request tries to withdraw money from the contract. Requests must be approved by approvers",
          },
          {
            header: Number(summary[3]),
            meta: "Number of Approvers",
            description:
              "Number of people who have already donated to this campaign",
          },
          {
            //   header: web3.utils.fromWei(balance, "ether"),
            header: Number(summary[1]),
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
      <h3 className="my-5 text-3xl font-bold text-center uppercase">
        Campaign Show
      </h3>
      <div className="flex flex-row gap-5 ">
        <div className="">
          {items.map((x: any, index: number) => (
            <>
              <div className="p-3 m-3 border rounded-lg">
                <p className="text-xl font-bold">{x.header}</p>
                <p className="my-2 text-gray-500">{x.meta}</p>
                <p>{x.description}</p>
              </div>
            </>
          ))}
        </div>
        <ContributeForm address={slug as string} />
      </div>
      <div className="flex justify-center">
        <Link
          href={`${slug}/requests`}
          className="flex items-center justify-center px-4 py-2 my-5 font-bold text-white uppercase bg-blue-500 rounded hover:bg-blue-700"
          type="default"
        >
          View request
        </Link>
      </div>
    </>
  );
}
