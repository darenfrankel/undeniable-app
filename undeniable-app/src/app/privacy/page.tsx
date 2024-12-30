// src/app/privacy/privacy-page.tsx
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-2xl font-bold mb-8">Privacy Policy</h1>
            
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-600 mb-4">
                This Privacy Policy describes how we collect, use, and handle your information when you use our Insurance Appeal Helper tool.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
              <p className="text-gray-600 mb-4">
                We use Google Analytics to collect anonymous usage data, including:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Pages visited</li>
                <li>Time spent on the site</li>
                <li>Anonymous interaction data (such as button clicks)</li>
                <li>Browser type and version</li>
                <li>Device type and screen size</li>
                <li>Geographic region (country/city level only)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">
                The information collected is used solely to:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Understand how users interact with our tool</li>
                <li>Improve the user experience</li>
                <li>Fix technical issues</li>
                <li>Generate anonymous usage statistics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Data Storage and Security</h2>
              <p className="text-gray-600 mb-4">
                We do not store any personal information or form data on our servers. All form data remains in your browser and is never transmitted to us. Analytics data is processed by Google Analytics in accordance with their privacy policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
              <p className="text-gray-600 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Decline analytics cookies</li>
                <li>Request information about data collected about you</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <p className="text-gray-600 mb-4">
                For any privacy-related questions or requests, please contact us at privacy@frankelite.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
              </p>
              <p className="text-gray-600">
                Last updated: 2024-12-20
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}