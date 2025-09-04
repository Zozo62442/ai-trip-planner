import React from "react";
import Header from "./_components/Header";

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Provider;
