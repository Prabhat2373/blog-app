export const isSuccess = (res: any) => {
  if (res) {
    return res?.data?.status?.toLowerCase() === "success";
  }
  return false;
};
