"use client";

import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import { House2, Location } from "iconsax-react";
import { formatCurrency } from "@/app/libs/utils";
import { BedIcon } from "@/app/components/Bed";
import { BathIcon } from "@/app/components/Bath";
import Link from "next/link";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = (props) => {
  const {
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser,
  } = props;
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId],
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="relative overflow-hidden rounded-xl">
          <div className="w-full aspect-video md:aspect-square md:h-52 bg-amber-400">
            <img
              className="object-cover w-full h-full group-hover:scale-110 transition"
              src={data.imageSrc}
              width={200}
              height={200}
              alt="Listing"
            />
          </div>
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="md:h-52 flex flex-col md:justify-between space-y-2 md:space-y-0 flex-1">
          <div className="px-4 py-1 rounded-full bg-rose-600 text-white text-xs text-center w-fit">
            {location?.label}
          </div>
          <div className="font-bold text-lg">{data.title}</div>
          <div className="space-y-1">
            <div className="font-semibold flex items-center space-x-2 text-sm">
              <House2 size={14} />
              <p>{reservationDate || data.category}</p>
            </div>
            <div className="flex items-center space-x-2 font-light text-sm">
              <Location size={14} />
              <p>{data.address}</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-3">
            <div className="font-bold text-rose-600">
              {formatCurrency(price)}
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="font-bold text-rose-600">{data.roomArea}m2</div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="flex items-center gap-x-1">
              <span>{data.roomCount}</span>
              <BedIcon />
            </div>
            <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
            <div className="flex items-center gap-x-1">
              <span>{data.bathroomCount}</span>
              <BathIcon />
            </div>
          </div>
          <div></div>
          <div>
            <Link
              href={`/listings/${data.id}`}
              className="px-3 py-1 text-sm border rounded-lg"
            >
              Chi tiết
            </Link>
            {onAction && actionLabel && (
              <Button
                disabled={disabled}
                small
                label={actionLabel}
                onClick={handleCancel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
