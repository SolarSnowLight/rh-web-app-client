/* Библиотеки */
import React from "react";
import styled from "styled-components";

export const Logo = React.memo(styled.div`
  grid-area: A;
  display: grid;
  position: relative;
  height: 100%;
  place-items: center;
`);

export const Navigate = React.memo(styled.nav`
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    background: transparent;
    position: relative;
    border-bottom: 1px solid #000000;
    backdrop-filter: blur(8px);
    display: grid;
    place-items: center;
    grid-template-areas:
    "A A B B   B B B B   C C C C"
    "A A B B   B B B B   C C C C"
    "A A B B   B B B B   C C C C";
`);