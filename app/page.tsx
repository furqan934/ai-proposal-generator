import { ProposalForm } from "@/components/proposal-form"
import { FileText } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <FileText className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance">
            AI Proposal Generator
          </h1>
          <p className="mt-3 text-muted-foreground text-lg">
            Generate winning freelance proposals in seconds
          </p>
        </div>

        <ProposalForm />

        <p className="text-center text-xs text-muted-foreground mt-10">
          Powered by AI • Craft compelling proposals instantly
        </p>
      </div>
    </main>
  )
}
