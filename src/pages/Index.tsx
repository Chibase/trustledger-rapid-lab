import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">TrustLedger Rapid Lab</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Stakeholder Relations Management Platform
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-1">
          <Card className="border-border bg-card p-8">
            <h2 className="text-2xl font-semibold text-foreground">P03 — Stakeholder Registry</h2>
            <p className="mt-2 text-muted-foreground">
              Record and manage the people, organisations, and communities that your project affects or works with.
            </p>
            <Button
              onClick={() => navigate('/stakeholders')}
              className="mt-6"
            >
              Open Stakeholder Registry
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
