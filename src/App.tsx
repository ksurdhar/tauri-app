import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Profile } from "./components/Profile/Profile";
import { AuthCallback } from "./components/Auth/AuthCallback";
import { EnvTest } from "./EnvTest";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <EnvTest />
      <AuthProvider>
        <Routes>
          <Route path="/auth-callback" element={<AuthCallback />} />
          <Route path="/" element={
            <main className="container">
              <h1>Tauri + React + Supabase</h1>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </main>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
