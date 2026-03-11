import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import apiRoutes from "../utils/Routes/apiRoutes";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, Shield, Sparkles, Loader2, Rocket } from "lucide-react";

const loginFunction = async (emailID: string) => {
  const { data } = await api.post(apiRoutes.auth.login.authLogin, {
    email: emailID,
  });
  return data;
};

function Login_Auth() {
  const { email } = useParams();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const { mutate: authLoginMutation } = useMutation({
    mutationFn: (email: string) => loginFunction(email),
    onSuccess: (data) => {
      if (data.accessToken != null && data.refreshToken != null) {
        Cookies.set("AccessToken", data.accessToken, {
          path: "/",
          secure: true,
          sameSite: "None",
        });
        Cookies.set("RefreshToken", data.refreshToken, {
          path: "/",
          secure: true,
          sameSite: "None",
        });
        Cookies.set("ProfileInfo", JSON.stringify(data.profileinfo), {
          path: "/",
          secure: true,
          sameSite: "None",
        });
        localStorage.setItem(
          "toast_message",
          `Login Successful! Welcome to Kepler ${data.profileinfo.name}`
        );
        if (data.sendAlert) {
          localStorage.setItem("paymentLastDate", data.lastDate);
          localStorage.setItem("pendingCourses", JSON.stringify(data.courses));
        }
        window.location.href = "/";
      }
    },
    onError: () => {
      localStorage.setItem(
        "authfail",
        "Please provide some more informations about yourself."
      );
      window.location.href = `/authregister/${email}`;
    },
  });

  useEffect(() => {
    authLoginMutation(email!);
  }, []);

  // Visual progress simulation for better UX
  useEffect(() => {
    const steps = [
      { delay: 500, progress: 20, step: 1 },
      { delay: 1200, progress: 45, step: 2 },
      { delay: 2000, progress: 70, step: 3 },
      { delay: 2800, progress: 100, step: 4 },
    ];

    steps.forEach(({ delay, progress: newProgress, step: newStep }) => {
      setTimeout(() => {
        setProgress(newProgress);
        setStep(newStep);
      }, delay);
    });
  }, []);

  const authSteps = [
    { icon: Shield, title: "Verifying Credentials", description: "Checking your authentication details..." },
    { icon: CheckCircle, title: "Authentication Confirmed", description: "Your identity has been verified successfully" },
    { icon: Sparkles, title: "Setting Up Profile", description: "Preparing your personalized experience..." },
    { icon: Rocket, title: "Ready to Launch", description: "Welcome to Kepler! Redirecting you now..." }
  ];

  const currentStepData = authSteps[step] || authSteps[0];
  const CurrentIcon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-6">
      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Kepler Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-[var(--foreground)]">
              KEPLER
            </span>
          </div>
          <div className="text-[var(--muted-foreground)] text-sm">Authenticating your session</div>
        </div>

        {/* Main Authentication Card */}
        <div className="glass-card rounded-2xl p-8">
          {/* Status Icon */}
          <div className="text-center mb-6">
            <div className="relative inline-flex">
              <div className="w-16 h-16 bg-blue-500/10 dark:bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/20">
                {step < 4 ? (
                  <Loader2 className="w-8 h-8 text-blue-500 dark:text-blue-400 animate-spin" />
                ) : (
                  <CurrentIcon className="w-8 h-8 text-green-500 dark:text-green-400" />
                )}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--muted-foreground)]">Progress</span>
              <span className="text-sm text-[var(--primary)] font-medium">{progress}%</span>
            </div>
            <div className="h-1.5 bg-[var(--muted)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Current Step Information */}
          <div className="text-center space-y-2 mb-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              {currentStepData.title}
            </h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              {currentStepData.description}
            </p>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {authSteps.map((stepData, index) => {
              const StepIcon = stepData.icon;
              const isActive = index <= step;
              const isCurrent = index === step;
              
              return (
                <div key={index} className="flex flex-col items-center gap-1.5">
                  <div className={`
                    w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500
                    ${isActive 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-[var(--muted)] text-[var(--muted-foreground)]'
                    }
                    ${isCurrent ? 'ring-2 ring-blue-500/30' : ''}
                  `}>
                    <StepIcon className="w-4 h-4" />
                  </div>
                  <div className={`text-[10px] font-medium transition-colors duration-300 ${
                    isActive ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'
                  }`}>
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info message */}
          <div className="bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
            <p className="text-sm text-[var(--foreground)]">
              Your credentials have been verified.
            </p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              You will be redirected shortly.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <div className="flex items-center justify-center space-x-2 text-[var(--muted-foreground)] text-xs">
            <Shield className="w-3.5 h-3.5" />
            <span>Secured by Kepler Authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login_Auth;