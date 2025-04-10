import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <Heading as="h1">The Wild Oasis</Heading>
        <Button onClick={() => alert('Check in')}>Check in</Button>
        <Button onClick={() => alert('Chech out')}>Check out</Button>

        <Input type="number" placeholder="Number of guests"></Input>
      </StyledApp>
    </>
  );
}

export default App;
