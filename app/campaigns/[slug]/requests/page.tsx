"use client";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import * as React from "react";
import ContributeForm from "@/common/components/ContributeForm";

interface IRequestsProps {}

const Requests: React.FunctionComponent<IRequestsProps> = (props) => {
  const { slug } = useParams();

  return (
    <>
      <p>List Requests: {slug}</p>
    </>
  );
};

export default Requests;
