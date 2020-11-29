import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [navbar] = useState([
    {
      to: '/',
      id: 'index',
      caption: 'Home',
    },
    {
      to: '/workouts',
      id: 'workouts',
      caption: 'Workouts',
    },
    {
      to: '/categories/custom',
      id: 'custom-workout',
      caption: 'Create New Workout',
    },
  ]);

  return (
    <header>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-dumbbell" />
            {' '}
            PlanningFitness
          </Link>
        </h1>
        {navbar.map(item => <h3 key={item.id}><Link to={item.to}>{item.caption}</Link></h3>)}
      </nav>
    </header>
  );
};
export default Navbar;
