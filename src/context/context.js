
import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';


const GitHubContext = React.createContext();

const GithubProvider = ({ children }) => {
    const [GitHubUser, setGitHubUser] = useState(mockUser);
    const [GitHubFollowers, setGitFollowers] = useState(mockFollowers);
    const [GitHubRepos, setGitHubRepos] = useState(mockRepos);
    const [Loading, setLoading] = useState(false);
    const [life, setLife] = useState({});
    const [error, setError] = useState({ show: false, msg: "" })

    const SearchGitHubUser = async (user) => {
        //ErrorMsg(false, "")
        //setLoading(true)
        setLoading(true)
        /*  const response = await axios(`${rootUrl}/users/${user}`).catch(error => console.log(error))
          console.log(response)
          if (response) {
              setGitHubUser(response.data)
          } else {
              ErrorMsg(true, "sorry this user doesn't exist ");
  
          }*/


        try {
            const info = await fetch(`${rootUrl}/users/${user}`)
            const control = await info.json()
            if (control) {
                setGitHubUser(control)
                //to show user repos searched on 
                const { login, followers_url } = control
                const OtherUser = await fetch(`${rootUrl}/users/${login}/repos?per_page=100`)
                const OtherCollector = await OtherUser.json()
                setGitHubRepos(OtherCollector)
                console.log(OtherCollector)

                //to show user followers searched on 
                const OtherUserFollowers = await fetch(`${followers_url}?per_page=100`)
                const OtherCollectorFollowers = await OtherUserFollowers.json()
                setGitFollowers(OtherCollectorFollowers)
                console.log(OtherCollectorFollowers)
                //repos
                //https://api.github.com/users/john-smilga/repos?per_page=100
                //Followers
                //https://api.github.com/users/john-smilga/followers
            } else {
                ErrorMsg(true, "sorry this user doesn't exist ")
            }

        } catch (error) {
            console.log(error)

        }

        setLoading(false)

    }



    useEffect(() => {
        async function getData() {
            try {
                const data = await fetch(`https://api.github.com/rate_limit`)
                const Collect = await data.json();
                const { rate } = Collect
                let { limit, remaining } = rate


                const items = { max: limit, reduced: remaining }
                setLife(items)
                if (remaining === 0) {
                    ErrorMsg(true, "you can't search anymore your request has finished please wait for 1hour");
                }


            } catch (error) {
                console.log(error)
            }


        }
        getData();
    }, [])

    function ErrorMsg(show = false, msg = "") {
        setError({
            show: show,
            msg: msg
        })
    }
    return (
        <GitHubContext.Provider value={{
            GitHubUser: GitHubUser,
            GitHubFollowers: GitHubFollowers,
            GitHubRepos: GitHubRepos,
            life: life,
            ErrorMsg: ErrorMsg,
            error: error,
            SearchGitHubUser: SearchGitHubUser,
            Loading: Loading
        }}>
            {children}
        </GitHubContext.Provider>
    )
}

export { GithubProvider, GitHubContext }