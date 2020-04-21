import React from 'react';
import PropTypes from 'prop-types';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import useMenu from '@console/hooks/useMenu';
import Icon from '@console/Shared/Icon';
import BellOutlineIcon from '@console/Shared/Icons/BellOutline';
import DocumentOutlineIcon from '@console/Shared/Icons/DocumentOutline';
import HomeOutlineIcon from '@console/Shared/Icons/HomeOutline';
import SearchOutlineIcon from '@console/Shared/Icons/SearchOutline';
import TagOutlineIcon from '@console/Shared/Icons/TagOutline';
import UserGroupOutlineIcon from '@console/Shared/Icons/UserGroupOutline';
import Notification from '@console/Shared/Notification';

function UserMenu() {
    const menu = useMenu();

    function handleSignOut() {
        Inertia.post($route('console.logout'));
    }

    return (
        <div className="ml-3 relative">
            <div>
                <button
                    className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                    onClick={() => menu.setOpen(true)}
                    id="user-menu"
                    aria-label="User menu"
                    aria-haspopup="true"
                >
                    <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Avatar"
                    />
                </button>
            </div>

            <CSSTransition
                in={menu.open}
                timeout={{
                    enter: 100,
                    exit: 75,
                }}
                classNames={{
                    enter: 'transform opacity-0 scale-95 duration-100',
                    enterActive: 'transform opacity-100 scale-100',
                    exit: 'transform opacity-100 scale-100 duration-75',
                    exitActive: 'transform opacity-0 scale-95',
                }}
                unmountOnExit
            >
                <div
                    ref={menu.ref}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                >
                    <div
                        className="py-1 rounded-md bg-white shadow-xs"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                    >
                        <InertiaLink
                            href={$route('console.account')}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                        >
                            Your Account
                        </InertiaLink>
                        <a
                            href="#"
                            onClick={handleSignOut}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                        >
                            Sign out
                        </a>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default function Master({ children }) {
    const { message } = usePage();

    const LINKS = [
        {
            path: $route('console.home'),
            active: 'console.home' === route().current(),
            text: 'Dashboard',
            icon: <HomeOutlineIcon />,
        },

        {
            path: $route('console.tags.index'),
            active: 'console.tags.index' === route().current(),
            text: 'Tags',
            icon: <TagOutlineIcon />,
        },

        {
            path: $route('console.articles.index'),
            active: 'console.articles.index' === route().current(),
            text: 'Articles',
            icon: <DocumentOutlineIcon />,
        },

        {
            path: $route('console.users.index'),
            active: 'console.users.index' === route().current(),
            text: 'Users',
            icon: <UserGroupOutlineIcon />,
        },
    ];

    return (
        <div>
            <nav className="fixed w-1/5">
                <div className="bg-gray-900">
                    <div className="h-16 px-4 flex items-center">
                        <h4 className="text-2xl text-white font-semibold">
                            Hackdawg
                        </h4>
                    </div>
                </div>
                <div className="bg-gray-800">
                    <div className="h-screen px-2 pt-4 flex flex-col">
                        {LINKS.map(link => (
                            <InertiaLink
                                key={link.path}
                                className={cx(
                                    'p-3 flex items-center rounded-md text-sm font-medium text-white focus:outline-none focus:text-white focus:bg-gray-700',
                                    {
                                        'bg-gray-900': link.active,
                                        'hover:bg-gray-700': !link.active,
                                    },
                                )}
                                href={link.path}
                            >
                                <Icon>{link.icon}</Icon>
                                <span className="ml-4">{link.text}</span>
                            </InertiaLink>
                        ))}
                    </div>
                </div>
            </nav>
            <nav className="bg-white w-4/5 ml-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow">
                    <div className="flex items-center justify-between h-16">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 pointer-events-none">
                                <Icon size="small">
                                    <SearchOutlineIcon />
                                </Icon>
                            </div>
                            <input
                                className="block w-full pl-12 pr-4 text-gray-700 placeholder-gray-500"
                                placeholder="Search"
                            />
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                <button
                                    className="p-1 border-2 border-transparent text-gray-500 rounded-full hover:text-gray-700"
                                    aria-label="Notifications"
                                >
                                    <Icon>
                                        <BellOutlineIcon />
                                    </Icon>
                                </button>

                                <UserMenu />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="w-4/5 ml-auto p-8">{children}</main>
            <Notification message={message} />
        </div>
    );
}

Master.propTypes = {
    children: PropTypes.node.isRequired,
};
