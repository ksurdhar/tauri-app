import { Switch, Route } from 'wouter';
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Profile } from "./components/Profile/Profile";
import { AuthCallback } from "./components/Auth/AuthCallback";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route path="/auth-callback" component={AuthCallback} />
        <Route path="/">
          {() => (
            <main className="container">
              <h1>Tauri + React + Supabase</h1>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </main>
          )}
        </Route>
      </Switch>
    </AuthProvider>
  );
}

export default App;
