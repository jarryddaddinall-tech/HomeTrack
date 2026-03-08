import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "muted";
  hover?: boolean;
}

export function Card({ className, variant = "default", hover = true, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-white/60 bg-white/95 shadow-card backdrop-blur-sm",
        variant === "elevated" && "shadow-soft-md bg-white/98",
        variant === "muted" && "bg-white/80",
        hover && "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover hover:border-slate-200/60",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-b border-slate-100/80 p-6", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6", className)} {...props} />;
}
