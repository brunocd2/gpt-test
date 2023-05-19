import GlobalProvider from "./contexts/global";
import Routes from "./routes";

export default function App() {
  return (
    <GlobalProvider>
      <div className="container">
        <Routes />
      </div>
    </GlobalProvider>
  );
}