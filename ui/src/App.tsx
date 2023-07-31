import "./App.css";
import Layout from "./components/layouts";
import Product from "./components/Product";

function App() {
  return (
    <div className="App">
      <Layout>
        <Product />
      </Layout>
    </div>
  );
}

export default App;
