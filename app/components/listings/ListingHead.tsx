"use client";

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";
import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/Button";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  user?: SafeUser;
  currentUser?: SafeUser | null;
  contact?: string;
}

const ListingHead: React.FC<ListingHeadProps> = (props) => {
  const { title, locationValue, imageSrc, id, currentUser, user, contact } =
    props;
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <div className="w-full flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 aspect-[16/6]">
      <div className="w-full aspect-video md:w-[70%] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
      <div className="w-full md:w-[30%] border rounded-lg flex md:flex-col justify-center items-center md:space-y-12 p-2 md:p-0">
        <div className="flex w-44 flex-col justify-center items-center">
          <Avatar src={user?.image} variant="large" />
          <div className="text-xl font-bold mt-3">{user?.name}</div>
        </div>
        <div className="w-full px-6 space-y-4">
          <Button
            small
            label={contact || ""}
            onClick={() => {}}
            className="py-2.5 font-semibold"
          />
          <Button
            small
            outline
            label="Liên hệ bằng zalo"
            onClick={() => {}}
            className="py-2.5 font-semibold border-rose-600"
          />
        </div>
      </div>
    </div>
  );
};

export default ListingHead;
