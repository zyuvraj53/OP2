import React from 'react';

function CookiePolicy() {
  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: '#eca72f' }}>
      <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 pb-4 py-12">
        <h1 className="text-5xl font-bold mb-6 text-center text-yellow-700">
          Cookie Policy
        </h1>
        
        <div className="bg-white shadow overflow-auto sm:rounded-lg p-6 h-full">
          <p className="text-gray-700 mb-4">
            This Cookie Policy explains how OdishaPotli (“We,” “Us,” or “Our”) uses cookies and similar tracking technologies on our website (the “Website”). By using the Website, you consent to the use of cookies as described in this policy. This policy is an integral part of our Privacy Policy and Terms of Service.
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>1. What are Cookies</h2>
            <p className="text-gray-700">
              Cookies are small text files that are placed on your device (computer, smartphone, tablet) when you visit a website. They are widely used to enhance website functionality, improve user experience, and provide certain features and services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>2. How We Use Cookies</h2>
            <p className="text-gray-700">
              a. <span className="font-medium">Essential Cookies:</span> These cookies are necessary for the proper functioning of the Website. They enable basic features such as page navigation, access to secure areas, and shopping cart functionality. Without these cookies, the Website may not function correctly.
            </p>
            <p className="text-gray-700 mt-2">
              b. <span className="font-medium">Analytical/Performance Cookies:</span> We use these cookies to gather information about how visitors use the Website. They help us analyze user behavior, identify popular pages, and make improvements to our services. The data collected is aggregated and anonymous.
            </p>
            <p className="text-gray-700 mt-2">
              c. <span className="font-medium">Functionality Cookies:</span> These cookies allow the Website to remember your preferences, such as language settings and user preferences, to provide a more personalized browsing experience.
            </p>
            <p className="text-gray-700 mt-2">
              d. <span className="font-medium">Advertising/Marketing Cookies:</span> We may use these cookies to deliver relevant advertisements to you based on your browsing activities and interests. They also help us measure the effectiveness of our marketing campaigns.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>3. Third-Party Cookies</h2>
            <p className="text-gray-700">
              Some cookies used on the Website may be placed by third-party service providers. These third parties have their own privacy policies and may use cookies to collect information about your online activities across different websites. We have no control over these cookies and recommend reviewing the respective privacy policies of these third parties.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>4. Cookie Duration</h2>
            <p className="text-gray-700">
              The duration of cookies varies. Some cookies are session cookies, which are temporary and are deleted from your device when you close your browser. Persistent cookies, on the other hand, remain on your device for a specified period or until you manually delete them.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>5. Managing Cookies</h2>
            <p className="text-gray-700">
              a. You can manage cookie preferences through your web browser settings. Most browsers allow you to block or delete cookies, or you can choose to be notified when cookies are being sent to your device. However, please note that blocking or deleting cookies may affect the functionality and user experience of the Website.
            </p>
            <p className="text-gray-700 mt-2">
              b. To learn more about managing cookies on different browsers, you can refer to the browser’s help or settings section.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>6. Changes to the Cookie Policy</h2>
            <p className="text-gray-700">
              OdishaPotli may update this Cookie Policy from time to time to reflect changes in our practices or for legal or regulatory reasons. The updated policy will be effective immediately upon posting on the Website.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>7. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions or concerns about this Cookie Policy, please contact us using the information provided on the Website.
            </p>
          </section>

          <div className="border-t pt-4 mt-6" style={{ borderColor: '#d99527' }}>
            <p className="text-gray-700 mb-4">
              Thank you for visiting OdishaPotli and using our services!
            </p>
            <p className="text-gray-700 text-sm">Last updated: [Date]</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookiePolicy;