import React, { useState } from 'react';
import './index.scss';

import { ReactComponent as LogoIcon} from "../../assets/icons/logo.svg";
import { ReactComponent as NoteIcon} from "../../assets/icons/note.svg";
import { ReactComponent as InfoIcon} from "../../assets/icons/info-circle.svg";
import { ReactComponent as ArrowDownIcon} from "../../assets/icons/arrow-down.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="container m-auto h-16 bg-white flex items-center justify-between px-2 sm:px-0">
      <div className="flex">
        <div className="flex items-center">
          <a href="/" className="mt-1"><LogoIcon /></a>

          <div className="logo-badge rounded px-1 h-5 mt-1 ml-2 lg:ml-4 font-12 text-xs">PRO</div>
        </div>

        <div className="hidden md:flex items-center text-base ml-8 xl:ml-24">
          <ul className='flex m-0 p-0'>
            <li className='nav-item list-none mr-4 xl:mr-8 pb-3 mt-6'>
              <a href="#" className='nav-link leading-6'>New notes</a>
            </li>
            <li className='nav-item list-none mr-4 xl:mr-8 pb-3 mt-6 active'>
              <a href="#" className='nav-link leading-6'>Clients</a>
            </li>
            <li className='nav-item list-none mr-4 xl:mr-8 pb-3 mt-6'>
              <a href="#" className='nav-link leading-6'>Clinicians</a>
            </li>
            <li className='nav-item list-none mr-4 xl:mr-8 pb-3 mt-6'>
              <a href="#" className='nav-link leading-6'>Templates</a>
            </li>
          </ul>

          <div className='nav-earn ml-5 hidden lg:block'>
            Earn $80
          </div>
        </div>
      </div>

      <div className="flex text-base leading-6">
        <div className="header-notes items-center hidden lg:flex">
          <NoteIcon />

          <div className='mx-1'>12 notes left</div>

          <InfoIcon />
        </div>

        <button type="button" className="super-button rounded h-10 text-white px-6 mx-5">Become SUPER</button>

        <div className="relative inline-block text-left">
          <div>
            <button type="button" className="flex items-center text-center text-base font-semibold text-gray-900 border-none" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={handleMenu}>
              <div className="menu-avatar h-10 w-10 pt-2 rounded-full mr-1">M</div>
              <ArrowDownIcon />
            </button>
          </div>

          {menuOpen && <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
            <div className="py-1" role="none">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-0">Account settings</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-1">Support</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="menu-item-2">License</a>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default Header;
