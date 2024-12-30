import React from 'react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-card shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6 space-y-8">

                        <section>
                            <h1 className="text-4xl font-bold text-foreground mb-4">About Undeniable</h1>
                            <p className="text-muted-foreground">
                                Undeniable is a free tool designed to help you navigate the complex process of appealing wrongfully denied insurance claims. Our goal is to empower insured parties by making the appeals process more accessible and less intimidating.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">How It Works</h2>
                            <div className="space-y-4">
                                <p className="text-muted-foreground">
                                    We provide an standard, free-to-use email template that incorporates key regulatory requirements and standard appeal language. Feel free to copy it and manually update the placeholders in brackets ([ ]) yourself, or add your information in the form to populate the tempalte for you. Click the "Open in Email Client" button to transfer the message to your pre-configured email client.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">Privacy & Security</h2>
                            <div className="space-y-4">
                                <p className="text-muted-foreground">
                                    Your privacy is our top priority. This tool:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li className="text-muted-foreground">Runs entirely in your browser - no information is sent to our servers</li>
                                    <li className="text-muted-foreground">Never stores or transmits your personal information </li>
                                    <li className="text-muted-foreground">Doesn't require account creation or login</li>
                                    <li className="text-muted-foreground">Doesn't collect personal data - we only run Google Anlaytics to get aggregated traffic data</li>
                                </ul>
                                <p className="text-muted-foreground">
                                    Interested in verifying this for yourself? Check out our <a href="https://github.com/darenfrankel/undeniable-app/" className="text-blue-600 hover:text-blue-800 underline">code here on Github</a>.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">Who Created Undeniable</h2>
                            <div className="space-y-4">
                                <p className="text-muted-foreground">
                                    Undeniable was created by <a href="https://www.linkedin.com/in/darenfrankel" className="text-blue-600 hover:text-blue-800 underline">Daren Frankel</a> who wanted to create something that both did some good for society as well as to further his software development skills. Undeniable was created by Daren mostly by leveraging Anthropic's Claude chatbot.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">Legal Disclaimer</h2>
                            <p className="text-muted-foreground">
                                This tool provides general assistance with insurance appeals and is not a substitute for legal advice. The generated letters are templates based on common appeal requirements, but may need modification for your specific situation. We recommend reviewing all generated content carefully and consulting with a qualified professional for complex cases. By using this tool you agree to our{" "}
                                <a href="/terms" className="text-blue-600 hover:text-blue-800 underline">Terms of Use</a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
                            <p className="text-muted-foreground">
                                For questions or feedback about this tool, please fill out our <a href="https://forms.gle/PRZG9tpdQpFSKSjJ7" className="text-blue-600 hover:text-blue-800 underline">feedback form</a> or email us at{' '}
                                <a
                                    href="mailto:undeniable@frankelite.com"
                                    className="text-primary hover:underline"
                                >
                                    undeniable@frankelite.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}