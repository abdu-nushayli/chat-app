"use client";

import { FC, ReactNode } from "react";
import { ClerkProvider, useAuth, SignInButton } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { FaSignalMessenger } from "react-icons/fa6";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!;
const CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const convex = new ConvexReactClient(CONVEX_URL);

const ConvexClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="bg-slate-900 w-svw h-dvh grid place-content-center">
            <div className="grid place-content-center mb-5">
              <FaSignalMessenger size={100} className="text-primary-main" />
            </div>

            <Card className="bg-slate-800 w-[350px] border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  Authenticate
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white text-center bg-primary-main hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                <SignInButton />
              </CardContent>
            </Card>
          </div>
        </Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexClientProvider;
