'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

export function Header() {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);

    const links = [
        { label: 'Services', href: '#services' },
        { label: 'Work', href: '#work' },
        { label: 'Process', href: '#process' },
        { label: 'Studio', href: '#studio' },
    ];

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <header
            className={cn(
                'sticky top-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-2xl md:border md:transition-all md:ease-out',
                {
                    'bg-background/95 supports-[backdrop-filter]:bg-background/70 border-black/10 backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow-xl md:shadow-black/[0.07]':
                        scrolled && !open,
                    'bg-background/90': open,
                },
            )}
        >
            <nav
                className={cn(
                    'flex h-14 w-full items-center justify-between px-4 md:h-14 md:transition-all md:ease-out',
                    {
                        'md:px-3': scrolled,
                    },
                )}
            >
                <a href="#top" className="flex items-center" aria-label="GroOut, home">
                    <img src="/groout-logo-dark.png" alt="GroOut" className="h-5 w-auto md:h-6" />
                </a>
                <div className="hidden items-center gap-1 md:flex">
                    {links.map((link, i) => (
                        <a key={i} className={buttonVariants({ variant: 'ghost', className: 'text-cream' })} href={link.href}>
                            {link.label}
                        </a>
                    ))}
                    <a className={cn(buttonVariants(), 'ml-2')} href="#contact">
                        Book a call
                    </a>
                </div>
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setOpen(!open)}
                    className="md:hidden"
                    aria-label="Menu"
                    aria-expanded={open}
                >
                    <MenuToggleIcon open={open} className="size-5" duration={300} />
                </Button>
            </nav>

            <div
                className={cn(
                    'bg-background/95 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y border-black/10 backdrop-blur-lg md:hidden',
                    open ? 'block' : 'hidden',
                )}
            >
                <div
                    data-slot={open ? 'open' : 'closed'}
                    className={cn(
                        'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
                        'flex h-full w-full flex-col justify-between gap-y-2 p-4',
                    )}
                >
                    <div className="grid gap-y-2">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                onClick={() => setOpen(false)}
                                className={buttonVariants({
                                    variant: 'ghost',
                                    className: 'h-12 justify-start text-base text-cream',
                                })}
                                href={link.href}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        <a
                            className={cn(buttonVariants(), 'h-12 w-full text-base')}
                            href="#contact"
                            onClick={() => setOpen(false)}
                        >
                            Book a call
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
