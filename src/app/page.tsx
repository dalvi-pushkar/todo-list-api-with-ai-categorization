"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Code, 
  Zap, 
  Database, 
  Brain, 
  TestTube, 
  BookOpen,
  ExternalLink,
  Copy,
  Check
} from "lucide-react";
import { useState } from "react";

const endpoints = [
  {
    method: "GET",
    path: "/api/tasks",
    description: "Get all tasks",
    color: "bg-green-500",
  },
  {
    method: "POST",
    path: "/api/tasks",
    description: "Create a new task",
    color: "bg-blue-500",
  },
  {
    method: "GET",
    path: "/api/tasks/:id",
    description: "Get task by ID",
    color: "bg-green-500",
  },
  {
    method: "PUT",
    path: "/api/tasks/:id",
    description: "Update a task",
    color: "bg-yellow-500",
  },
  {
    method: "DELETE",
    path: "/api/tasks/:id",
    description: "Delete a task",
    color: "bg-red-500",
  },
];

const features = [
  {
    icon: Code,
    title: "RESTful API",
    description: "Clean, intuitive API design following REST principles",
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Automatic task categorization using OpenAI GPT or keyword fallback",
  },
  {
    icon: Database,
    title: "In-Memory Storage",
    description: "Fast, lightweight data store for development",
  },
  {
    icon: Zap,
    title: "TypeScript",
    description: "Fully typed codebase for better developer experience",
  },
  {
    icon: TestTube,
    title: "Tested",
    description: "Comprehensive Jest test suite with high coverage",
  },
  {
    icon: BookOpen,
    title: "Well Documented",
    description: "Complete API documentation and setup guide",
  },
];

const categories = [
  "work", "personal", "shopping", "finance", 
  "health", "education", "home", "entertainment", "general"
];

export default function Home() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const exampleRequest = `curl -X POST http://localhost:3000/api/tasks \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Team Meeting",
    "description": "Discuss Q4 project goals",
    "status": "pending"
  }'`;

  const exampleResponse = `{
  "success": true,
  "data": {
    "id": "task_1",
    "title": "Team Meeting",
    "description": "Discuss Q4 project goals",
    "status": "pending",
    "category": "work",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Task created successfully"
}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Next.js 15 + AI</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            To-Do List API
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern REST API with AI-powered task categorization built with Next.js 15, 
            TypeScript, and OpenAI GPT
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Code className="w-4 h-4 mr-2" />
                View on GitHub
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#endpoints">
                <BookOpen className="w-4 h-4 mr-2" />
                API Documentation
              </a>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* API Endpoints */}
        <div id="endpoints" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">API Endpoints</h2>
          
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Base URL</h3>
            </div>
            <code className="block p-4 bg-muted rounded-lg text-sm">
              http://localhost:3000/api
            </code>
          </Card>

          <div className="space-y-4">
            {endpoints.map((endpoint, index) => (
              <Card key={index} className="p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <Badge className={`${endpoint.color} text-white font-mono`}>
                      {endpoint.method}
                    </Badge>
                    <code className="text-sm font-mono">{endpoint.path}</code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {endpoint.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Task Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">AI Task Categories</h2>
          
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Brain className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">
                Automatic Categorization
              </h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Tasks are automatically categorized using OpenAI GPT or a keyword-based 
              fallback system into the following categories:
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category} variant="secondary" className="text-sm">
                  {category}
                </Badge>
              ))}
            </div>
          </Card>
        </div>

        {/* Example Usage */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Example Usage</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Request</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(exampleRequest, 'request')}
                >
                  {copiedCode === 'request' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <pre className="p-4 bg-muted rounded-lg text-xs overflow-x-auto">
                <code>{exampleRequest}</code>
              </pre>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Response</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(exampleResponse, 'response')}
                >
                  {copiedCode === 'response' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <pre className="p-4 bg-muted rounded-lg text-xs overflow-x-auto">
                <code>{exampleResponse}</code>
              </pre>
            </Card>
          </div>
        </div>

        {/* Quick Start */}
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10">
          <h2 className="text-3xl font-bold mb-6 text-center">Quick Start</h2>
          
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-2">Install Dependencies</h3>
                <code className="block p-3 bg-background rounded text-sm">
                  npm install
                </code>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-2">Set Environment Variable (Optional)</h3>
                <code className="block p-3 bg-background rounded text-sm">
                  OPENAI_API_KEY=your_api_key_here
                </code>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-2">Start Development Server</h3>
                <code className="block p-3 bg-background rounded text-sm">
                  npm run dev
                </code>
              </div>
            </div>

            <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-sm">
                API is now running at <strong>http://localhost:3000/api/tasks</strong>
              </p>
            </div>
          </div>
        </Card>

        {/* Testing */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Testing</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <TestTube className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Run Tests</h3>
              <code className="block p-3 bg-muted rounded text-sm">
                npm test
              </code>
            </Card>

            <Card className="p-6">
              <TestTube className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Watch Mode</h3>
              <code className="block p-3 bg-muted rounded text-sm">
                npm run test:watch
              </code>
            </Card>

            <Card className="p-6">
              <TestTube className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">Coverage Report</h3>
              <code className="block p-3 bg-muted rounded text-sm">
                npm run test:coverage
              </code>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t text-center">
          <p className="text-muted-foreground mb-4">
            Built with ❤️ using Next.js 15, TypeScript, and OpenAI
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
                Next.js <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://openai.com" target="_blank" rel="noopener noreferrer">
                OpenAI <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer">
                TypeScript <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}