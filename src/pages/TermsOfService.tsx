import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Egreed Technology</title>
        <meta name="description" content="Egreed Technology Terms of Service. Read our terms and conditions for using our website and learning platform." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-24">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: January 28, 2026</p>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using the services provided by Egreed Technology Ltd ("Company," "we," "us," or "our"), including our website egreedtech.org, learning platform, and related services (collectively, "Services"), you agree to be bound by these Terms of Service ("Terms").
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  If you do not agree to these Terms, you may not access or use our Services. These Terms apply to all visitors, users, and others who access our Services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Description of Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Egreed Technology provides:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li>Online learning platform with video courses and educational content</li>
                  <li>Software development and IT consulting services</li>
                  <li>Digital solutions including website development and mobile applications</li>
                  <li>Certificate programs for completed courses</li>
                  <li>Related technology services as described on our website</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                
                <h3 className="text-xl font-medium mt-6 mb-3">3.1 Account Creation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To access certain features, you must create an account. You agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information as needed</li>
                  <li>Keep your password secure and confidential</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">3.2 Account Termination</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to suspend or terminate your account if you violate these Terms, engage in fraudulent activity, or for any other reason at our discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Course Enrollment and Payments</h2>
                
                <h3 className="text-xl font-medium mt-6 mb-3">4.1 Course Access</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Upon successful payment, you will receive access to the enrolled course content. Access is granted for personal, non-commercial educational purposes only.
                </p>

                <h3 className="text-xl font-medium mt-6 mb-3">4.2 Pricing and Payments</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li>All prices are displayed in Rwandan Francs (RWF) unless otherwise stated</li>
                  <li>Payments are processed through our approved payment partners</li>
                  <li>We accept Mobile Money (MTN, Airtel) and other specified payment methods</li>
                  <li>Prices are subject to change without prior notice</li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">4.3 Refund Policy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Refund requests may be considered within 7 days of purchase if you have not accessed more than 20% of the course content. Each refund request will be reviewed on a case-by-case basis. Contact us at egreedtechnology@gmail.com for refund inquiries.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property Rights</h2>
                
                <h3 className="text-xl font-medium mt-6 mb-3">5.1 Our Content</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All content on our platform, including but not limited to text, graphics, logos, videos, courses, software, and design elements, is owned by Egreed Technology Ltd or our licensors and is protected by intellectual property laws.
                </p>

                <h3 className="text-xl font-medium mt-6 mb-3">5.2 License to Use</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We grant you a limited, non-exclusive, non-transferable license to access and use our content for personal educational purposes. You may not:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li>Copy, reproduce, or distribute course content</li>
                  <li>Share your account or course access with others</li>
                  <li>Record, download (unless permitted), or redistribute video content</li>
                  <li>Use content for commercial purposes</li>
                  <li>Modify, create derivative works, or reverse engineer our software</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Certificates</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Certificates are issued upon successful completion of course requirements. Certificates are for personal use and verify completion of our courses. We reserve the right to revoke certificates if obtained through fraud or violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. User Conduct</h2>
                <p className="text-muted-foreground leading-relaxed">You agree not to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on the rights of others</li>
                  <li>Upload malicious code or interfere with our Services</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Submit false or misleading information</li>
                  <li>Use automated systems to access our Services without permission</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Consulting and Development Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For custom software development and consulting services:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li>Specific terms will be outlined in a separate service agreement</li>
                  <li>Project timelines, deliverables, and payments will be agreed upon in writing</li>
                  <li>Intellectual property rights for custom work will be defined in the service agreement</li>
                  <li>Confidentiality terms may apply as specified</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">9. Third-Party Links and Services</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Services may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of third-party sites. Your use of third-party services is at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">10. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-3">
                  <li>Services will be uninterrupted, secure, or error-free</li>
                  <li>Content is accurate, complete, or current</li>
                  <li>Courses will meet your specific learning objectives</li>
                  <li>Completion of courses will guarantee employment or specific outcomes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">11. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by law, Egreed Technology Ltd shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or use, arising from your use of our Services.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Our total liability for any claim arising from these Terms or your use of Services shall not exceed the amount you paid to us in the 12 months preceding the claim.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">12. Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify, defend, and hold harmless Egreed Technology Ltd, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our Services or violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the Republic of Rwanda. Any disputes arising from these Terms shall be resolved in the courts of Rwanda.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">14. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. We will provide notice of material changes by updating the "Last updated" date. Your continued use of our Services after changes constitutes acceptance of the modified Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">15. Severability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact us:
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

export default TermsOfService;
