import React, { lazy, Suspense } from "react";
import { userdetails } from "./Interfaces/Details.interface";
import ReferCodeCaller from "./ReferCodeCaller";

const Part1 = lazy(() => import("./Part1"));
const Part2 = lazy(() => import("./Part2"));
const QueryBox = lazy(() => import("./QueryBox"));
const Popping = lazy(() => import("./Popping"));
const Numbers = lazy(() => import("./Numbers"));
const Footer = lazy(() => import("./Footer"));

interface HomePageProps {
  authenticated: boolean;
  details: userdetails | undefined;
}

function HomePage({ authenticated, details }: HomePageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Popping>
          <Part1 auth={authenticated} />
        </Popping>
        <Part2 />
        <Popping>
          <ReferCodeCaller details={details} auth={authenticated} />
        </Popping>
        <Numbers />
        <Popping>
          <QueryBox />
        </Popping>
        <Popping>
          <Footer />
        </Popping>
      </div>
    </Suspense>
  );
}

export default HomePage;
