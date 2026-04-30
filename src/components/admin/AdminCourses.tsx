import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookOpen, Edit, Users, Clock } from "lucide-react";

const CURRICULUM_TEMPLATE = `[
  {
    "module": "Module 1: Introduction",
    "lessons": [
      {
        "title": "Welcome & Setup",
        "video_url": "https://youtu.be/VIDEO_ID",
        "image_url": "",
        "content": "Write the lesson content here. Multi-line is supported.",
        "resources": [
          { "label": "Slides PDF", "url": "https://..." }
        ],
        "quiz": [
          {
            "question": "What is X?",
            "options": ["A", "B", "C", "D"],
            "correctIndex": 0,
            "explanation": "Because..."
          }
        ]
      }
    ]
  }
]`;

const FINAL_EXAM_TEMPLATE = `[
  {
    "question": "Sample final question?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 1,
    "explanation": "Optional explanation"
  }
]`;

const AdminCourses = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [curriculumText, setCurriculumText] = useState("");
  const [examText, setExamText] = useState("");

  const { data: courses, isLoading } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateCourse = useMutation({
    mutationFn: async (course: any) => {
      let curriculum: any = course.curriculum;
      let final_exam: any = course.final_exam;

      try {
        curriculum = curriculumText.trim() ? JSON.parse(curriculumText) : [];
      } catch (e) {
        throw new Error("Curriculum JSON is invalid");
      }
      try {
        final_exam = examText.trim() ? JSON.parse(examText) : [];
      } catch (e) {
        throw new Error("Final exam JSON is invalid");
      }

      const { error } = await supabase
        .from("courses")
        .update({
          title: course.title,
          description: course.description,
          long_description: course.long_description,
          price: Number(course.price) || 0,
          level: course.level,
          instructor: course.instructor,
          syllabus: course.syllabus || null,
          passing_score: Math.min(100, Math.max(0, Number(course.passing_score) || 70)),
          curriculum,
          final_exam,
        })
        .eq("id", course.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      toast({ title: "Course updated successfully" });
      setIsDialogOpen(false);
      setEditingCourse(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error updating course",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleEdit = (course: any) => {
    setEditingCourse({ ...course });
    setCurriculumText(
      course.curriculum ? JSON.stringify(course.curriculum, null, 2) : CURRICULUM_TEMPLATE
    );
    setExamText(
      course.final_exam && Array.isArray(course.final_exam) && course.final_exam.length > 0
        ? JSON.stringify(course.final_exam, null, 2)
        : FINAL_EXAM_TEMPLATE
    );
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-1/3 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Manage Courses</h2>
        <Badge variant="secondary">{courses?.length || 0} courses</Badge>
      </div>

      {!courses || courses.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Courses Yet</h3>
            <p className="text-muted-foreground">Courses will appear here once added.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <Badge>{course.level}</Badge>
                      {course.is_trending && <Badge variant="secondary">Trending</Badge>}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students_count || 0} students
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration_hours || 0} hours
                      </span>
                      <span className="font-semibold text-primary">
                        {course.price.toLocaleString()} RWF
                      </span>
                      <span>Pass: {course.passing_score ?? 70}%</span>
                      <span>
                        Final exam:{" "}
                        {Array.isArray(course.final_exam) ? course.final_exam.length : 0}{" "}
                        questions
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(course)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          {editingCourse && (
            <Tabs defaultValue="basics">
              <TabsList>
                <TabsTrigger value="basics">Basics</TabsTrigger>
                <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="exam">Final Exam</TabsTrigger>
              </TabsList>

              <TabsContent value="basics" className="space-y-4 pt-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={editingCourse.title}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Short description</Label>
                  <Textarea
                    value={editingCourse.description}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Long description</Label>
                  <Textarea
                    rows={4}
                    value={editingCourse.long_description ?? ""}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, long_description: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Price (RWF)</Label>
                    <Input
                      type="number"
                      value={editingCourse.price}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, price: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <Label>Level</Label>
                    <Input
                      value={editingCourse.level}
                      onChange={(e) =>
                        setEditingCourse({ ...editingCourse, level: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Passing score (%)</Label>
                    <Input
                      type="number"
                      value={editingCourse.passing_score ?? 70}
                      onChange={(e) =>
                        setEditingCourse({
                          ...editingCourse,
                          passing_score: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>Instructor</Label>
                  <Input
                    value={editingCourse.instructor}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, instructor: e.target.value })
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="syllabus" className="space-y-2 pt-4">
                <Label>Syllabus (plain text or markdown)</Label>
                <Textarea
                  rows={14}
                  value={editingCourse.syllabus ?? ""}
                  onChange={(e) =>
                    setEditingCourse({ ...editingCourse, syllabus: e.target.value })
                  }
                  placeholder="Course objectives, weekly breakdown, prerequisites, grading policy..."
                />
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-2 pt-4">
                <Label>Curriculum (JSON)</Label>
                <p className="text-xs text-muted-foreground">
                  Each lesson supports: title, video_url, image_url, content, resources[], quiz[].
                </p>
                <Textarea
                  rows={20}
                  className="font-mono text-xs"
                  value={curriculumText}
                  onChange={(e) => setCurriculumText(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCurriculumText(CURRICULUM_TEMPLATE)}
                >
                  Insert template
                </Button>
              </TabsContent>

              <TabsContent value="exam" className="space-y-2 pt-4">
                <Label>Final exam questions (JSON array)</Label>
                <p className="text-xs text-muted-foreground">
                  Fields: question, options[], correctIndex (0-based), explanation (optional).
                </p>
                <Textarea
                  rows={16}
                  className="font-mono text-xs"
                  value={examText}
                  onChange={(e) => setExamText(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setExamText(FINAL_EXAM_TEMPLATE)}
                >
                  Insert template
                </Button>
              </TabsContent>

              <div className="flex justify-end gap-2 pt-6 border-t border-border mt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => updateCourse.mutate(editingCourse)}
                  disabled={updateCourse.isPending}
                >
                  {updateCourse.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourses;
