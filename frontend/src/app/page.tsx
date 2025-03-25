import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  ArrowRight,
  Code,
  LineChart,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { ReactNode } from "react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 px-6 md:px-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 space-y-6">
              <Badge variant="outline" className="px-3 py-1 mb-4">
                <span className="mr-1 text-emerald-500">✦</span> Version 1.0
                Released
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Modern Web Platform for{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Rapid Development
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                A full-stack boilerplate featuring Django REST for the backend
                and Next.js for the frontend. Start building fast.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <Button size="lg" asChild>
                  <Link href="/auth/register">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 md:max-w-md relative">
              <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-blue-600 to-violet-500 shadow-xl p-1">
                <div className="w-full h-full bg-background rounded-lg p-6 flex items-center justify-center">
                  <Image
                    src="https://minimagroup.nyc/images/minima-crane.png"
                    alt="Minima Crane"
                    width={300}
                    height={300}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Build Modern Apps
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A powerful combination of tools and libraries designed to
              accelerate your development process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Code className="h-10 w-10 text-blue-500" />}
              title="Modern Stack"
              description="Next.js 14 with App Router and Django Rest Framework with the latest features."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-green-500" />}
              title="Authentication"
              description="JWT-based authentication system with social login options included."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-amber-500" />}
              title="Fast Development"
              description="Pre-configured components and styles to accelerate your workflow."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-purple-500" />}
              title="User Management"
              description="Complete user management system with role-based permissions."
            />
            <FeatureCard
              icon={<LineChart className="h-10 w-10 text-rose-500" />}
              title="Dashboard Ready"
              description="Beautiful dashboard with charts and analytics components."
            />
            <FeatureCard
              icon={<CheckCircle className="h-10 w-10 text-teal-500" />}
              title="Production Ready"
              description="Optimized build process for both frontend and backend deployment."
            />
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Quick and Easy Setup
          </h2>

          <Tabs defaultValue="frontend" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
            </TabsList>
            <TabsContent value="frontend" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Next.js Frontend</CardTitle>
                  <CardDescription>
                    Set up the React frontend with a single command
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>{`# Clone the repository
git clone https://github.com/yourusername/minima-boilerplate.git
cd minima-boilerplate/frontend

# Install dependencies
npm install

# Start development server
npm run dev`}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="backend" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Django Backend</CardTitle>
                  <CardDescription>
                    Configure your Python backend in minutes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>{`# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver`}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Is this boilerplate free to use?
              </AccordionTrigger>
              <AccordionContent>
                Yes, this boilerplate is completely free and open-source. You
                can use it for both personal and commercial projects.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Do I need to know both Python and JavaScript?
              </AccordionTrigger>
              <AccordionContent>
                Basic knowledge of both Python (for Django) and
                JavaScript/TypeScript (for Next.js) is recommended. However, the
                boilerplate is designed to be easy to understand with
                comprehensive documentation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How can I deploy this stack?</AccordionTrigger>
              <AccordionContent>
                The frontend can be deployed on Vercel, Netlify, or any platform
                supporting Next.js. The backend can be deployed on platforms
                like Heroku, AWS, or any Python-friendly hosting service.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Can I use this with a different database?
              </AccordionTrigger>
              <AccordionContent>
                Yes, Django supports multiple database systems. By default, this
                boilerplate is configured to use PostgreSQL, but you can easily
                switch to MySQL, SQLite, or others by updating the settings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is TypeScript supported?</AccordionTrigger>
              <AccordionContent>
                Yes! The frontend is built with TypeScript for better
                development experience and type safety.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-20 bg-blue-600 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8">
            Join thousands of developers who are building modern web
            applications faster than ever.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-blue-600 hover:bg-blue-50"
              asChild
            >
              <Link href="/auth/register">Create an Account</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link
                href="https://github.com/yourusername/minima-boilerplate"
                target="_blank"
              >
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center text-muted-foreground">
            <p>© 2025 Minima Boilerplate. All rights reserved.</p>
            <p className="mt-2">
              Made with <span className="text-red-500">♥</span> for developers
              everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="transition-all hover:shadow-md hover:-translate-y-1">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
