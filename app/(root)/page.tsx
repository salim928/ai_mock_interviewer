import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';

const Page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="felx flex-col gap-6 max-w-lg">
          <h2 className="card-cta__title">An AI-powered platform for interviewing</h2>
          <p className="card-cta__description">
            Practice on real interview questions & get instant feedback.
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Get Started</Link>
          </Button>
        </div>

        <Image
          src="/public/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} /> 
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an interview</h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} /> 
          ))}

          {/* <p>You haven&apos;t taken any interviews yet</p> */}
        </div>
      </section>
    </>
  );
};

export default Page;