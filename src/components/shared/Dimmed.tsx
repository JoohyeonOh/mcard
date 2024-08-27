import styled from "@emotion/styled";

function Dimmed({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: var(--dimmed-zindex);
`;

export default Dimmed;
