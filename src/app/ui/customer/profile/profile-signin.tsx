"use client";

import { useState } from "react";
import { montserrat } from "../../fonts";
import SendMagicLink from "../mailing/send-magic-link";
import SignupForm from "../mailing/signup-form";
import { Button } from "@/components/ui/button";

const ProfileSignIn = () => {
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  return (
    <>
      {showSignUpForm ? (
        <>
          <div>
            <h2
              className={`${montserrat.className} mb-4 text-center font-semibold`}
            >
              Sign up for an account
            </h2>
            <p className="mb-4 text-sm text-zinc-800 dark:text-zinc-400 text-center">
              Don't have an account yet? Sign up with the form below to take
              advantage of several benefits including exclusive discounts!
            </p>
            <div className="bg-zinc-100 dark:bg-zinc-900 rounded-md p-4">
              <SignupForm />
            </div>
            <Button
              className="mt-4"
              variant={`link`}
              onClick={() => setShowSignUpForm(false)}
            >
              I already have an account
            </Button>
          </div>
        </>
      ) : (
        <>
          <div>
            <h2
              className={`${montserrat.className} mb-4 text-center font-semibold`}
            >
              Sign in to your account
            </h2>
            <p className="mb-4 text-sm text-zinc-800 dark:text-zinc-400 text-center">
              To view your profile and take advantage of discounts, please
              submit your email address below and follow the link you receive in
              your email.
              <br />
              <span className="text-xs italic">
                It might take a few seconds to receive the email.
              </span>
            </p>
            <SendMagicLink />
            <Button
              className="mt-4"
              variant={`link`}
              onClick={() => setShowSignUpForm(true)}
            >
              I don't have an account
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileSignIn;
