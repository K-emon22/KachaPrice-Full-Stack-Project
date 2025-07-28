import React from "react";
import {motion} from "framer-motion";
import {
  FaUserShield,
  FaKey,
  FaStore,
  FaGavel,
  FaComments,
  FaCreditCard,
  FaLock,
  FaTools,
  FaEdit,
  FaEnvelope,
} from "react-icons/fa";

const Section = ({icon, title, children}) => (
  <motion.div
    className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-slate-100"
    variants={{
      hidden: {opacity: 0, y: 30},
      visible: {opacity: 1, y: 0},
    }}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-green-100 p-3 rounded-full text-green-600">{icon}</div>
      <h2 className="text-2xl font-semibold text-slate-800">{title}</h2>
    </div>
    <div className="text-slate-600 text-left pl-2 md:pl-16 space-y-4">
      {children}
    </div>
  </motion.div>
);

const TermsAndConditions = () => {
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {staggerChildren: 0.1},
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 md:py-20 px-4">
        <motion.div
          className="text-center mb-12"
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-slate-500 text-lg">Last Updated: July 28, 2025</p>
        </motion.div>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-center text-slate-700 leading-relaxed text-lg bg-green-50 border border-green-200 rounded-xl p-6">
            Welcome to{" "}
            <span className="font-semibold text-green-700">𝙺𝚊𝚌𝚑𝚊Price</span>. By
            using our platform, you agree to be bound by these terms. Please
            read them carefully.
          </p>

          <Section
            icon={<FaUserShield size={24} />}
            title="1. User Responsibilities"
          >
            <ul className="list-disc list-inside space-y-2">
              <li>
                You must provide accurate information during registration.
              </li>
              <li>Do not use the platform for fraudulent activities.</li>
              <li>Respect others while commenting or reviewing products.</li>
              <li>Do not manipulate market prices or product listings.</li>
            </ul>
          </Section>

          <Section icon={<FaKey size={24} />} title="2. Account and Access">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Users can register as a general user or request to be a vendor.
              </li>
              <li>Admin roles are assigned by system authority only.</li>
              <li>
                Unauthorized access to restricted features is strictly
                prohibited and may result in a permanent ban.
              </li>
            </ul>
          </Section>

          <Section icon={<FaStore size={24} />} title="3. Vendor Policies">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Vendors are responsible for adding only valid and recent market
                prices.
              </li>
              <li>
                Advertisements submitted by vendors are reviewed by the admin
                before being published.
              </li>
              <li>
                Vendors can update or delete their products unless an action has
                been taken by an admin.
              </li>
            </ul>
          </Section>

          <Section icon={<FaGavel size={24} />} title="4. Admin Authority">
            <ul className="list-disc list-inside space-y-2">
              <li>
                Admins can approve or reject vendor submissions and provide
                feedback.
              </li>
              <li>
                Admins manage users, advertisements, and all platform data.
              </li>
              <li>
                All decisions made by the admin panel are considered final and
                binding.
              </li>
            </ul>
          </Section>

          <Section
            icon={<FaComments size={24} />}
            title="5. Reviews and Comments"
          >
            <ul className="list-disc list-inside space-y-2">
              <li>
                Users can rate and comment on products based on their market
                experience.
              </li>
              <li>
                Offensive or misleading comments will be removed without notice.
              </li>
              <li>
                Each user may only leave one review per product to ensure
                fairness.
              </li>
            </ul>
          </Section>

          <Section
            icon={<FaCreditCard size={24} />}
            title="6. Pricing and Payments"
          >
            <ul className="list-disc list-inside space-y-2">
              <li>
                This platform is for price tracking. For promotional
                advertisement slots, all purchases are processed securely via
                Stripe.
              </li>
              <li>
                Advertisement slot purchases are final and non-refundable.
              </li>
              <li>
                Price trends and historical data are provided for user
                convenience.
              </li>
            </ul>
          </Section>

          <Section
            icon={<FaLock size={24} />}
            title="7. Data Protection & Security"
          >
            <ul className="list-disc list-inside space-y-2">
              <li>
                We secure user data with Firebase Authentication and manage
                sessions with JWT.
              </li>
              <li>
                All sensitive credentials are protected via environment
                variables on the server.
              </li>
              <li>
                Your personal data is not shared with any third parties without
                your explicit consent.
              </li>
            </ul>
          </Section>

          <Section
            icon={<FaTools size={24} />}
            title="8. Deployment and Maintenance"
          >
            <ul className="list-disc list-inside space-y-2">
              <li>
                We ensure smooth deployment, addressing CORS, 404, or
                token-related issues.
              </li>
              <li>
                Private routes are protected and remain accessible even after
                page reloads.
              </li>
              <li>
                Scheduled maintenance will be communicated in advance when
                possible.
              </li>
            </ul>
          </Section>

          <Section icon={<FaEdit size={24} />} title="9. Changes to the Terms">
            <p>
              We reserve the right to modify these Terms & Conditions at any
              time. Changes will be effective immediately upon posting to the
              website, and we will update the "Last Updated" date.
            </p>
          </Section>

          <Section icon={<FaEnvelope size={24} />} title="10. Contact Us">
            <p>
              If you have any questions, please contact our support team at{" "}
              <a
                href="emonsheikhkhalid2@gmail.com"
                className="text-green-600 hover:underline font-semibold"
              >
                emonsheikhkhalid2@gmail.com
              </a>
              .
            </p>
          </Section>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
