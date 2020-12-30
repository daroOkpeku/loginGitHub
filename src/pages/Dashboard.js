import React, { useContext } from 'react';
import { Navbar, Repos, User, Info, Search } from "../components";
import { GitHubContext } from "../context/context"
import Image from "../images/preloader.gif"
export default function Dashboard() {
  const context = useContext(GitHubContext);
  const { Loading } = context

  if (Loading) {
    return <main>
      <Navbar />
      <Search />
      <img src={Image} alt="gif" className="loading-img" />

    </main>
  }
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};


