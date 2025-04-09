import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: antiquewhite;
`;

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <H1>The Wild Oasis</H1>
        <Button onClick={() => alert('Check in')}>Check in</Button>
        <Button onClick={() => alert('Chech out')}>Check out</Button>

        <Input type="number" placeholder="Number of guests"></Input>
      </StyledApp>
    </>
  );
}

export default App;
