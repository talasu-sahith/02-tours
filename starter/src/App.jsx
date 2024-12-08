import { useEffect, useState } from "react";
import Tour from "./Components/Tour";
import Loading from "./Components/Loading";
import Tours from "./Components/Tours";

const url = "https://www.course-api.com/react-tours-project";

const App = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFunc = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(url);
      const packages = await resp.json();
      setPackages(() => {
        return packages;
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const removeTour = (id) => {
    setPackages(() => packages.filter((tour) => tour.id !== id));
  };
  useEffect(() => {
    fetchFunc();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (packages.length === 0) {
    return (
      <main>
        <section>
          <div className="title">
            {" "}
            <h2>No Tours Left</h2>
            <button className="btn" onClick={() => fetchFunc()}>
              {" "}
              Refresh
            </button>
          </div>
        </section>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={packages} removeTour={removeTour} />
    </main>
  );
};
export default App;
