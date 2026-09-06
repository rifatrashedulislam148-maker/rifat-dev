import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 px-6 py-8">
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
                <p>© {new Date().getFullYear()} Rashedul Islam Rifat. All rights reserved.</p>
                <Link href="/admin/login" className="hover:text-white">
                    Admin
                </Link>
            </div>
        </footer>
    );
}