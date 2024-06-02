"use client";
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import React, { useEffect } from "react";
import Cookies from "cookies-js";
import { useLazyGetProfileQuery } from "@/services/rtk/profileApi";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "@/services/slices/userSlice";
import { RootState } from "@/services/store";

const RedirectIndex = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [getProfile, { isLoading, data }] = useLazyGetProfileQuery();
  console.log("profile", data);
  const token = params.get("token");

  useEffect(() => {
    // console.log("params", params.get("token"));
    if (token) {
      Cookies.set("token", token);

      getProfile("");
    }
  }, [token]);

  useEffect(() => {
    if (data?.data && !isLoggedIn) {
      dispatch(LoginUser(data?.data));
    }
    if (isLoggedIn) {
      router.push("/");
    }
  }, [data, isLoggedIn]);

  return <div>Redirecting..</div>;
};

export default RedirectIndex;
