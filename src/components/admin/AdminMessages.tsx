import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Building, Calendar, MessageSquare } from "lucide-react";

const AdminMessages = () => {
  const { data: messages, isLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    }
  });

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

  if (!messages || messages.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No Messages Yet</h3>
          <p className="text-muted-foreground">
            Contact form submissions will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Contact Messages</h2>
        <Badge variant="secondary">{messages.length} messages</Badge>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <Card key={message.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{message.name}</h3>
                    {message.service && (
                      <Badge variant="outline">{message.service}</Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {message.email}
                    </span>
                    {message.company && (
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {message.company}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(message.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-muted-foreground bg-muted/50 p-4 rounded-lg">
                    {message.message}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminMessages;
