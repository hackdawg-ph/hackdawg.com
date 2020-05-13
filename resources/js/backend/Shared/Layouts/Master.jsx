import React from 'react';
import PropTypes from 'prop-types';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import useToggle from '@/backend/hooks/useToggle';
import Avatar from '@/backend/Shared/Avatar';
import BellOutlineIcon from '@/backend/Shared/Icons/BellOutline';
import DocumentOutlineIcon from '@/backend/Shared/Icons/DocumentOutline';
import HomeOutlineIcon from '@/backend/Shared/Icons/HomeOutline';
import MenuAlt2OutlineIcon from '@/backend/Shared/Icons/MenuAlt2Outline';
import SearchOutlineIcon from '@/backend/Shared/Icons/SearchOutline';
import TagOutlineIcon from '@/backend/Shared/Icons/TagOutline';
import UserGroupOutlineIcon from '@/backend/Shared/Icons/UserGroupOutline';
import XOutlineIcon from '@/backend/Shared/Icons/XOutline';
import Notification from '@/backend/Shared/Notification';

Master.propTypes = {
    title: PropTypes.string,
    headerActions: PropTypes.node,
    withHeader: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default function Master({ title, headerActions, withHeader = true, children, className, ...props }) {
    const {
        auth,
        message,
        form: { errors },
    } = usePage();
    const mobileNav = useToggle();
    const userMenu = useToggle();

    const LINKS = [
        {
            path: $route('backend.home'),
            active: 'backend.home' === route().current(),
            text: 'Dashboard',
            Icon: HomeOutlineIcon,
        },

        {
            path: $route('backend.tags.index'),
            active: 'backend.tags.index' === route().current(),
            text: 'Tags',
            Icon: TagOutlineIcon,
        },

        {
            path: $route('backend.articles.index'),
            active: 'backend.articles.index' === route().current(),
            text: 'Articles',
            Icon: DocumentOutlineIcon,
        },

        {
            path: $route('backend.users.index'),
            active: 'backend.users.index' === route().current(),
            text: 'Users',
            Icon: UserGroupOutlineIcon,
        },
    ];

    return (
        <div className={cx('h-screen flex overflow-hidden bg-gray-100', className)} {...props}>
            {/* Off-canvas menu htmlFor mobile */}
            <div className="md:hidden">
                {mobileNav.open && (
                    <div className="fixed inset-0 flex z-40">
                        {/* Off-canvas menu overlay, show/hide based on off-canvas menu state.
                            Entering: "transition-opacity ease-linear duration-300"
                            From: "opacity-0"
                            To: "opacity-100"
                            Leaving: "transition-opacity ease-linear duration-300"
                            From: "opacity-100"
                            To: "opacity-0"
                        */}
                        <div className="fixed inset-0">
                            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
                        </div>
                        {/* Off-canvas menu, show/hide based on off-canvas menu state.
                            Entering: "transition ease-in-out duration-300 transform"
                            From: "-translate-x-full"
                            To: "translate-x-0"
                            Leaving: "transition ease-in-out duration-300 transform"
                            From: "translate-x-0"
                            To: "-translate-x-full"
                        */}
                        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                            <div className="absolute top-0 right-0 -mr-14 p-1">
                                <button
                                    className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                                    onClick={() => mobileNav.setOpen(false)}
                                    aria-label="Close sidebar"
                                >
                                    <XOutlineIcon className="h-6 w-6 text-white" />
                                </button>
                            </div>
                            <div className="flex-shrink-0 flex items-center px-4">
                                <div className="h-8 w-auto">
                                    <h4 className="text-2xl text-white font-semibold">Hackdawg</h4>
                                </div>
                            </div>
                            <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                <div className="flex-shrink-0 flex items-center px-4">
                                    <img className="w-auto h-10" src="/png/logos/indigo.png" alt="Hackdawg" />
                                </div>
                                <nav className="mt-5 px-2">
                                    {LINKS.map(({ Icon, ...link }) => (
                                        <InertiaLink
                                            key={link.path}
                                            className={cx(
                                                'group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md transition ease-in-out duration-150',
                                                {
                                                    'text-white bg-gray-900 focus:outline-none focus:bg-gray-700':
                                                        link.active,
                                                    'mt-1 text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 ': !link.active,
                                                },
                                            )}
                                            href={link.path}
                                        >
                                            <Icon
                                                className={cx(
                                                    'mr-4 h-6 w-6 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150',
                                                    {
                                                        'text-gray-300': link.active,
                                                        'text-gray-400': !link.active,
                                                    },
                                                )}
                                            />
                                            {link.text}
                                        </InertiaLink>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-14">
                            {/* Dummy element to force sidebar to shrink to fit close icon */}
                        </div>
                    </div>
                )}
            </div>

            {/* Static sidebar htmlFor desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                        <img className="w-auto h-10 mr-2" src="/png/logos/indigo.png" alt="Hackdawg" />
                        <div className="w-auto h-8">
                            <h4 className="text-xl text-white font-semibold">Hackdawg Inc.</h4>
                        </div>
                    </div>
                    <div className="h-0 flex-1 flex flex-col overflow-y-auto">
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <nav className="flex-1 px-2 py-4 bg-gray-800">
                            {LINKS.map(({ Icon, ...link }) => (
                                <InertiaLink
                                    key={link.path}
                                    className={cx(
                                        'group flex items-center px-2 py-2 text-sm leading-5 font-medium rounded-md focus:outline-none transition ease-in-out duration-150',
                                        {
                                            'text-white bg-gray-900 focus:bg-gray-700': link.active,
                                            'mt-1  text-gray-300 hover:text-white hover:bg-gray-700 focus:text-white': !link.active,
                                        },
                                    )}
                                    href={link.path}
                                >
                                    <Icon
                                        className={cx(
                                            'mr-3 h-6 w-6 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150',
                                            'mr-3 h-6 w-6 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150',
                                            {
                                                'text-gray-300': link.active,
                                                'text-gray-400': !link.active,
                                            },
                                        )}
                                    />
                                    {link.text}
                                </InertiaLink>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                {/* Header */}
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
                    <button
                        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden"
                        onClick={() => mobileNav.setOpen(true)}
                        aria-label="Open sidebar"
                    >
                        <MenuAlt2OutlineIcon className="h-6 w-6" />
                    </button>
                    <div className="flex-1 px-4 flex justify-between">
                        <div className="flex-1 flex">
                            <div className="w-full flex md:ml-0">
                                <label htmlFor="search_field" className="sr-only">
                                    Search
                                </label>
                                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                        <SearchOutlineIcon className="h-5 w-5" />
                                    </div>
                                    <input
                                        id="search_field"
                                        className="block w-full h-full pl-8 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
                                        placeholder="Search"
                                        type="search"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="ml-4 flex items-center md:ml-6">
                            <button
                                className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:shadow-outline focus:text-gray-500"
                                aria-label="Notifications"
                            >
                                <BellOutlineIcon className="h-6 w-6" />
                            </button>

                            {/* Profile dropdown */}
                            <div className="ml-3 relative">
                                <div>
                                    <button
                                        className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline"
                                        id="user-menu"
                                        aria-label="User menu"
                                        aria-haspopup="true"
                                        onClick={() => userMenu.setOpen(true)}
                                    >
                                        <Avatar size="sm" url={auth.user.avatar_url} />
                                    </button>
                                </div>
                                {/* Profile dropdown panel, show/hide based on dropdown state.
                                    Entering: "transition ease-out duration-100"
                                        From: "transform opacity-0 scale-95"
                                        To: "transform opacity-100 scale-100"
                                    Leaving: "transition ease-in duration-75"
                                        From: "transform opacity-100 scale-100"
                                        To: "transform opacity-0 scale-95"
                                */}
                                {userMenu.open && (
                                    <div
                                        ref={userMenu.ref}
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
                                    >
                                        <div
                                            className="py-1 rounded-md bg-white shadow-xs"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="user-menu"
                                        >
                                            <InertiaLink
                                                href={$route('backend.account.index')}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                                                role="menuitem"
                                            >
                                                Account settings
                                            </InertiaLink>
                                            <a
                                                href="#"
                                                onClick={() => Inertia.post($route('backend.logout'))}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition ease-in-out duration-150"
                                                role="menuitem"
                                            >
                                                Sign out
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* End: Header */}

                {withHeader && (
                    <div className="p-6 bg-white shadow">
                        {/* Breadcrumbs */}

                        <div className="md:flex md:items-center md:justify-between">
                            <div className="flex-1 min-w-0">
                                <h2 className="text-2xl font-bold leading-5 text-gray-900 sm:text-2xl sm:leading-7 sm:truncate">
                                    {title}
                                </h2>
                            </div>
                            <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">{headerActions}</div>
                        </div>
                    </div>
                )}

                <main
                    className={cx('flex-1 relative z-0 overflow-y-auto focus:outline-none', {
                        'py-6': !withHeader,
                        'pb-6': withHeader,
                    })}
                    tabIndex="0"
                >
                    {!withHeader && (
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                        </div>
                    )}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                        <div className="py-4">{children}</div>
                    </div>
                </main>
            </div>

            {message && <Notification message={message} />}
            {!isEmpty(errors) && (
                <Notification
                    message={{
                        title: 'Whooops?!',
                        body: 'Check the fields and try again.',
                        variant: 'error',
                    }}
                />
            )}
        </div>
    );
}
