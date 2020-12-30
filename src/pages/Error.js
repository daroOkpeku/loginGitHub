import React from 'react'
import Styled from "styled-components";
import { Link } from "react-router-dom"
export default function Error() {
    return (
        <Wrapper>
            <div>
                <h1>Error</h1>
                <h3>sorry this doesn't exist</h3>
                <Link to="/" className="btn">Back to HomePage</Link>
            </div>
        </Wrapper>
    )
}






const Wrapper = Styled.article`
min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--clr-primary-10);
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }

`;