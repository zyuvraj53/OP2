import React from 'react'

function PrivacyPolicy() {
  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: '#eca72f' }}>
      <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-700" >Privacy Policy</h1>

        <div className="bg-white shadow overflow-auto sm:rounded-lg p-6 h-full">
          <p className="text-gray-700 mb-4">
            Thank you for visiting OdishaPotli. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services. We are committed to safeguarding your privacy and ensuring that your personal data is treated securely and confidentially. Please read this policy carefully to understand how we handle your information.
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>1. Information We Collect</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">a. Personal Information:</span> When you create an account or place an order with OdishaPotli, we may collect certain personal information, including your name, email address, phone number, shipping address, and payment details. This information is necessary for order processing, delivery, and customer support.
            </p>
            <p className="text-gray-700">
              <span className="font-medium">b. Browsing Data:</span> We may also collect non-personal information such as your IP address, browser type, device information, and cookies. This data is used to improve our website’s functionality and enhance your browsing experience.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>2. Use of Your Information</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">a. Order Processing:</span> We use your personal information to process and fulfill your orders, communicate with you about your purchases, and provide customer support.
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">b. Account Management:</span> Your account information helps us manage your profile, track your order history, and personalize your shopping experience.
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">c. Marketing Communications:</span> With your consent, we may send you promotional emails, newsletters, and offers about our products and services. You can opt-out of marketing communications at any time.
            </p>
            <p className="text-gray-700">
              <span className="font-medium">d. Analytics and Improvements:</span> We analyze non-personal information to better understand user behavior, preferences, and website performance. This helps us enhance our services and user interface.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>3. Data Security</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">a.</span> We implement security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">b.</span> We use SSL encryption to secure sensitive information transmitted during the payment process.
            </p>
            <p className="text-gray-700">
              <span className="font-medium">c.</span> Although we take reasonable precautions, no method of data transmission over the internet is 100% secure. Hence, we cannot guarantee the absolute security of your information.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>4. Cookies</h2>
            <p className="text-gray-700">
              We use cookies and similar technologies to enhance your browsing experience, remember your preferences, and provide personalized content. You can manage your cookie preferences through your browser settings.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>5. Third-Party Services</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">a.</span> We may share your personal information with trusted third-party service providers who assist us in order fulfillment, payment processing, analytics, and marketing.
            </p>
            <p className="text-gray-700">
              <span className="font-medium">b.</span> We do not sell, rent, or lease your personal information to third parties for their marketing purposes.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>6. Legal Disclosure</h2>
            <p className="text-gray-700">
              We may disclose your personal information when required by law, to protect our rights or comply with a legal process.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>7. Children’s Privacy</h2>
            <p className="text-gray-700">
              Our website is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from minors. If you are a parent or guardian and believe your child has provided us with their data, please contact us, and we will take appropriate measures to remove such information from our records.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>8. Changes to the Privacy Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated policy will be effective immediately upon posting on our website.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>9. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions, concerns, or requests related to your privacy or this policy, please reach out to us through the contact information provided on our website.
            </p>
          </section>

          <div className="border-t pt-4 mt-6" style={{ borderColor: '#d99527' }}>
            <p className="text-gray-700 text-sm">Last updated: 1 Aug 2023.</p>
            <p className="text-gray-700 text-sm">This policy is effective as of 1 Aug 2023.</p>
            <p className="text-gray-700 text-sm mt-2">
              <span className="font-medium">Note:</span> All the payments and settlements will be done (In INR) and as the pricing is (In INR).
            </p>
            <p className="text-gray-700 mt-4">
              By using OdishaPotli’s website and services, you consent to the terms of this Privacy Policy.
            </p>
            <p className="text-gray-700 mt-2">
              Thank you for trusting OdishaPotli with your information!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy