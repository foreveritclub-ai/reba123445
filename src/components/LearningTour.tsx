import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  PlayCircle, 
  CheckCircle, 
  Award,
  Clock,
  Layout
} from "lucide-react";

interface TourStep {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tip?: string;
}

const tourSteps: TourStep[] = [
  {
    title: "Welcome to Your Learning Space! 🎉",
    description: "This guided tour will help you navigate and make the most of your learning experience. Let's explore the key features together.",
    icon: BookOpen,
    tip: "You can revisit this guide anytime from the help menu."
  },
  {
    title: "Course Content Sidebar",
    description: "On the left side, you'll find all course modules and lessons organized in a clear structure. Click on any unlocked lesson to navigate directly to it.",
    icon: Layout,
    tip: "Completed lessons show a green checkmark ✓"
  },
  {
    title: "Watch Video Lessons",
    description: "Each lesson includes a video tutorial. Watch the entire video and take notes. You can pause, rewind, and replay as needed to fully understand each concept.",
    icon: PlayCircle,
    tip: "Use keyboard shortcuts: Space to pause, arrow keys to skip."
  },
  {
    title: "Progress Tracking",
    description: "Your progress is shown at the top of the page. Track how much of the course you've completed and see your advancement in real-time.",
    icon: Clock,
    tip: "Stay on the lesson for at least 30 seconds to mark it complete."
  },
  {
    title: "Complete Lessons",
    description: "After watching a video and understanding the content, click 'Mark as Complete' to save your progress and unlock the next lesson.",
    icon: CheckCircle,
    tip: "Lessons must be completed in order to unlock the next one."
  },
  {
    title: "Earn Your Certificate",
    description: "Complete all lessons to earn a verified certificate! Your certificate will be automatically generated and available for download.",
    icon: Award,
    tip: "Share your certificate on LinkedIn to showcase your achievement!"
  }
];

interface LearningTourProps {
  onComplete: () => void;
}

const LearningTour = ({ onComplete }: LearningTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const handleSkip = () => {
    handleComplete();
  };

  const currentTourStep = tourSteps[currentStep];
  const Icon = currentTourStep.icon;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tourSteps.length - 1;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={handleSkip}
          />

          {/* Tour Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg mx-4"
          >
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-primary to-blue-600 p-6 text-white">
                <button
                  onClick={handleSkip}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Close tour"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm text-white/70 mb-1">
                      Step {currentStep + 1} of {tourSteps.length}
                    </p>
                    <h2 className="text-xl font-bold">{currentTourStep.title}</h2>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {currentTourStep.description}
                    </p>

                    {currentTourStep.tip && (
                      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                        <p className="text-sm text-primary flex items-start gap-2">
                          <span className="text-lg">💡</span>
                          <span className="font-medium">{currentTourStep.tip}</span>
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 pb-4">
                {tourSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStep 
                        ? "bg-primary w-6" 
                        : index < currentStep 
                        ? "bg-primary/50" 
                        : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-border p-4 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-muted-foreground"
                >
                  Skip Tour
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={isFirstStep}
                    className="gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="gap-1"
                  >
                    {isLastStep ? (
                      <>
                        Get Started
                        <CheckCircle className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LearningTour;
