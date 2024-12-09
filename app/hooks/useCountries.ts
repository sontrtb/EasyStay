export interface IAddress {
  value: string;
  label: string;
}

const listAddress = [
  {
    value: "quan1",
    label: "Quận 1",
  },
  {
    value: "quan2",
    label: "Quận 2",
  },
  {
    value: "quan3",
    label: "Quận 3",
  },
  {
    value: "quan4",
    label: "Quận 4",
  },
];

const useCountries = () => {
  const getAll = () => listAddress;

  const getByValue = (value: string) => {
    return listAddress.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
