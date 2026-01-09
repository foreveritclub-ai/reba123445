import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Search, 
  Star, 
  Users, 
  Award, 
  CheckCircle2,
  TrendingUp
} from "lucide-react";

interface Course {
  id: string;
  slug: string;
  title: string;
  instructor: string;
  description: string;
  tags: string[];
  rating: number;
  reviews_count: number;
  students_count: number;
  features: string[];
  price: number;
  original_price: number | null;
  level: string;
  is_trending: boolean;
  has_certificate: boolean;
}

const levelColors = {
  beginner: "bg-green-500/20 text-green-400",
  intermediate: "bg-yellow-500/20 text-yellow-400",
  advanced: "bg-red-500/20 text-red-400",
};

const CoursesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("id, slug, title, instructor, description, tags, rating, reviews_count, students_count, features, price, original_price, level, is_trending, has_certificate")
        .order("students_count", { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <section id="courses" className="py-24 px-6 bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Explore Technology <span className="text-primary">Courses & Training</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
            Master cutting-edge technologies with our comprehensive courses designed by industry experts. From beginner to advanced levels, find the perfect learning path for your career goals.
          </p>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses, skills, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {["all", "beginner", "intermediate", "advanced"].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    selectedLevel === level
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {level === "all" ? "All Levels" : level}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <motion.p
          className="text-sm text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {loading ? "Loading courses..." : `Showing ${filteredCourses.length} of ${courses.length} courses`}
        </motion.p>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-secondary rounded w-1/3 mb-4" />
                <div className="h-8 bg-secondary rounded w-3/4 mb-2" />
                <div className="h-4 bg-secondary rounded w-1/2 mb-4" />
                <div className="h-20 bg-secondary rounded mb-4" />
                <div className="h-10 bg-secondary rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                className="group bg-gradient-card border-gradient rounded-2xl overflow-hidden hover:glow-primary transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Header badges */}
                <div className="p-4 pb-0 flex items-center gap-2">
                  {course.is_trending && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </span>
                  )}
                  {course.has_certificate && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
                      <Award className="w-3 h-3" />
                      Certificate
                    </span>
                  )}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${levelColors[course.level as keyof typeof levelColors]}`}>
                    {course.level}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">ET</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Egreed Technology</span>
                  </div>

                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                    {course.tags.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                        +{course.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Rating and students */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-muted-foreground">({course.reviews_count.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{course.students_count.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1 text-xs text-accent"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">${course.price}</span>
                      {course.original_price && (
                        <span className="text-sm text-muted-foreground line-through">${course.original_price}</span>
                      )}
                    </div>
                    <Link
                      to={`/courses/${course.slug}`}
                      className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:glow-primary transition-all"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          className="mt-16 text-center bg-gradient-card border-gradient rounded-2xl p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Learning Journey?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have advanced their careers with Egreed Technology training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:glow-primary transition-all"
            >
              Get Started Today
            </Link>
            <Link
              to="/signin"
              className="px-8 py-4 border border-muted-foreground/30 text-foreground font-semibold rounded-xl hover:border-primary/50 hover:text-primary transition-all"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesSection;
