import React from 'react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-card shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6 space-y-6">
                        <h1 className="text-4xl font-bold text-foreground mb-6">Terms of Use</h1>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">Acceptance of Terms</h2>
                            <p className="text-muted-foreground">
                                By using the Insurance Appeal Helper tool ("Tool"), you acknowledge that you have read, understood, and agree to be bound by the following terms and conditions:
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">No Attorney-Client Relationship</h2>
                            <p className="text-muted-foreground">
                                The Tool provides general information and templates for insurance appeals. Use of this Tool does not create an attorney-client relationship. The Tool is not a substitute for legal advice, and no attorney-client privilege exists between users and the Tool's creators.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">No Medical Advice</h2>
                            <p className="text-muted-foreground">
                                The Tool does not provide medical advice. Any decisions regarding medical treatment, insurance coverage, or healthcare should be made in consultation with qualified healthcare professionals.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">Disclaimer of Warranties</h2>
                            <p className="text-muted-foreground">
                                The Tool is provided "AS IS" and "AS AVAILABLE," without any warranties of any kind, either express or implied, including but not limited to:
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                                <li>Accuracy or completeness of templates</li>
                                <li>Fitness for any particular purpose</li>
                                <li>Success in insurance appeals</li>
                                <li>Compatibility with specific insurance policies or requirements</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">Limitation of Liability</h2>
                            <p className="text-muted-foreground">
                                Under no circumstances shall the Tool's creators, operators, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:
                            </p>
                            <ol className="list-decimal list-inside text-muted-foreground ml-4 space-y-1">
                                <li>Use or inability to use the Tool</li>
                                <li>Any outcomes of insurance appeals generated through the Tool</li>
                                <li>Any decisions made based on information provided by the Tool</li>
                                <li>Any errors, mistakes, or inaccuracies in the content</li>
                                <li>Any interruption or cessation of transmission to or from the Tool</li>
                            </ol>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">User Responsibilities</h2>
                            <p className="text-muted-foreground">
                                Users acknowledge that they are solely responsible for:
                            </p>
                            <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                                <li>Verifying all information in generated appeals</li>
                                <li>Ensuring compliance with their specific insurance policies</li>
                                <li>Meeting all deadlines and requirements for appeals</li>
                                <li>Maintaining copies of all correspondence</li>
                                <li>Seeking professional legal or medical advice when needed</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">No Guarantee of Results</h2>
                            <p className="text-muted-foreground">
                                Success in insurance appeals cannot be guaranteed. Results vary based on numerous factors outside the Tool's creators' control, including but not limited to insurance company policies, specific circumstances, and applicable laws.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">Indemnification</h2>
                            <p className="text-muted-foreground">
                                Users agree to indemnify and hold harmless the Tool's creators, operators, and affiliates from any claims, damages, or expenses arising from the use of the Tool.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">Privacy and Data</h2>
                            <p className="text-muted-foreground">
                                While the Tool processes information locally in your browser, users are responsible for the security and privacy of any data they input or documents they generate.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">Governing Law</h2>
                            <p className="text-muted-foreground">
                                These terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law principles.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-foreground">Changes to Terms</h2>
                            <p className="text-muted-foreground">
                                We reserve the right to modify these terms at any time. Continued use of the Tool constitutes acceptance of modified terms.
                            </p>
                        </section>

                        <div className="text-sm text-muted-foreground mt-8 pt-4 border-t border-border">
                            Last Updated: December 27, 2024
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}