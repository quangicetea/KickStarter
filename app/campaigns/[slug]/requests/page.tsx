"use client";
import Campaign from "@/ethereum/campaign";
import web3 from "@/ethereum/web3";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as React from "react";
interface IRequestsProps {}

const Requests: React.FunctionComponent<IRequestsProps> = (props) => {
  const { slug } = useParams();
  const campaign = Campaign(slug);
  const [requests, setRequests] = React.useState<any>();
  React.useEffect(() => {
    const fetchRequest = async () => {
      const requestCount = await campaign.methods.getRequestsCount().call();
      const approversCount = await campaign.methods.approversCount().call();
      const requests = await Promise.all(
        Array(parseInt(requestCount))
          .fill()
          .map((element: any, index: any) => {
            return campaign.methods.requests(index).call();
          })
      );
      let result = requests.map((x: any, index: number) => {
        return {
          ...x,
          id: index,
          requestCount: Number(requestCount),
        };
      });
      setRequests(result);
      console.log(result);
    };
    fetchRequest();
  }, []);
  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "value",
      key: "value",
      // render: (text) => <p>{web3.utils.fromWei(text, "ether")}</p>,
      render: (text) => <p>{Number(text)}</p>,
    },
    {
      title: "Recipient",
      dataIndex: "recipient",
      key: "recipient",
    },
    {
      title: "Approval Count",
      dataIndex: "approvalCount",
      key: "approvalCount",
      render: (text, record) => (
        <p>
          {Number(text)}/{record.requestCount}
        </p>
      ),
    },
    {
      title: "Approve",
      dataIndex: "approve",
      key: "approve",
      render: (value, record) => (
        <>
          <Button
            className="font-bold text-green-500"
            onClick={(e) => console.log(record.id)}
          >
            Approve
          </Button>
        </>
      ),
    },
    {
      title: "Finalize",
      dataIndex: "finalize",
      key: "finalize",
      render: (value, record) => (
        <>
          <Button
            className="font-bold text-cyan-500"
            onClick={(e) => console.log(record.id)}
          >
            Finalize
          </Button>
        </>
      ),
    },
  ];
  return (
    <>
      <p>List Requests: {slug}</p>
      <Table columns={columns} dataSource={requests} />;
      <Link
        href={`/campaigns/${slug}/requests/new`}
        className="flex items-center justify-center px-4 py-2 my-5 font-bold text-white uppercase bg-blue-500 rounded hover:bg-blue-700"
        type="default"
      >
        Add new request
      </Link>
    </>
  );
};

export default Requests;
