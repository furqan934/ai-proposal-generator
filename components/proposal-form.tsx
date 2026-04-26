"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Sparkles } from "lucide-react"

interface ProposalResult {
  proposal: string
  price: string
  skills: string[]
}

export function ProposalForm() {
  const [jobDescription, setJobDescription] = useState("")
  const [result, setResult] = useState<ProposalResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!jobDescription.trim()) return

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate proposal")
      }

      setResult(data)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">

      {/* 🔥 HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">
          AI Freelance Proposal Generator
        </h1>
        <p className="text-muted-foreground">
          Generate professional proposals, pricing, and skills instantly
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Paste job description..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="min-h-[180px]"
        />

        <Button
          type="submit"
          disabled={isLoading || !jobDescription.trim()}
          className="w-full h-12"
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Proposal
            </>
          )}
        </Button>
      </form>

      {/* ERROR */}
      {error && (
        <div className="p-4 rounded bg-red-100 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* RESULT */}
      {result && (
        <div className="space-y-6">

          <p className="text-xs text-muted-foreground">
            ✨ Generated using AI
          </p>

          <div>
            <h2 className="font-semibold mb-2">Proposal</h2>
            <p className="whitespace-pre-wrap">
              {result.proposal}
            </p>

            {/* 🔥 COPY BUTTON */}
            <button
              onClick={() =>
                navigator.clipboard.writeText(result.proposal)
              }
              className="mt-2 text-sm text-blue-500"
            >
              Copy Proposal
            </button>
          </div>

          <div>
            <h2 className="font-semibold">Price</h2>
            <p className="text-lg font-bold">{result.price}</p>
          </div>

          <div>
            <h2 className="font-semibold">Skills</h2>
            <ul className="flex flex-wrap gap-2">
              {result.skills.map((skill, i) => (
                <li key={i} className="bg-gray-200 px-3 py-1 rounded">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}