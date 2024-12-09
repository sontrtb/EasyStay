"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { TbHome, TbSchool, TbSoup } from "react-icons/tb";
import { GiBathtub, GiBunkBeds, GiNotebook } from "react-icons/gi";
import { FaCity, FaClock } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "Trọ ở riêng",
    icon: TbHome,
    description:
      "Phòng trọ riêng tư, cung cấp không gian độc lập hoàn toàn, phù hợp cho sinh viên muốn có không gian học tập và nghỉ ngơi riêng.",
  },
  {
    label: "Trọ ở ghép",
    icon: GiBunkBeds,
    description:
      "Phòng trọ ghép với nhiều người ở chung, giúp tiết kiệm chi phí và tạo điều kiện giao lưu với bạn bè.",
  },
  {
    label: "Trọ giá rẻ",
    icon: MdOutlineVilla,
    description:
      "Phòng trọ giá rẻ với tiện nghi cơ bản, phù hợp với sinh viên có hoàn cảnh khó khăn hoặc cần tiết kiệm chi phí.",
  },
  {
    label: "Trọ gần trung tâm",
    icon: FaCity,
    description:
      "Phòng trọ gần trung tâm thành phố, tiện lợi cho sinh viên cần gần các dịch vụ và tiện ích công cộng.",
  },
  {
    label: "Trọ gần trường",
    icon: TbSchool,
    description:
      "Phòng trọ nằm gần trường học, giúp sinh viên dễ dàng đi lại và tiết kiệm chi phí di chuyển.",
  },
  {
    label: "Trọ vệ sinh riêng",
    icon: GiBathtub,
    description:
      "Phòng trọ có nhà vệ sinh riêng, đảm bảo sự tiện nghi và thoải mái cho sinh viên muốn có không gian riêng tư hơn.",
  },
  {
    label: "Trọ theo mùa thi",
    icon: GiNotebook,
    description:
      "Phòng trọ được cho thuê ngắn hạn trong mùa thi, với không gian yên tĩnh để sinh viên tập trung ôn thi.",
  },
  {
    label: "Trọ tạm thời",
    icon: FaClock,
    description:
      "Phòng trọ tạm thời cho sinh viên cần chỗ ở trong thời gian ngắn khi đang tìm kiếm chỗ ở dài hạn.",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container className="sm:px-0 md:px-0">
      <div
        style={{
          scrollbarWidth: "none",
        }}
        className="
          w-full
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
