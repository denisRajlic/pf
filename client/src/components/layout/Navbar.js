import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
// const [navbar] = useState([
//   {
//     to: '/',
//     id: 'index',
//     caption: 'Home',
//   },
//   {
//     to: '/workouts',
//     id: 'workouts',
//     caption: 'Workouts',
//   },
//   {
//     to: '/categories/custom',
//     id: 'custom-workout',
//     caption: 'Create New Workout',
//   },
// ]);
  <header>
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" />
          {' '}
          PlanningFitness
        </Link>
      </h1>
    </nav>
  </header>
);
export default Navbar;