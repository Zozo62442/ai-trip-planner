"use client"
import React, { use, useContext } from "react";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import { User } from "lucide-react";
import { UserDetailContext } from "../context/UserDetailContext";

function Provider({ children }: Readonly<{ children: React.ReactNode }>) {

  const { user } = useUser();

  const CreateUser = useMutation(api.user.createUser);
  const [userDetail, setUserDetail] = React.useState<any>();
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
      <div>
        <Header />
        {children}
      </div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
};

