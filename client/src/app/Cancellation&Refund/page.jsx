import React from 'react';

function ReturnsRefundCancellationPolicy() {
  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: '#eca72f' }}>
      <div className="flex-grow w-full px-4 sm:px-6 lg:px-8 pb-4 py-12">
        <h1 className="text-5xl font-bold mb-6 text-center text-yellow-700">
          Returns / Refund / Cancellation Policy
        </h1>
        
        <div className="bg-white shadow overflow-auto sm:rounded-lg p-6 h-full">
          <p className="text-gray-700 mb-4">
            All our products are artisanal and handmade/crafted by artisans from the confinement of their modest homes. Unevenness in weaves, prints, minor slubs in fabric and slight variation in color are expected outcomes of an authentic craft. These variations are typical characteristics of any hand-crafted product and should not to be considered as a damage or defect.
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>Our Mission</h2>
            <p className="text-gray-700">
              OdishaPotli is a marketplace that promotes “One District One Product”. We curate some designs which are heritage linked, or showcase products that are made by weavers/artisans who do not have access to reach a larger audience. In the process we ensure to practice artisan branding and implement fair-trade practice. We also encourage our artisans/weavers to become entrepreneurs and upskill their talents while maintaining their lineage. As small businesses, they strive hard to make and sell authentic handmade products to their customers. It is difficult for them to accept returns from customers as many times the products are not returned in original condition. Sometimes the products returned are not in original condition of fineness, resulting in huge financial losses to both our organization, as well as to the artisans we work with.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>Return Policy</h2>
            <p className="text-gray-700">
              We accept returns only if a wrong product or damaged product is delivered. Exchanges are encouraged on a case by case basis with genuine reasons to support such requests, like a size exchange etc. The product needs to be in unused and unsoiled condition with original folds (especially for sarees) and price tag intact.
            </p>
            <p className="text-gray-700 mt-2">
              To return a product, or exchange, a customer must reach out to contact@sarnafoundation.com with Order ID in Subject Line, within 5 days of receiving of the said product with supporting photos, mentioning the reason for return or exchange.
            </p>
            <p className="text-gray-700 mt-2">
              Return pick up can be arranged by Odisha Potli Team as per the confirmation on date & time provided by the customer. Return pick up shall be attempted 2 times only. Customer will need to ship the product to the below address in case of failed attempts of arranged pick up:
            </p>
            <p className="text-gray-700 mt-2 font-medium">
              Odisha Potli<br />
              C/o Sarna Educational And Cultural Service LLP<br />
              293, Unit 3<br />
              Kharvel Nagar, Bhubaneswar-751001<br />
              Odisha<br />
              Ph: 7008099469
            </p>
            <p className="text-gray-700 mt-2">
              Some of the pin codes are not feasible for reverse pick up, in such cases the customer will need to mail the product back to us.
            </p>
            <p className="text-gray-700 mt-2">
              Please note we do not offer a return and exchange pick up facility for international orders. International orders are shipped centrally from our warehouse in Bhubaneswar after stringent quality check and this eliminates any quality/quantity or product related issues.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>Refund Policy</h2>
            <p className="text-gray-700">
              Refunds will be processed within 5 business days of receipt of products in good condition. We reserve the right to deny refunds in case of soiled or damaged products.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2" style={{ color: '#d99527' }}>Cancellation Policy</h2>
            <p className="text-gray-700">
              Once an order is placed, it can be cancelled within 30 minutes of placing the order. Please reach out to contact@sarnafoundation.com mentioning your “Order ID – Request for Cancellation” in the subject line. Please provide a valid reason for cancellation for us to consider your request. Cancellations are reviewed and accepted at the discretion of the management.
            </p>
          </section>

          <div className="border-t pt-4 mt-6" style={{ borderColor: '#d99527' }}>
            <p className="text-gray-700 text-sm">Last updated: 1 Aug 2023.</p>
            <p className="text-gray-700 text-sm">This policy is effective as of 1 Aug 2023.</p>
            <p className="text-gray-700 text-sm mt-2">
              <span className="font-medium">Note:</span> All the payments and settlements will be done (In INR) and as the pricing is (In INR).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnsRefundCancellationPolicy;