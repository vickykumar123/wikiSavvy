import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-semibold m-3">
        Welcome to <span className="italic text-purple-600">wikiSavvy</span>
      </h1>
      {children}
    </div>
  );
}
