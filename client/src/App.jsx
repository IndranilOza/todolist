import React from "react";
import Routing from "./router/Routing";

function App() {
<<<<<<< HEAD
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/tasks"
            element={
              <>
                <AddTask />
                <TaskList />
              </>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  );
=======
  return <Routing />;
>>>>>>> 10f754e945209b212699e31e6621136b49a0d99e
}

export default App;
