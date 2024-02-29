'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Login', href: '/login', icon: DocumentDuplicateIcon },
    { name: 'Register', href: '/register', icon: UserGroupIcon }
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <div className="flex space-x-4">
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex items-center justify-center gap-2 rounded-md bg-blue-600 text-white p-3 text-sm font-medium hover:bg-blue-500 hover:text-white",
                            {
                                'bg-blue-500 text-white': pathname === link.href,
                            },
                        )}
                    >
                        <LinkIcon className="w-6 h-6" />
                        <p>{link.name}</p>
                    </Link>
                );
            })}
        </div>
    );
}