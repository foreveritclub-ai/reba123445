import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  BookOpen, 
  PlayCircle, 
  CheckCircle, 
  Award, 
  Clock, 
  Users, 
  ArrowRight,
  Laptop,
  FileText,
  MessageSquare,
  Download
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up for free and set up your learning profile. Add your interests and goals to get personalized course recommendations.",
    icon: Users,
    tips: ["Use a valid email for course updates", "Complete your profile for better recommendations", "Set your learning goals"]
  },
  {
    number: "02",
    title: "Browse & Enroll",
    description: "Explore our catalog of courses across web development, mobile apps, AI, and more. Enroll in courses that match your career goals.",
    icon: BookOpen,
    tips: ["Check course prerequisites", "Read reviews from other students", "Look at the curriculum outline"]
  },
  {
    number: "03",
    title: "Watch Video Lessons",
    description: "Learn at your own pace with high-quality video tutorials. Pause, rewind, and replay as needed to master each concept.",
    icon: PlayCircle,
    tips: ["Take notes while watching", "Use playback speed controls", "Watch on any device"]
  },
  {
    number: "04",
    title: "Practice & Apply",
    description: "Complete hands-on exercises and projects to reinforce your learning. Build real-world applications as you progress.",
    icon: Laptop,
    tips: ["Code along with instructors", "Complete all exercises", "Build portfolio projects"]
  },
  {
    number: "05",
    title: "Track Progress",
    description: "Monitor your learning journey with progress tracking. See completed lessons, time spent, and achievements earned.",
    icon: CheckCircle,
    tips: ["Set daily learning goals", "Review completed sections", "Celebrate milestones"]
  },
  {
    number: "06",
    title: "Earn Certificates",
    description: "Complete courses to earn verified certificates. Share your achievements on LinkedIn and showcase your new skills.",
    icon: Award,
    tips: ["Complete all modules", "Pass final assessments", "Download your certificate"]
  }
];

const features = [
  {
    icon: Clock,
    title: "Learn at Your Pace",
    description: "Access courses 24/7. Study when it suits you—morning, evening, or weekends."
  },
  {
    icon: PlayCircle,
    title: "Video-Based Learning",
    description: "Engaging video tutorials with clear explanations and real-world examples."
  },
  {
    icon: FileText,
    title: "Downloadable Resources",
    description: "Access code files, PDFs, and supplementary materials for offline study."
  },
  {
    icon: MessageSquare,
    title: "Community Support",
    description: "Connect with instructors and fellow learners for help and discussions."
  },
  {
    icon: Download,
    title: "Offline Access",
    description: "Download lessons to watch offline when you don't have internet."
  },
  {
    icon: Award,
    title: "Verified Certificates",
    description: "Earn certificates upon course completion to showcase your skills."
  }
];

const LearningGuide = () => {
  return (
    <>
      <Helmet>
        <title>How to Learn | Egreed Technology Learning Guide</title>
        <meta name="description" content="Learn how to use Egreed Technology's learning platform. Step-by-step guide to enrolling in courses, watching lessons, and earning certificates." />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-24">
        {/* Hero Section */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                Learning Guide
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Learn on{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                  Egreed Technology
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Your complete guide to getting started, navigating courses, and making the most of your learning experience.
              </p>
              <Button size="lg" asChild>
                <a href="/learn">
                  Start Learning Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need for an effective learning experience
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">Step-by-Step Learning Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow these steps to make the most of your learning experience
              </p>
            </motion.div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-gradient-to-br from-primary to-blue-600 p-8 flex items-center justify-center md:w-32">
                        <span className="text-4xl font-bold text-white">{step.number}</span>
                      </div>
                      <CardContent className="flex-1 p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <step.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground mb-4">{step.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {step.tips.map((tip, tipIndex) => (
                                <span
                                  key={tipIndex}
                                  className="inline-flex items-center gap-1 px-3 py-1 bg-muted rounded-full text-sm"
                                >
                                  <CheckCircle className="w-3 h-3 text-green-500" />
                                  {tip}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-6 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: "Do I need any prior experience to start learning?",
                  a: "No! We have courses for all levels, from complete beginners to advanced developers. Each course clearly states its prerequisites."
                },
                {
                  q: "How long do I have access to a course?",
                  a: "Once enrolled, you have lifetime access to the course content. Learn at your own pace without any time pressure."
                },
                {
                  q: "Can I download videos for offline viewing?",
                  a: "Yes! Premium courses allow you to download video lessons and resources for offline access."
                },
                {
                  q: "How do I get my certificate?",
                  a: "Complete all modules and pass the final assessment. Your certificate will be automatically generated and available for download."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept Mobile Money (MTN, Airtel), bank transfers, and international payment options."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of students already learning on our platform. Your journey to new skills starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/learn">Browse Courses</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/sign-up">Create Free Account</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default LearningGuide;
