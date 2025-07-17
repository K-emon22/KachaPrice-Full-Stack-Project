import React from "react";

const TermsAndConditions = () => {
  return (
    <div className=" mx-[2%] lg:mx-[5%] py-6 text-gray-800 leading-relaxed">
      <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-6 text-center">
        📄 Terms & Conditions
      </h1>

      <section className="space-y-6 text-justify">
        <p>
          Welcome to <span className="font-semibold">Daily Price Tracker for Local Markets (KachaDAm)</span>.
          These Terms and Conditions govern your use of our platform. By accessing or using our website, you agree
          to be bound by these terms.
        </p>

        <div>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">1. User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You must provide accurate information during registration.</li>
            <li>Do not use the platform for fraudulent activities.</li>
            <li>Respect others while commenting or reviewing products.</li>
            <li>Do not manipulate market prices or product listings.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">2. Account and Access</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Users can register as a general user or vendor. Admin roles are assigned by system authority.</li>
            <li>Unauthorized access to admin/vendor features is strictly prohibited and may result in a permanent ban.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">3. Vendor Policies</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Vendors are responsible for adding only valid and recent market prices.</li>
            <li>Advertisements submitted by vendors are reviewed by the admin before being published.</li>
            <li>Vendors can update or delete their products unless they are approved or rejected with reason.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">4. Admin Authority</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Admins can approve/reject vendor submissions and provide feedback.</li>
            <li>Admins can manage users, orders, advertisements, and product data.</li>
            <li>All decisions taken by the admin panel are considered final and binding.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">5. Reviews and Comments</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Users can rate and comment on products based on market experience.</li>
            <li>Offensive or misleading comments will be removed without notice.</li>
            <li>Each user can only leave one review per product.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">6. Pricing and Payments</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>All purchases are processed securely via Stripe.</li>
            <li>Once purchased, products are considered final and non-refundable.</li>
            <li>Price trends and historical comparisons are provided for user convenience.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">7. Data Protection & Security</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>We secure user data with Firebase Authentication and JWT.</li>
            <li>Credentials such as API keys, database URIs are protected via environment variables.</li>
            <li>Your data is not shared with any third parties without consent.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">8. Deployment and Maintenance</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>We ensure smooth deployment without CORS, 404, or token-related reload issues.</li>
            <li>Private routes are protected and remain accessible even after page reloads.</li>
            <li>Downtime or scheduled maintenance will be informed in advance if possible.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">9. Changes to the Terms</h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any time. Changes will be communicated through the website or via email if applicable.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-green-500 mb-2">10. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding these Terms & Conditions, feel free to contact our support team at{" "}
            <a href="mailto:support@kanchabazar.com" className="text-green-600 underline">support@kanchadam.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;