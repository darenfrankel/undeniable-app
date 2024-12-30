'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GitHubIcon } from '@/components/ui/icons';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex justify-between w-full sm:w-auto">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-blue-600 font-semibold text-lg">
                                UNDENIABLE
                            </Link>
                        </div>
                        <div className="flex items-center sm:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isOpen ? (
                                    <X className="block h-6 w-6" />
                                ) : (
                                    <Menu className="block h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
                        <Link
                            href="/"
                            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === '/'
                                ? 'border-blue-500 text-gray-900'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === '/about'
                                ? 'border-blue-500 text-gray-900'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                        >
                            About
                        </Link>
                        <a
                            href="https://github.com/darenfrankel/undeniable-app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <span className="sr-only">GitHub</span>
                            <GitHubIcon className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>

            <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
                <div className="pt-2 pb-3 space-y-1">
                    <Link
                        href="/"
                        className={`block pl-3 pr-4 py-2 text-base font-medium ${pathname === '/'
                            ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                            : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                            }`}
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className={`block pl-3 pr-4 py-2 text-base font-medium ${pathname === '/about'
                            ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                            : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                            }`}
                        onClick={() => setIsOpen(false)}
                    >
                        About
                    </Link>
                    <a
                        href="https://github.com/darenfrankel/undeniable-app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 border-l-4 border-transparent"
                        onClick={() => setIsOpen(false)}
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </nav>
    );
}