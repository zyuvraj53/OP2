import React from 'react';

function ShippingAndDelivery() {
  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: '#eca72f' }}>
      <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 pb-4 py-12">
        <h1 className="text-5xl font-bold mb-6 text-center text-yellow-700">
          Shipping & Delivery Policy
        </h1>
        
        <div className="bg-white shadow overflow-auto sm:rounded-lg p-6 h-full">
          <p className="text-gray-700 mb-4">
            Thank you for choosing OdishaPotli! We are committed to providing you with the best shopping experience and ensuring your orders are delivered to you in a timely and secure manner. Please read our Shipping & Delivery Policy carefully to understand the terms and conditions governing the delivery of your purchases.
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>1. Shipping Locations</h2>
            <p className="text-gray-700">
              OdishaPotli currently ships products within India only. We aim to cover as many locations as possible, including major cities, towns, and rural areas across the country. However, there may be certain areas where we are unable to deliver. In such cases, you will be informed during the checkout process.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>2. Shipping Partners</h2>
            <p className="text-gray-700">
              We have established reliable partnerships with trusted courier and logistics services to ensure the safe and efficient delivery of your orders. Our shipping partners include but are not limited to India Post, Blue Dart, Delhivery, and other reputable carriers.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>3. Order Processing Time</h2>
            <p className="text-gray-700">
              Once your order is placed, it will be processed within 1-2 business days. During busy periods or special promotions, processing times may vary, but we will always strive to dispatch your order as quickly as possible.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>4. Estimated Delivery Time</h2>
            <p className="text-gray-700">
              The estimated delivery time for your order depends on your location and the availability of the product. Typically, delivery may take between 3 to 7 business days from the date of dispatch. Please note that these delivery times are only approximate and delays may occur due to unforeseen circumstances beyond our control.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>5. Shipping Charges</h2>
            <p className="text-gray-700">
              Shipping charges will be calculated based on the weight of your order and your delivery location. The shipping cost will be displayed during the checkout process before you confirm your order. We may offer free shipping for orders that meet certain criteria as part of promotional offers.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>6. Tracking Your Order</h2>
            <p className="text-gray-700">
              Once your order is dispatched, you will receive a shipping confirmation email containing the tracking details. You can use the provided tracking number to monitor the status and location of your package. Please note that it may take some time for the tracking information to be updated by the courier company.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>7. Undeliverable Packages</h2>
            <p className="text-gray-700">
              In the event that our shipping partners are unable to deliver your package due to incorrect address information, unavailability at the provided address, or any other reason beyond our control, the package will be returned to us. In such cases, we will attempt to contact you to arrange for re-delivery or provide a refund as per our Refund Policy.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>8. Order Status and Support</h2>
            <p className="text-gray-700">
              If you have any queries regarding your order status or require assistance, you can reach out to our customer support team via email at support@odishapotli.com or by calling our helpline number. Our team will be happy to assist you.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>9. Damaged or Defective Items</h2>
            <p className="text-gray-700">
              In the rare event that your order arrives damaged or with defects, please contact us within 48 hours of receiving the package. We will require photographs and relevant details to assess the issue and provide an appropriate resolution.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>10. Force Majeure</h2>
            <p className="text-gray-700">
              OdishaPotli will not be held liable for any delays or failures in delivery caused by events beyond our reasonable control, including but not limited to natural disasters, strikes, riots, or disruptions in transportation services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>11. Changes to Shipping & Delivery Policy</h2>
            <p className="text-gray-700">
              We reserve the right to modify or update our Shipping & Delivery Policy at any time without prior notice. Any changes will be effective immediately upon posting on our website.
            </p>
          </section>

          <div className="border-t pt-4 mt-6" style={{ borderColor: '#d99527' }}>
            <p className="text-gray-700 mb-4">
              By placing an order with OdishaPotli, you agree to comply with and be bound by this Shipping & Delivery Policy. If you do not agree with any part of this policy, please refrain from using our services.
            </p>
            <p className="text-gray-700 mb-4">
              For any further clarifications or assistance, please feel free to contact us.
            </p>
            <p className="text-gray-700 text-sm">Last updated: 1 Aug 2023.</p>
            <p className="text-gray-700 text-sm">This policy is effective as of 1 Aug 2023.</p>
            <p className="text-gray-700 text-sm mt-2">
              <span className="font-medium">Note:</span> All the payments and settlements will be done (In INR) and as the pricing is (In INR).
            </p>
            <p className="text-gray-700 mt-2">
              Thank you for shopping with OdishaPotli! Happy shopping!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingAndDelivery;