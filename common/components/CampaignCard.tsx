import * as React from "react";
import { Card, Col, Row } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
export interface ICampaignCardProps {
  address: string;
}

export function CampaignCard({ address }: ICampaignCardProps) {
  return (
    // <Row gutter={16}>
    <Col span={8}>
      <Card title={address} bordered={false}>
        <Link href={`/campaigns/${address}`}>View Campaign</Link>
      </Card>
    </Col>
    // </Row>
  );
}
