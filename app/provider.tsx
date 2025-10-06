"use client"
import React, { useState, useContext } from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import { User } from "lucide-react";
import { UserDetailContext } from "../context/UserDetailContext";
import { TripDetailContext } from "../context/TripDetailContext";
import { TripInfo } from "./create-new-trip/_components/ChatBox";


function Provider({ children }: Readonly<{ children: React.ReactNode }>) {

  const { user } = useUser();

  const CreateUser = useMutation(api.user.createUser);
  const [userDetail, setUserDetail] = useState<any>();
  const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);

  const CreateNewUser = async() => {
    if (user) {
      // Save New User if Not Exist
      const result = await CreateUser(
        {
          name: user?.fullName ?? '',
          email: user?.primaryEmailAddress?.emailAddress ?? '',
          imageUrl: user?.imageUrl,
        }
      )
      setUserDetail(result);
    }
  };

  useEffect(() => {
    user && CreateNewUser();
  }, [user]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo }}>
      <div>
        <Header />
        {children}
      </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
};

export const useTripDetail = (): TripContextType | undefined  => {
  return useContext(TripDetailContext);
}
