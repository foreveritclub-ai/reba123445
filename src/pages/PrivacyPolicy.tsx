import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Egreed Technology</title>
        <meta name="description" content="Egreed Technology Privacy Policy. Learn how we collect, use, and protect your personal information." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-24">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 28, 2026</p>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Egreed Technology Ltd ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website egreedtech.org, use our learning platform, or engage with our services.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  By using our services, you consent to the data practices described in this policy. If you do not agree with the terms of this privacy policy, please do not access our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-medium mt-6 mb-3">2.1 Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed">We may collect personal information that you voluntarily provide, including:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Account credentials (username, password)</li>
                  <li>Profile information (bio, avatar, preferences)</li>
                  <li>Payment information (processed securely through our payment partners)</li>
                  <li>Course enrollment and progress data</li>
                  <li>Communications you send to us</li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">2.2 Automatically Collected Information</h3>
                <p className="text-muted-foreground leading-relaxed">When you access our services, we automatically collect:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li>Device information (browser type, operating system)</li>
                  <li>IP address and location data</li>
                  <li>Usage data (pages visited, time spent, interactions)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed">We use the collected information to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li>Provide, operate, and maintain our services</li>
                  <li>Process your course enrollments and payments</li>
                  <li>Track your learning progress and issue certificates</li>
                  <li>Send you important updates and communications</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Improve and personalize your experience</li>
                  <li>Analyze usage patterns to enhance our platform</li>
                  <li>Protect against fraudulent or unauthorized activity</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-muted-foreground leading-relaxed">We may share your information with:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li><strong>Service Providers:</strong> Third-party vendors who assist in operating our platform (hosting, payment processing, analytics)</li>
                  <li><strong>Business Partners:</strong> When you request services from our partners</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of assets</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Secure authentication systems</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and monitoring</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
                <p className="text-muted-foreground leading-relaxed">You have the right to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li>Access and review your personal information</li>
                  <li>Update or correct inaccurate data</li>
                  <li>Request deletion of your account and data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Disable cookies through your browser settings</li>
                  <li>Request a copy of your data</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  To exercise these rights, please contact us at egreedtechnology@gmail.com.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies to enhance your experience. These include:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li><strong>Essential Cookies:</strong> Required for site functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how you use our site</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  You can manage cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and processed in countries other than Rwanda. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="mt-4 p-6 bg-muted/50 rounded-lg">
                  <p className="font-semibold">Egreed Technology Ltd</p>
                  <p className="text-muted-foreground mt-2">Email: egreedtechnology@gmail.com</p>
                  <p className="text-muted-foreground">Phone: +250 795 822 290</p>
                  <p className="text-muted-foreground">Location: Kigali, Rwanda</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
