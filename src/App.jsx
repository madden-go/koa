import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import MainLayout from './components/Layout/MainLayout';
// Components
import ReminderWidget from './components/Sidebar/ReminderWidget';
import SubjectList from './components/Sidebar/SubjectList';
import CodingActivity from './components/Sidebar/CodingActivity';
import TodoList from './components/TodoList/TodoList';
import HabitTracker from './components/Widgets/HabitTracker';
import MoodTracker from './components/Widgets/MoodTracker';
import JournalWidget from './components/Widgets/JournalWidget';
import SpotifyWidget from './components/Widgets/SpotifyWidget';
import TimeSplit from './components/Widgets/TimeSplit';
import CalendarWidget from './components/Widgets/CalendarWidget';
import Pet from './components/Pet/Pet';
// Pages
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { AuthProvider } from './context/AuthContext';
// global styles are imported in main.jsx

function AppContent() {
  const location = useLocation();
  const { user } = useAuth();

  // -- State Lifted from TodoList --
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finish React project", completed: false },
    { id: 2, text: "Read Chapter 4", completed: true },
    { id: 3, text: "Email professor", completed: false },
  ]);

  const addTask = (taskText) => {
    setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // -- State Lifted from HabitTracker --
  const [habits, setHabits] = useState([
    { id: 1, name: "Drink Water", streak: 5, completed: false },
    { id: 2, name: "Read 30 mins", streak: 12, completed: true },
    { id: 3, name: "Meditate", streak: 3, completed: false },
  ]);

  const toggleHabit = (id) => {
    setHabits(habits.map(h =>
      h.id === id ? { ...h, completed: !h.completed, streak: h.completed ? h.streak - 1 : h.streak + 1 } : h
    ));
  };

  // -- State Lifted from MoodTracker --
  const [selectedMood, setSelectedMood] = useState(null);

  const isAuthPage = ['/', '/login', '/signup'].includes(location.pathname);

  return (
    <div className="app-container">
      {!isAuthPage && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          user ? (
            <MainLayout>
              {/* Column 1 - Left */}
              <div className="flex-col gap-lg">
                <CalendarWidget />
                <ReminderWidget />
                <SubjectList />
                <MoodTracker selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
              </div>

              {/* Column 2 - Center (Time Split + Tasks) */}
              <div className="flex-col gap-lg">
                <div style={{ height: '350px' }}>
                  <TimeSplit />
                </div>
                <div style={{ height: '400px' }}>
                  <TodoList tasks={tasks} addTask={addTask} toggleTask={toggleTask} deleteTask={deleteTask} />
                </div>
              </div>

              {/* Column 3 - Right (Coding Activity + Props) */}
              <div className="flex-col gap-lg">
                <div>
                  <CodingActivity />
                </div>
                <HabitTracker habits={habits} toggleHabit={toggleHabit} />
                {/* Journal can go below or flexible */}
                <div style={{ height: '150px' }}>
                  <JournalWidget />
                </div>
              </div>
            </MainLayout>
          ) : (
            <Navigate to="/" replace />
          )
        } />

        <Route path="/calendar" element={
          user ? (
            <CalendarPage
              tasks={tasks}
              habits={habits}
              mood={selectedMood}
            />
          ) : (
            <Navigate to="/" replace />
          )
        } />
      </Routes>

      {!isAuthPage && (
        <>
          <Pet />
          <SpotifyWidget />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
