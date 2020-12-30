import { object } from 'prop-types';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { GitHubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const context = useContext(GitHubContext)
  const { GitHubRepos } = context

  //const languages = new Set(GitHubRepos.map((item) => { return item.language }))
  const languages = GitHubRepos.reduce((total, single) => {
    const { language, stargazers_count } = single
    if (!language) {
      return total;

    }

    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count }
    } else {
      total[language] = { ...total[language], value: total[language].value + 1, stars: total[language].stars + stargazers_count };

    }
    return total;
  }, {})

  const term = Object.values(languages).sort((total, single) => {

    return single.value - total.value

  }).slice(0, 5);

  const star = Object.values(languages).sort((total, single) => {

    return single.stars - total.stars

  }).map((item) => {
    return { ...item, value: item.stars }
  }).slice(0, 5)

  //stars  fork
  const { stars, fork } = GitHubRepos.reduce((total, single) => {
    const { stargazers_count, name, forks } = single
    total.stars[stargazers_count] = { label: name, value: stargazers_count }
    total.fork[forks] = { label: name, value: forks }
    return total;
  }, {
    stars: {}, fork: {}
  })

  let burn = Object.values(stars).slice(0, 5).reverse()
  let jack = Object.values(fork).slice(0, 5).reverse()

  // STEP 2 - Chart Data
  const chartData = [
    {
      label: "HTML",
      value: "13"
    },
    {
      label: "CSS",
      value: "23"
    },
    {
      label: "Javascript",
      value: "80"
    },

  ]

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={term} />
        <Column3D data={burn} />
        { /* <ExampleChart data={chartData} /> */}
        <Doughnut2D data={star} />
        <Bar3D data={jack} />
      </Wrapper>
    </section>
  )
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
