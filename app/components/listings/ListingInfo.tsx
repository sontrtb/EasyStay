"use client";

import { IconType } from "react-icons";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import React from "react";
import { House2, Location } from "iconsax-react";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
  roomArea: number;
  phoneContact: string;
  address: string;
  title: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  roomCount,
  bathroomCount,
  category,
  locationValue,
  title,
  roomArea,
  address,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  console.log(category);
  return (
    <div className="col-span-4 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="px-4 py-1 rounded-full bg-rose-600 text-white text-sm text-center w-fit">
          {location?.label}
        </div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <div className="space-y-1">
          <div className="font-semibold flex items-center space-x-2">
            <House2 size={16} />
            <p>{category?.label}</p>
          </div>
          <div className="flex items-center space-x-2 font-light">
            <Location size={16} />
            <p>{address}</p>
          </div>
        </div>
      </div>
      <hr />
      <div
        className="
            flex 
            flex-row
            justify-between
            items-center
            font-semibold
            text-neutral-500
          "
      >
        <div className="space-y-2">
          <p>Diện tích</p>
          <p className="text-2xl text-black">{roomArea}m2</p>
        </div>
        <div>
          <p>Số phòng</p>
          <p className="text-2xl text-black">{roomCount}</p>
        </div>
        <div>
          <p>Số người</p>
          <p className="text-2xl text-black">{roomCount * 2}</p>
        </div>
        <div>
          <p>Bathroom</p>
          <p className="text-2xl text-black">{bathroomCount}</p>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div>
        <h2 className="text-2xl font-semibold mb-2">Mô tả</h2>
        <div
          className="text-lg font-light text-neutral-500"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      <hr />
    </div>
  );
};

export default ListingInfo;
