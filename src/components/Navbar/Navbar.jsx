import { BiSearchAlt2 } from 'react-icons/bi'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import './Navbar.scss';


function Navbar() {

  const [search, setSearch] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/search?q=${search}`)
    setSearch('')
  }

  return (
    <nav className='navbar'>
      <Link to={'/'}>
        <h1 className='page-title'>FilmesLib</h1>
      </Link>


      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Busque um filme'
          onChange={(e) => setSearch(e.target.value)}
          value={search} />
        <button type='submit'><BiSearchAlt2 /> </button>
      </form>
    </nav>
  );
}

export default Navbar;