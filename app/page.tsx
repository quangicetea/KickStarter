"use client";
import { useEffect, useState } from "react";
import factory from "../ethereum/factory";
import { GetServerSideProps, NextPageContext } from "next";
import campaign from "@/ethereum/campaign";
import { CampaignCard } from "@/common/components/CampaignCard";
import Link from "next/link";
import { Row } from "antd";

export default function Home() {
  const [campaigns, setCampaigns] = useState<any>();
  useEffect(() => {
    const getCampaign = async () => {
      const campaigns = await factory.methods.getDeployedCampaigns().call();
      setCampaigns(campaigns);
    };
    getCampaign();
  }, []);
  return (
    <>
    <Row gutter={16}>
      {Array.isArray(campaigns) &&
        (campaigns as any[]).map((x: string, index: number) => {
          return <CampaignCard address={x} key={index} />;
        })}
    </Row>

      <Link href={`/campaigns/new`}>Create Campaign</Link>
    </>
  );
}
