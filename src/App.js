import NavBar from "./components/sections/navBar.js";
import BlueButton from "./components/buttons/BlueButton.js";

function App() {
  return (
    <div>
      <NavBar />
      <p>Hello React!</p>
      <BlueButton content="buttonContent"/>
    </div>
  );
}

export default App;