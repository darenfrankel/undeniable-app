// src/components/ui/footer.tsx
import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="text-sm text-gray-500 text-center md:text-left">
                        <div>UndeniableHealth.org</div>
                        <div>© {currentYear} Frankelite, LLC</div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                        <Link
                            href="/privacy"
                            className="hover:text-gray-900 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="hover:text-gray-900 transition-colors"
                        >
                            Terms of Use
                        </Link>
                        <a
                            href="https://forms.gle/PRZG9tpdQpFSKSjJ7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-900 transition-colors"
                        >
                            Feedback
                        </a>
                        <a
                            href="mailto:undeniable@frankelite.com"
                            className="hover:text-gray-900 transition-colors"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}