import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Rocket, 
  Smartphone, 
  Brain, 
  Video, 
  Users, 
  Wallet,
  Clock,
  Sparkles,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const upcomingFeatures = [
  {
    icon: Smartphone,
    title: "Mobile App",
    titleRw: "Porogaramu ya Telefone",
    description: "Learn on the go with our native iOS and Android apps. Download courses for offline learning.",
    descriptionRw: "Kwiga aho uri hose na porogaramu ya telefone. Bika amashuri ukayiga utari ku murongo.",
    status: "In Development",
    statusRw: "Irimo Gukorwa",
    progress: 65,
    expectedDate: "Q2 2024"
  },
  {
    icon: Brain,
    title: "AI Learning Assistant",
    titleRw: "Umufasha wa AI",
    description: "Get personalized help with our AI tutor. Ask questions, get explanations, and accelerate your learning.",
    descriptionRw: "Kubona ubufasha bwihariye na AI. Baza ibibazo, ubonane n'ibisobanuro, kandi wihutishe kwiga.",
    status: "Coming Soon",
    statusRw: "Iraza Vuba",
    progress: 40,
    expectedDate: "Q3 2024"
  },
  {
    icon: Video,
    title: "Live Classes",
    titleRw: "Amasomo ya Murandasi",
    description: "Join live interactive sessions with instructors. Real-time Q&A and hands-on workshops.",
    descriptionRw: "Injira mu masomo akoranwa na mwarimu. Ibibazo n'ibisubizo kuri iki gihe n'amahugurwa.",
    status: "Beta Testing",
    statusRw: "Igeragezwa",
    progress: 80,
    expectedDate: "Q1 2024"
  },
  {
    icon: Users,
    title: "Team Training",
    titleRw: "Guhugura Itsinda",
    description: "Enroll your entire team with group discounts. Track progress and manage corporate learning.",
    descriptionRw: "Andikisha itsinda ryawe n'igabanuka ry'ibiciro. Kurikirana iterambere n'imyigire y'ikigo.",
    status: "Planned",
    statusRw: "Byateganyijwe",
    progress: 20,
    expectedDate: "Q4 2024"
  },
  {
    icon: Wallet,
    title: "Mobile Money Integration",
    titleRw: "Kwishyura na Mobile Money",
    description: "Pay seamlessly with MTN MoMo, Airtel Money, and other local payment methods.",
    descriptionRw: "Wishyura byoroshye na MTN MoMo, Airtel Money, n'uburyo bw'ahantu.",
    status: "In Development",
    statusRw: "Irimo Gukorwa",
    progress: 75,
    expectedDate: "Q1 2024"
  },
  {
    icon: Sparkles,
    title: "Gamification",
    titleRw: "Imikino mu Kwiga",
    description: "Earn badges, compete on leaderboards, and unlock achievements as you learn.",
    descriptionRw: "Bonera badges, witabire imikino, kandi ufungure ibigwanisho mu gihe wiga.",
    status: "Coming Soon",
    statusRw: "Iraza Vuba",
    progress: 35,
    expectedDate: "Q3 2024"
  }
];

const ComingSoonSection = () => {
  const [email, setEmail] = useState("");

  const handleNotify = () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    toast.success("You'll be notified when new features launch!");
    setEmail("");
  };

  return (
    <section id="coming-soon" className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 border-primary/50">
            <Rocket className="w-3 h-3 mr-1" />
            Coming Soon / Biraza Vuba
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Exciting Features on the Way
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're constantly innovating to bring you the best learning experience. 
            Here's what's coming to Egreed Technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-dashed border-2 hover:border-primary/50 group">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge 
                      variant={feature.status === "Beta Testing" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      <Clock className="w-3 h-3 mr-1" />
                      {feature.expectedDate}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <p className="text-sm text-primary/70 font-medium">{feature.titleRw}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {feature.description}
                  </p>
                  <p className="text-muted-foreground/70 text-xs mb-4 italic">
                    {feature.descriptionRw}
                  </p>
                  
                  {/* Progress bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{feature.status}</span>
                      <span className="font-medium">{feature.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${feature.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`h-full rounded-full ${
                          feature.progress >= 75 ? "bg-green-500" :
                          feature.progress >= 50 ? "bg-primary" :
                          feature.progress >= 25 ? "bg-yellow-500" :
                          "bg-muted-foreground"
                        }`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Notify Me CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <Bell className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Get Notified</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Be the first to know when these features launch. Join our waiting list!
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={handleNotify} className="gap-2">
                  <Bell className="w-4 h-4" />
                  Notify Me
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
